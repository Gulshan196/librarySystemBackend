const express = require("express");
const Teacher = require("../Controller/teacherController");
const Authorization = require("../Middleware/authorization");
const router = express.Router();

router.post('/add', Teacher.addTeacher);

router.get('/grant/:rollNo',Authorization.checkRole('teacher'),Teacher.grantAccess);

router.post('/login',Teacher.login);

router.post('/logout',Teacher.logout);

router.get('/info/:teacherId',Teacher.getTeacherInfo);
module.exports = router;