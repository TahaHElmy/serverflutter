const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const authRouter =express.Router();
authRouter.post('/api/signup', async (req, res) =>  {
    try {
       const {name , email, password} = req.body;
       
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
           return res.status(400).json({msg: "Email is already there, "});
        }
   
        const hPassword = await bcrypt.hash(password, 8);
   
        let user = new User({email, password: hPassword, name}); 
   
        user = await user.save();
        res.json(user);
    } catch (e) {
       res.status(500).json({error: e.message});
    }
   });
   
   authRouter.post('/api/signin', async (req, res) => {
     try 
     {
         const {email, password} = req.body;
         const user = await User.findOne({ email });
         if (!user) {
            return res.status(400).json({msg: "User is not exist !"});
         }
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(400).json({msg: "Password is not correct !"});
         }
   
         const token = jwt.sign({id: user._id} , "passwordKey" );
         res.json({ token, ...user._doc});
     }
     catch (e) {
      res.status(500).json({error: e.message});
     }
   });
   
   module.exports = authRouter;