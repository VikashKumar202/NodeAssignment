const {User}=require('../models/user');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router(); 
const _=require('lodash');
const bcrypt=require('bcrypt');
const Joi=require('Joi');
const jwt=require('jsonwebtoken');
const config=require('config');

router.post('/',  async(req, res)=> {
   
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);  
    
    let user=await User.findOne({email:req.body.email});
    console.log(req.body.email,user);
    if(!user) return res.status(400).send('Invalid Email and Password');
   
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    console.log(req.body.password,user.password,validPassword)
    if(!validPassword) return res.status(400).send('Invalid Email and Password');
  
    const token=user.generateAuthToken();
    res.send(token);
});

function validate(req){
    const schema={
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
        
    };
    
    return Joi.validate(req,schema);
    
} 


module.exports=router;