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
          ? "bg-[#ece6d8] ring-1 ring-[#c9c1b1]"
          : "hover:bg-[#f3eee4]"
      }`}
    >
      <span className="relative shrink-0">
        <span className="block h-11 w-11 overflow-hidden rounded-full bg-[#e5ddce] ring-1 ring-[#c9c1b1]">
          <ProfileAvatar
            profilePic={conversation.profilePic}
            gender={conversation.gender}
            alt={`${conversation.fullName}'s avatar`}
            className="h-full w-full object-cover"
          />
        </span>
        <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#FFFBF4] ${isOnline ? "bg-[#565449]" : "bg-[#b4ad9e]"}`} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-sm font-semibold ${isSelected ? "text-[#11120D]" : "text-[#343329]"}`}>
          {conversation.fullName}
        </span>
        <span className={`mt-1 block text-xs ${isOnline ? "text-[#565449]" : "text-[#8e8b7e]"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </span>
    </button>
  );
};

export default Conversation;
