import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const sentTime = extractTime(message.createdAt);

  return (
    <div className={`mb-3 flex ${fromMe ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[82%] sm:max-w-[70%] ${fromMe ? "items-end" : "items-start"}`}>
        <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-[0_1px_2px_rgba(17,18,13,.08)] ${fromMe ? "rounded-br-md bg-[#11120D] text-[#FFFBF4]" : "rounded-bl-md border border-[#c9c1b1] bg-[#FFFBF4] text-[#11120D]"} ${message.shouldShake ? "shake" : ""}`}>
          {message.message}
        </div>
        <div className={`mt-1 flex items-center gap-1.5 text-[11px] text-[#777466] ${fromMe ? "justify-end" : "justify-start"}`}>
          <span>{sentTime}</span>
          {!fromMe && selectedConversation?.fullName && <span className="sr-only">from {selectedConversation.fullName}</span>}
        </div>
      </div>
    </div>
  );
};

export default Message;
