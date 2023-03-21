const studentModel = require("../Model/studentModel");
const teacherModel = require("../Model/teacherModel");
const bcrypt = require("bcrypt");
const bookModel = require("../Model/bookSchema");

class Teacher {
  constructor() {
  }

  static addTeacher = async(req,res) => {
    const {name , teacherId , password ,students } = req.body;

    if (!name || !teacherId || !password) {
        res.send("please provide name of teacher");
    }
    try{
      const teacherdata = await teacherModel.findOne({teacherId:teacherId});
      if(teacherdata){
       res.send("teacherId already exists!");
      }
      else{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const teacher = new teacherModel({name:name ,teacherId:teacherId , password : hashPassword,students : students});
       const data = await teacher.save();
       res.status(200).send({"message":"teacher saved successfully" , "data" : data});

      }
       
    }
    catch(err){
        res.send(err);
    }
  }

  static login = async(req,res) => {
   const {teacherId , password} = req.body;
   if(!teacherId || !password) {
    res.send("please enter all the required fields");
   }

   try{
const teacherdata = await teacherModel.findOne({teacherId:teacherId});

if(teacherdata){

const isMatch = await bcrypt.compare(password,teacherdata.password);
if(teacherId === teacherdata.teacherId && isMatch){
  console.log(teacherdata)
  
  req.session.userid=req.body.teacherId;
  req.session.role = 'teacher';
  console.log(req.session);
  res.send("login successfull");
}
else {
  res.status(500).send("invalid credentials");
}
}
else{
res.status(500).send("teacher does not exit");
}
   }
   catch(err) {
    res.status(500).send(err);
   }
  }

  static logout = async(req,res) => {
    req.session.destroy();
    console.log(req.session);
    res.send('logged out');
  }

  static grantAccess = async(req,res) => {
   const {rollNo} = req.body;

   const student = await studentModel.findOne({rollNo:rollNo});

   if (student){
  if(!student.isBlocked){
  if (student.borrowedBooks.length===0){

    const book = await bookModel.findOne({_id:student.requestedBook});

     if (student.permission && book.available){
    student.permission = false;
    student.borrowedBooks.push({book:student.requestedBook});
    student.requestedBook = null;
    book.available -= 1;

    if(book.available == 0) book.isAvailable = false;
    await student.save();
    await book.save();

    res.send('book has been granted');
     }
  }
  else {
    res.send('student already have a book');
  }
  }
  else {
    res.send('student is blocked');
  }
   }
   else {
    res.send('student not exists');
   }
  }

}

module.exports = Teacher;