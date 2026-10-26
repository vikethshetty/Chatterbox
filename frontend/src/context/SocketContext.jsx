import { createContext, useEffect, useState,useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
//import Notification from "../components/messages/Notification";

const socketServerUrl = import.meta.env.VITE_SOCKET_URL ||
    (import.meta.env.DEV ? "http://localhost:5000" : "https://chatterbox-4u22.onrender.com");

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) =>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] =useState([]);
    const {authUser} = useAuthContext();
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        if(authUser){
            const socket = io(socketServerUrl,{
                query:{
                    userId: authUser._id,
                },
            });
            
            setSocket(socket);

            socket.on("getOnlineUsers",(users) =>{
                setOnlineUsers(users);
            });

            socket.on("newNotification", (notification) => {
                setNotifications((prev) => [...prev, notification]);
              });
            
            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }

    },[authUser]);

    return(
        <SocketContext.Provider value={{socket, onlineUsers,notifications}}>
            {children}
            {notifications.map((notification, index) => (
                <Notification key={index} notification={notification} />
            ))}
        </SocketContext.Provider>
    )
}


/*
import { createContext, useEffect, useState,useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) =>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] =useState([]);
    const {authUser} = useAuthContext();

    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:5000",{
                query:{
                    userId: authUser._id,
                },
            });
            
            setSocket(socket);

            socket.on("getOnlineUsers",(users) =>{
                setOnlineUsers(users);
            });
            
            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }

    },[authUser]);

    return(
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
*/
