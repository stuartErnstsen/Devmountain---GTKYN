//Server package imports
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");

//Creating instance of server
const app = express();

//Server variables and controller imports
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const authCtrl = require("./controllers/auth/authController");

//Top-level middleware
app.use(express.json());
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    //Setting db instance on the app server object
    app.set("db", db);

    //Authentication endpoints
    app.get("/auth/getCurrentUser", authCtrl.getCurrentUser);
    app.put("/auth/login", authCtrl.login);
    app.post("/auth/register", authCtrl.register);

    app.listen(SERVER_PORT, () =>
      console.log(
        `Hippity Hoppity your server is poppening on port: ${SERVER_PORT}`
      )
    );
  })
  .catch((err) => console.log(err));
