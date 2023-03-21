
const studentModel = require("../Model/studentModel");
const teacherModel = require("../Model/teacherModel");
const bcrypt = require("bcrypt");
const bookModel = require("../Model/bookSchema");


class Student{
    constructor(){

    }
    static addStudent = async(req,res) =>{
        const {name , rollNo ,password, teacher , borrowedBooks } = req.body;

        if (!name || !rollNo || !password){
            res.send("please add required fields");
        }
        const teach =  await teacherModel.findOne({name:teacher});
        console.log(teach,"teacher");
       

        // when students gets created its object should contain the object id of their teacher

        try{
            const studentdata = await studentModel.findOne({rollNo:rollNo});
            console.log("studentdata",studentdata);
            if (!studentdata){
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password,salt);
                console.log(hashPassword,"hashPassword");
               const student = new studentModel({
                name:name,
                rollNo:rollNo,
                password:hashPassword,
                teacher: teach._id,
                borrowedBooks:borrowedBooks
            });
            const data = await student.save();

                // when student gets created its object id will be saved into teachers collection.
        
        let arr = teach.students;
        arr.push(data._id);
        teach.student = arr; 
        await teach.save();
        
        res.status(200).send({"message":"student saved successfully" , "data" : data});
            }
            else {
                res.status(500).send("student rollNo already exists");
            }
        }
        catch(err){
         res.status(500).send(err);
        }
    }

    static login = async(req,res) => {
        const {rollNo , password} = req.body;
        if(!rollNo || !password) {
         res.send("please enter all the required fields");
        }
     
        try{
     const studentdata = await studentModel.findOne({rollNo:rollNo});
     console.log("studentdataa" ,studentdata);
     
     if(studentdata){
     
     const isMatch = await bcrypt.compare(password,studentdata.password);
     if(rollNo === studentdata.rollNo && isMatch){
       
       req.session.userid=req.body.rollNo;
       req.session.role = 'student';
       console.log(req.session);
       res.send("login successfull");
     }
     else {
       res.status(500).send("invalid credentials");
     }
     }
     else{
     res.status(500).send("student does not exit");
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
     
    static updateStudentInfo = async(req,res) => {

    }
    static askPermission = async(req,res) => {
       const {title} = req.body;

       const book = await bookModel.findOne({title:title});

       if(book.isAvailable){
         const student = await studentModel.findOne({rollNo:req.session.userid});
         student.permission = true;
         student.requestedBook = book._id;

         await student.save();

;       }
       else {
        res.send('out of stock');
       }
      console.log(book);
      res.send(book);
    }
}

module.exports = Student;