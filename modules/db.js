const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/employeesDB',{ useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(!err){
        console.log('Emplyees Database Connected');
    }
    else{
        console.log('There is a error while connection '+err);
    }
});
const employeeSchema = new mongoose.Schema({
    fullName:{
        type:String,
    },
    email:{
        type:String,

    },

    address:{
        type:String
    },
    city:{
        type:String
    },
    mobile:{
        type:String
    }
});
 
const employee=mongoose.model("employee",employeeSchema);
module.exports=employee;
