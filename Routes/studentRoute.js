const express = require("express");
const Student = require("../Controller/studentController");
const Authorization = require("../Middleware/authorization");
const router = express.Router();

router.post('/add',Student.addStudent);

router.post('/login',Student.login);

router.post('/logout',Student.logout);

router.put('/ask',Authorization.checkRole('student'),Student.askPermission);

module.exports = router;