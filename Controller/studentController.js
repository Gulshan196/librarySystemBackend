
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
        console.log(req.body);
        if(!rollNo || !password) {
         res.send({message:"please enter all the required fields"});
        }
     
        try{
     const studentdata = await studentModel.findOne({rollNo:rollNo});
     console.log("studentdataa" ,studentdata);
     
     if(studentdata){
     
     const isMatch = await bcrypt.compare(password,studentdata.password);
     if(rollNo === studentdata.rollNo && isMatch){
      
       req.session.userid=req.body.rollNo;
       req.session.role = 'student';
       console.log('session saved = ',req.session)

       res.status(201).json({status:201,studentdata});
     }
     else {
       res.send({message:"invalid credentials"});
     }
     }
     else{
     res.send({message:"student does not exit"});
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
       const {title,rollNo} = req.body;

       const book = await bookModel.findOne({title:title});
       if(book.isAvailable){
         const student = await studentModel.findOne({rollNo:rollNo});
         if (student.borrowedBooks.length==0){
          student.permission = true;
          student.requestedBook = book._id;
         }
         else{
      res.send("you already have a book");
         }
      

         await student.save();
         console.log(book);
      res.status(201).send({status:201,book:book});
       }
       else {
        res.send('out of stock');
       }
      
    }

    static returnBook = async(req,res)=> {

    }
}

module.exports = Student;