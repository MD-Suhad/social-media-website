const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const user = require('../../models/User');


module.exports = {
   Mutation:{
     async register(_,{
         registerInput:{username,email,password,confirmPassword}
      },
      context,info){


         //TODO: validate user data

         //TODO: make sure user doesn't already exist
         //TODO: hash password and create an auth token
         password = await bcrypt.hash(password,13);
         const newUser = new User({
            email,
            username,
            password,
            createAt: new Date().toISOString()
         });
         const res = await newUser.save();
         const token = jwt.sign({
            id: res.id,
            email: res.email,
            username: res.username,
         })
      }
   }
}