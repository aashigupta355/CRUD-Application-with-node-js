require('./modules/db');
const express=require('express');
const app=express();
const employeeController=require('./controllers/employeeController');
const path=require('path');
const exphbrs=require('express-handlebars');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended: true})); //express app is using bodyParser.
app.use(bodyParser.json()); //prints in the json format

app.use('/employee',employeeController); 
//usin the employeeController.js and making the objcet of that router by declaring the route and and the object

app.set('views',path.join(__dirname,'/views/'));
//to tell the app where is views present so set the path of app by joining the paths

app.engine('hbs',exphbrs({
    extname:'.hbs',
    defaultLayout:'main',
    layoutsDir:__dirname+'/views/layouts/',
    runtimeOptions: {
              allowProtoPropertiesByDefault: true,
              allowProtoMethodsByDefault: true,
    }
}));
//creating an engine and telling that hbs is getting listened by defining the extension name,the main fail which is going to be rendered
//and the main directory where actual main.hbs is present

app.set('view engine','hbs');
//set the view engine as hbs.

app.listen('3000',function(err){
    if(err){
        console.log('Cant connect to port:3000 '+err);
    }
    else{
        console.log('Listening at port:3000');
    }
})