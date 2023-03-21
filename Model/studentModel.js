const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    password: {type:String , required: true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    requestedBook:{type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    borrowedBooks: [{
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      borrowedDate: { type: Date, default: Date.now() },
      returnDate: { type: Date }
    }],
    isBlocked: { type: Boolean, default: false },
    blockDate: { type: Date },
    permission: {type : Boolean , default: false}
  });

  const studentModel = mongoose.model('Student',studentSchema);

  module.exports = studentModel;