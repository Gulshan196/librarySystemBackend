const express = require("express");
const app = express();
require("./Database/database");
const bodyParser = require("body-parser");



const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const sessions = require("express-session");
// const cookie = require('coo')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

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




app.use(cors({
  origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  

