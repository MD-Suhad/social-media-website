const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const {validateRegisterInput,validateLoginInput} = require("../../util/validation");
const User = require("../../models/User");

function generateToken(user){
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    )
    
    
    {
      //TODO: validate user data
         const {valid,errors} = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
          );
          if(!valid) {
            throw new UserInputError("RegisterInput Errors",{errors});
          }
      //TODO: make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "this username is taken",
          },
        });
      }

      //TODO: hash password and create an auth token
      password = await bcrypt.hash(password, 13);
      const newUser = new User({
        email,
        username,
        password,
        createAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(
      _,{loginInput:{username,password}}
    )
    {
      const{valid,error} = validateLoginInput(username,password);
      if(!valid){
        throw UserInputError("loginUserError",{error});
      }
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("Wrong credentials",{errors});
      }
      const match = await bcrypt.compare(password,user.password);
      if(!match){
        error.general = "wrong credentials";
        throw new UserInputError("wrong credentials",{errors});
      }
      const newUser =  User({
        email,
        username,
        password,
        createAt: new Date().toISOString(),
      });
      const token = generateToken(User);
      return {
        ...User._doc,
        id: User._id,
        token,
      };
    }
  },
};
