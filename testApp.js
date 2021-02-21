const express=require('express');
const socketIO=require('socket.io');
const http=require('http')
// var cors = require("cors");
const port=process.env.PORT||4000
var app=express();
var server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

 
// make connection with user from server side
io.on('connection', (socket)=>{
  console.log('New user connected');
   //emit message from server to user
   socket.emit('newMessage', {
     from:'jen@mds',
     text:'hepppp',
     createdAt:123
   });
 
  // listen for message from user
  socket.on('createMessage', (newMessage)=>{
    console.log('newMessage', newMessage);
  });
 
  // when server disconnects from user
  socket.on('disconnect', ()=>{
    console.log('disconnected from user');
  });
});
 
server.listen(port,()=>{
    console.log("Listening on the port ",port);
});