const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema({
    studentname : String,
    jobID : String,
    branch : String,
    cgpa : Number,
    passoutyear : Number,
    email : String,
    phonenumber : Number,
    address : String,
    jobstatus: String,
    applicationdate : Number,
});

 const registration_Model = mongoose.model("registration" , registrationSchema);
 module.exports = registration_Model;
 