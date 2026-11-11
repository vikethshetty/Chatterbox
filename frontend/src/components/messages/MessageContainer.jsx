import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import ProfileAvatar from "../ProfileAvatar";

const MessageContainer = ({ className = "" }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => () => setSelectedConversation(null), [setSelectedConversation]);

  return (
    <section className={`min-w-0 flex-1 flex-col bg-[#D8CFBC] ${className}`}>
      {!selectedConversation ? <NoChatSelected /> : <>
        <ChatHeader conversation={selectedConversation} onBack={() => setSelectedConversation(null)} />
        <Messages />
        <MessageInput />
      </>}
    </section>
  );
};

const ChatHeader = ({ conversation, onBack }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-[#c9c1b1] bg-[#FFFBF4] px-4 py-3 sm:px-6">
      <button type="button" onClick={onBack} aria-label="Back to conversations" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[#565449] hover:bg-[#ece6d8] sm:hidden">
        <FiArrowLeft />
      </button>
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#e5ddce]">
        <ProfileAvatar profilePic={conversation.profilePic} gender={conversation.gender} alt={`${conversation.fullName}'s avatar`} className="h-full w-full object-cover" />
        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#FFFBF4] ${isOnline ? "bg-[#565449]" : "bg-[#b4ad9e]"}`} />
      </span>
      <div className="min-w-0">
        <h2 className="truncate text-sm font-semibold text-[#11120D]">{conversation.fullName}</h2>
        <p className="mt-0.5 text-xs text-[#777466]">{isOnline ? "Online" : "Offline"}</p>
      </div>
    </header>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex h-full min-h-0 flex-1 items-center justify-center p-6 text-center">
      <div className="max-w-sm">
        <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#ece6d8] text-[#565449]">
          <FiMessageCircle className="text-3xl" />
        </span>
        <p className="text-sm text-[#777466]">Signed in as {authUser?.fullName}</p>
        <h1 className="mt-2 text-xl font-semibold tracking-[-.03em] text-[#11120D]">Select a conversation</h1>
      </div>
    </div>
  );
};

export default MessageContainer;
