import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import ProfileAvatar from "../ProfileAvatar";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <button
      type="button"
      onClick={() => setSelectedConversation(conversation)}
      aria-pressed={isSelected}
      className={`mb-1.5 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
        isSelected
          ? "bg-cyan-400/10 ring-1 ring-cyan-300/25"
          : "hover:bg-white/[0.06]"
      }`}
    >
      <span className="relative shrink-0">
        <span className="block h-12 w-12 overflow-hidden rounded-full bg-slate-800 ring-2 ring-white/10">
          <ProfileAvatar
            profilePic={conversation.profilePic}
            gender={conversation.gender}
            alt={`${conversation.fullName}'s avatar`}
            className="h-full w-full object-cover"
          />
        </span>
        <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 ${isOnline ? "bg-emerald-400" : "bg-slate-500"}`} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-sm font-semibold ${isSelected ? "text-white" : "text-slate-200"}`}>
          {conversation.fullName}
        </span>
        <span className={`mt-1 block text-xs ${isOnline ? "text-emerald-300" : "text-slate-500"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </span>
    </button>
  );
};

export default Conversation;
