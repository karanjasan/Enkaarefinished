require("dotenv").config();
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const express = require("express");
const filepload = require("express-fileupload");
const cookiepar = require("cookie-parser");
const session = require("express-session");
const mysqlstore = require("express-mysql-session")(session);

const util = require("util");
const fs = require("fs");
const {Attachment} = require("@sendgrid/helpers/classes");
const app = express();
/*const store= new session.MemoryStore()*/
app.use(cookiepar());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});
const options = {
  connectionLimit: 10,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
};

let cockieage = 1000 * 60 * 60 * 1;
const sessionStore = new mysqlstore(options);

app.use(
  session({
    secret: process.env.SENDGRID_API_KEY,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      /*secure:true,*/

      /* sameSite:"none",*/
    },
    store: sessionStore,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5501",
  })
);
/*origin:'https://calm-gingersnap-fdb8ce.netlify.app'*/

app.use(filepload());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.enable("trust proxy");

const PORT = process.env.PORT || 3890;

app.listen(PORT, () => console.log(`Server Listeaning at ${PORT} ....`));

// a pool to connect to every database request

const {createPool} = require("mysql2");
const {error} = require("console");
const {request} = require("http");
const {resolve} = require("path");
const {Z_ERRNO} = require("zlib");
const e = require("express");
const {arrayToJSON} = require("@sendgrid/helpers/helpers");
const {setTimeout} = require("timers/promises");

const pool = createPool({
  connectionLimit: 30000,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// a variable to save a session

// a variable to save a session

app.post("/login", async (request, response) => {
  const {email, password, check} = request.body;
  if (check === true) {
    cockieage = 1000 * 60 * 60 * 1;
  }

  if (email && password) {
    /*  if(request.session.userid){
      response.json("yessssss");
      console.log("yessss");
    }*/

    const sql = "SELECT*FROM employer_profile WHERE email=?";
    pool.query(sql, [email], (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        verifyclientprofile(result);
      }
    });

    let verifyclientprofile = (rows) => {
      if (rows.length == 0) {
        /* this code indicate there is no user with such email on the client side
so the search continue to the candidate side
*/
        const sql = "SELECT*FROM candidate_profile WHERE email=?";
        pool.query(sql, [email], (err, result, fields) => {
          if (err) {
            console.log(err);
          } else {
            verifycandidateprofile(result);
          }
        });
      } else {
        const firstn = rows[0].first_name;
        const secondn = rows[0].last_name;
        const usersid = rows[0].user_id;
        const userpassword = rows[0].password;
        const useremail = rows[0].email;

        async function checkuser(pass1, pass2) {
          const match = await bcrypt.compare(pass1, pass2);

          if (match) {
            request.session.authorized = true;
            request.session.userid = {
              useremail,
              userpassword,
            };

            response.json({
              firstname: firstn,
              secondname: secondn,
              verytype: "valid",
              usertype: "client",
              userid: usersid,
            });
          } else {
            response.json({
              verytype: "invalid",
            });
          }
        }
        checkuser(password, userpassword);
      }
    };

    let verifycandidateprofile = (rows) => {
      if (rows.length == 0) {
        response.json({
          verytype: "invalid",
        });
      } else {
        const firstn = rows[0].first_name;
        const secondn = rows[0].last_name;
        const usersid = rows[0].user_id;
        const userpassword = rows[0].password;
        const useremail = rows[0].email;

        async function checkuser(pass1, pass2) {
          const match = await bcrypt.compare(pass1, pass2);

          if (match) {
            request.session.authorized = true;
            console.log(request.session.authorized);
            request.session.userid = {
              useremail,
              userpassword,
            };
            console.log(request.session.userid);

            response.json({
              firstname: firstn,
              secondname: secondn,
              verytype: "valid",
              usertype: "candidate",
              userid: usersid,
            });
          } else {
            response.json({
              verytype: "invalid",
            });
          }
        }
        checkuser(password, userpassword);
      }
    };
  }
});

app.post("/logout", (request, response) => {
  request.session.destroy();
  response.json({okay: "okay"});
});

app.post("/get", (request, response) => {
  if (request.session.userid) {
    const {useremail, userpassword} = request.session.userid;

    const authsql = `SELECT user_id FROM employer_profile
WHERE email=? AND password=?`;

    pool.query(authsql, [useremail, userpassword], (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        employerdashbord(result);
      }
    });
    let employerdashbord = (rows) => {
      if (rows.length == 0) {
        const authsql = `SELECT user_id FROM candidate_profile
      WHERE email=? AND password=?`;

        pool.query(
          authsql,
          [useremail, userpassword],
          (err, result, fields) => {
            if (err) {
              console.log(err);
            } else {
              itscandidate(result);
            }
          }
        );
      } else {
        response.json({auth: "yes", dashboard: "employer"});
      }
    };

    let itscandidate = (rows) => {
      if (rows.length == 0) {
        response.json({auth: "authno"});
      } else {
        response.json({auth: "yes", dashboard: "candidate"});
      }
    };
  } else {
    response.json({auth: "authno"});
  }
});

app.post("/session", (request, response) => {
  if (request.session.userid) {
    response.json({auth: "yes"});
  } else {
    response.json({auth: "no"});
  }
});
