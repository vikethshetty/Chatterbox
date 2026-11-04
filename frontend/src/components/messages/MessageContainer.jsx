import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import ProfileAvatar from "../ProfileAvatar";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => () => setSelectedConversation(null), [setSelectedConversation]);

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-slate-950/20">
      {!selectedConversation ? <NoChatSelected /> : <>
        <ChatHeader conversation={selectedConversation} />
        <Messages />
        <MessageInput />
      </>}
    </section>
  );
};

const ChatHeader = ({ conversation }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <header className="flex items-center gap-3 border-b border-white/10 bg-slate-950/35 px-5 py-4">
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-800 ring-2 ring-white/10">
        <ProfileAvatar profilePic={conversation.profilePic} gender={conversation.gender} alt={`${conversation.fullName}'s avatar`} className="h-full w-full object-cover" />
        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 ${isOnline ? "bg-emerald-400" : "bg-slate-500"}`} />
      </span>
      <div className="min-w-0">
        <h2 className="truncate text-sm font-semibold text-white">{conversation.fullName}</h2>
        <p className={`mt-0.5 text-xs ${isOnline ? "text-emerald-300" : "text-slate-500"}`}>{isOnline ? "Online" : "Offline"}</p>
      </div>
    </header>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex h-full min-h-0 items-center justify-center p-6 text-center">
      <div className="-mt-4 max-w-sm">
        <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-[1.75rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 text-cyan-200 shadow-xl shadow-blue-950/20">
          <TiMessages className="text-5xl" />
        </span>
        <p className="text-sm font-medium text-cyan-200">Welcome back, {authUser?.fullName}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Your conversations, all in one place.</h1>
        <p className="mt-2 text-sm text-slate-400">Choose someone from the list to start chatting.</p>
      </div>
    </div>
  );
};

export default MessageContainer;
