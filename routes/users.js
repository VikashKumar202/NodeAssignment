const {User,validate}=require('../models/user');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router(); 
const _=require('lodash');
const bcrypt=require('bcrypt');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const superAdmin=require('../middleware/superAdmin');
const asyncMiddleware=require('../middleware/async');

router.get('/',async(req,res)=>{
    //throw new Error('could not get User');
    const user=await User.find().select('-password');
    res.send(user);
});

router.get('/:_id',auth,async(req,res)=>{
        const user=await User.findById(req.user._id).select('-password');
});

router.post('/', [auth,admin],async(req, res)=> {
   
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);  
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registerd');

    /* user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }); */
    user = new User(_.pick(req.body,['name','email','password'])); // it is similar to above commented part 
    const salt=await bcrypt.genSalt(10); // generate random string 
   user.password=await bcrypt.hash(user.password, salt); // generate random string and hash of user password
  
await user.save();
const token=user.generateAuthToken();
//res.send(user); // her we are showing all data of user 
//res.send(_.pick(user,['_id','name','email'])); // by the lodash method pick we can pass only specific datat
res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

router.delete('/:id', [auth,superAdmin],async(req, res)=> {
    const user =await User.findByIdAndDelete(req.params.id);

    if(!user) return res.status(400).send('Id is not there');
    res.send(user);
     
     
 }); 

 router.put('/:id', [auth,superAdmin], async(req, res)=> {
    const user =await User.findById(req.params.id);

    if(!user) return res.status(400).send('Id is not there');
    res.send(user);
     
     
 }); 

module.exports=router;