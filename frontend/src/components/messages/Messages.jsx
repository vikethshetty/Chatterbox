import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const {messages,loading}=useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({behavior : "smooth"});
      },100);
  },[messages]);
  
  return (
    <div className="min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-5">
        {!loading && messages.length > 0 && messages.map((message) => (
          <div key={message._id}
          ref={lastMessageRef}
          >
            <Message  message={message} />
          </div>
        ))}
        
        {loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx} />)}

        {!loading && messages.length === 0 && (
          <p className="mt-8 text-center text-sm text-[#777466]">Send a message to get started.</p>
        )}
      </div>
  )
}

export default Messages



/*

import Message from "./Message";

const Messages = () => {
  return (
    <div className="px-4 flex-1 overflow-auto">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />

    </div>
  )
}

export default Messages


*/
