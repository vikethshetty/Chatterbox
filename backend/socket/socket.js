import { Server } from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap={}; //{userId :socketId}
io.on('connection',(socket)=>{
    console.log(`User Connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if(userId != "undefined"){
        userSocketMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    //socket.on() is used to listen to the event and it can be used on both client and server side
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
    
    // Define a notification event
    // Handle sending notifications
    socket.on('sendNotification', (notification) => {
    const recipientSocketId = onlineUsers.get(notification.recipientId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('newNotification', notification);
    }
  });
});


export {app,io,server};