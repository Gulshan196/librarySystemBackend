const mongoose = require("mongoose");
const DB =
  "mongodb+srv://gulshan:vK7VXZ9tt8wssJDL@cluster0.e338rv8.mongodb.net/library?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database in connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = DB;