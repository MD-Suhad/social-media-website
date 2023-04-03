const jwt = require("jwt");
const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  //context = {...header}

  const authHeader = context.req.header.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer")[1];
    try {
      const user = jwt.verify(token, SECRET_KEY);
      return user;
    } catch (err) {
      throw new AuthenticationError("Invalid/Expired token");
    }
    throw new Error("Authentication token must be 'Bearer[token]");
  }
  throw new Error("Authentication header must be provided");
};
