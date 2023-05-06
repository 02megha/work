const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    companyname : String,
    jobrole : String,
    location : String,
    salary : Number,
    vacancy : Number,
    branchEligibility : String,
    cgpa : Number,
    lastdate : Number,
});

 const job_Model = mongoose.model("job" , jobSchema);
 module.exports = job_Model;