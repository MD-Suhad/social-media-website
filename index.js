const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs'); 
const resolvers = require('./graphql/Resolvers');
const {MONGODB} = require('./config.js');


const server = new ApolloServer({
   typeDefs,
   resolvers
 });

mongoose.connect(MONGODB,{useNewUrlParser:true})
   .then(()=>{
      console.log("Connected to MongoDB");
      return server.listen({port: 4000});
   })
   .then(res=>{
      console.log(`Server Side Running ${res.url}`);
   })