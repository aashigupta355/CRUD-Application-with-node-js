const express=require('express');
var router=express.Router();

require('../modules/db');

const mongoose=require('mongoose');
const employee = require('../modules/db');
//const Employee=mongoose.model('employee');

router.get('/',(req,res)=>{
    //res.json('This is the get request');
    res.render("employee/addOrEdit.hbs",{
        viewtitle:"Insert an Employee"
    });
});
router.post('/',(req,res)=>{
    //console.log(req.body);
    //console.log('hi');
    if(req.body._id==''){
        insertRecord(req,res);
    }
    else{
        updateRecord(req,res);
    }
});

function updateRecord(req,res){
    employee.findByIdAndUpdate({_id:req.body._id},req.body,{new:true, useFindAndModify: false},(err,doc)=>{
        if(!err){
            res.redirect('employee/list');
        }
        else{
            console.log('Error while updating the record: '+err);
        }
    })
}
function insertRecord(req,res){
    const Employee=mongoose.model("employee");
    const employee= new Employee();
    employee.fullName=req.body.fullName;
    employee.email=req.body.email;
    employee.address=req.body.address;
    employee.city=req.body.city;
    employee.mobile=req.body.mobile;
    employee.save().then(function(err,doc){
        if(!err){
            res.redirect('employee/list');
        }
        else{
            res.render("employee/addOrEdit.hbs",{
                viewtitle:"Insert an Employee",
                //employee: req.body
            });
        }
    });
}
router.get('/list',function(req,res){
    //res.send('This is the list');
    employee.find({}).exec(function(err,docs){
        if(!err){
            res.render('employee/list',{
                list:docs
            });
        }
        else{
            console.log('Errr occured while retrieving records from db: '+err);
        }
    })
});

router.get('/:id',(req,res)=>{
    employee.findById(req.params.id,function(err,docs){
        if(!err){
            res.render('employee/addOrEdit',{
                viewtitle:'Update an Employee',
                employee1:docs
            })
        }
    })
})
module.exports=router;