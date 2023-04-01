const postsResolvers = require('./post');
const usersResolvers = require('./Users.js');


module.exports ={
 
   Query:{
      ...postsResolvers.Query
   },
   Mutation:{
      ...usersResolvers.Mutation
   }
}