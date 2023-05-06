const express = require("express");
// creating server
const app = express();
const {connectDatabase} = require("./connections/connections");
const job_Model = require("./models/job");
const registration_Model = require("./models/registration");

app.use(express.json())
        app.post("/api/jobs",  async(req, res) => {
            try{
              let count = await job_Model.find({
                companyname: req.body.COMPANYName,
              }).countDocuments();
              if (count < 2) {
                const newObject = {

          companyname :req.body.COMPANYName ,
            jobrole:req.body.posistion ,
            location:req.body.area,
            salary:req.body.payment,
            vacancy:req.body.seats,
            branchEligibility:req.body.Eligibility ,
            cgpa:req.body.score,
            lastdate:req.body.deadline, 
                };

                const jobdata = new job_Model (newObject);
                await jobdata.save();
                return res.json ({
                  success: true,
                  message: "job details scussfull",
                });
              } else {
                return res.json({
                  success: false,
                  message: "minimum two jobs by one company",
                });
              }
            } catch (error) {
              // return res.json({ success: true, data: count });
              console.log(error);
              return res.status(400).json({ success: false, error: error.message });
            }
          });



           
// app.use(express.json())

app.post("/api/registrations" ,async (req, res)=>{
  try {



    let count = await registration_Model
    .find({ 
      jobID: req.body.jobid, email: req.body.email })
      .countDocuments();
    if (count < 1) {
      const newObject = {
        studentname: req.body.name,
        jobID: req.body.jobid,
        branch: req.body.department,
        cgpa: req.body.score,
        passoutyear: req.body.passyear,
        email: req.body.email,
        phonenumber: req.body.contact,
        address: req.body.location,
        jobstatus: req.body.status,
        applicationdate: req.body.date,
      };
      const registrationData = new registration_Model(newObject);
      await registrationData.save();
      return res.json({
        success: true,
        message: "application Success",
      });
    } else {
      return res.json({ message: "applied" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});  

app.put("/api/latestjobs/:id", async (req, res) => {
  try {
    const upd_data = await registration_Model.findByIdAndUpdate(req.params.id, {
      jobstatus: "selected",
    });
    return res.json({ success: true, data: upd_data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

app.put("api/latestjobs/:id", async (req, res) => {
  try {
    const upd_data = await job_Model.findByIdAndUpdate(req.params.id, {
      jobrole: "developer",
      vacancy: 2,
    });
    return res.json({ success: true, data: upd_data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
app.put("api/updatedjobs/:id", async (req, res) => {
  try {
    const upd_data = await registration_Model.findByIdAndUpdate(req.params.id, {
      CGPA: 7.5,
      phonenumber: 8080808080,
    });
    return res.json({ success: true, data: upd_data });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});
app.post("/api/jobsposted/:email", async (req, res) => {
  try {
    const registerData = await registration_Model.find({
      email: req.params.email,
    });
    return res.json({ success: true, data: registerData });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, error: error.message });
  }
});


const a =  connectDatabase();
    console.log(a);
      const PORT = 8000;
app.listen(PORT, async()=> {
    await console.log(`server is running at port ${PORT}`);
});
    
 