const express = require("express");
const app = express();
require("./Database/database");
const bodyParser = require("body-parser");



const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const sessions = require("express-session");
// const cookie = require('coo')
const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// a variable to save a session
var session;
// for session
app.use(sessions({
  key:"user_sid",
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:false,
  cookie: { maxAge: oneDay },
  resave: false
}));

const bookRouter = require('./Routes/bookRoute');
const teacherRouter = require('./Routes/teacherRoute');
const studentRouter = require('./Routes/studentRoute');

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true };


app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
app.get("/", (req, res) => {
  res.send("hello");
});

app.use('/book',bookRouter);
app.use('/teacher',teacherRouter);
app.use('/student',studentRouter);

app.listen(process.env.PORT || 8000, () => {
    console.log(`app running on port ${process.env.PORT}`);
  });

  module.exports = session;
  

