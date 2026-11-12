import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  const { selectedConversation } = useConversation();
  useListenMessages();

  const messagesContainerRef = useRef(null);
  const previousConversationIdRef = useRef(selectedConversation?._id);
  const shouldScrollToBottomRef = useRef(true);
  const isNearBottomRef = useRef(true);

  useEffect(() => {
    if (previousConversationIdRef.current !== selectedConversation?._id) {
      previousConversationIdRef.current = selectedConversation?._id;
      shouldScrollToBottomRef.current = true;
      isNearBottomRef.current = true;
    }
  }, [selectedConversation?._id]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (loading || !container) return;

    // Keep the scroll inside the message pane so long chats never move the page.
    if (shouldScrollToBottomRef.current || isNearBottomRef.current) {
      container.scrollTop = container.scrollHeight;
      shouldScrollToBottomRef.current = false;
    }
  }, [messages, loading, selectedConversation?._id]);

  const trackScrollPosition = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    isNearBottomRef.current = distanceFromBottom < 100;
  };

  return (
    <div
      ref={messagesContainerRef}
      onScroll={trackScrollPosition}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5"
    >
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id}>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {!loading && messages.length === 0 && (
        <p className="mt-8 text-center text-sm text-[#777466]">Send a message to get started.</p>
      )}
    </div>
  );
};

export default Messages;
