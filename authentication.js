const mongoose=require('mongoose');
const express=require('express');
var app = express();
const bodyParser=require('body-parser');
const Joi=require('joi');
app.use(bodyParser.json());



mongoose.connect("mongodb+srv://vikash:espl123@myfirstcluster-bhteb.mongodb.net/authentication?retryWrites=true&w=majority")
.then(()=>console.log('Connected to dddMongoDB'))
.catch(err=>console.error('Could not connected to Mongo Database ',err));


//It is just like a table in databse 

const User=mongoose.model('User',new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        uppercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:200
    },
    password:{
        type:Number,
        required:true,
        minlength:5,
        maxlength:1000
    }
}));



app.post('/api/users',async (req,res)=>{
     const {error}=validateUser(req.body);
   if(error) return res.status(400).send(error.details[0].message);  
   

   let user=new User({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
});

    user=await user.save() ;
        res.send(user)
    
}); 


 function validateUser(userSchema){
    const schema={
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
        
    };
    
    return Joi.validate(userSchema,schema);
    
}
 
var server = app.listen(5000, function () {
    console.log('Server is running..');

});
