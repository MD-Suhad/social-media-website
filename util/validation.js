module.exports.validateRegisterInput = (
      
    username,
    email,
    password,
    confirmPassword

) => {
   const errors = {};
   if(username.trim()=== ''){
      errors.username= "username must not be empty";
   }
   if(email.trim()===''){
      errors.email = "email must not be empty";
   }
    else{
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if(!email.match(regEx)){
         errors.email = "email must be a valid email address";
      }
      
   };
   if(password ===''){
      errors.password = 'password must be empty'
   }
   else if(password !=  confirmPassword){
      errors.confirmPassword = 'password must be match'

   }
   return {
      errors,
      valid: Object.keys(errors).length<1
   }
};

// ------------login validation------------

module.exports.validateLoginInput = (
    username,
    password,
    email
   
) =>{
   const errors = {};
   if(username.trim() ===''){
      errors.username = "login form username must be taken";
   }
   if(email.trim() === ""){
      errors.email = "login from email must be taken";
   }
   if(password === ''){
      errors.password = 'valid password must be taken';
   };
   return {
      errors,
      valid: Object.keys(errors).length<1
   };
};