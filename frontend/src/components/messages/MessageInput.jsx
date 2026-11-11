import { useState } from "react";
import { BsSend,BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import useSendMessage from "../../hooks/useSendMessage";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react' 


const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { loading, sendMessage } = useSendMessage();

  const addEmoji = (e) => {
    const emoji = e.native || String.fromCodePoint(...e.unified.split("_").map((code) => parseInt(code, 16)));
    setMessage((currentMessage) => currentMessage + emoji);
  };

  const sendFile = (e) => {
    console.log(e);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowEmoji(false);
    if (!message.trim() || loading) return;
    await sendMessage(message.trim());
    setMessage("");
  };

  return (
    <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
      <div className="relative w-full">
        {showEmoji && (
          <div className="absolute bottom-full right-0 z-50 mb-2">
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={28}
              onEmojiSelect={addEmoji}
              maxFrequentRows={0}
              theme="light"
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="absolute inset-y-0 right-2 flex items-center gap-1">
            <button
              type="button"
              aria-label="Choose emoji"
              aria-expanded={showEmoji}
              onClick={() => setShowEmoji((isOpen) => !isOpen)}
              className="grid h-9 w-9 place-items-center rounded-lg text-[#8e8b7e] transition hover:bg-[#ece6d8] hover:text-[#565449]"
            >
              <BsEmojiSmile />
            </button>
            <label className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-[#8e8b7e] transition hover:bg-[#ece6d8] hover:text-[#565449]" aria-label="Attach a file">
              <input type="file" id="file" className="hidden" onChange={(e) => sendFile(e.target.files)} />
              <GrAttachment />
            </label>
            <button type="submit" className="grid h-9 w-9 place-items-center rounded-lg bg-[#11120D] text-[#FFFBF4] transition hover:bg-[#565449] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send message" disabled={loading || !message.trim()}>
              {loading ? <span className="loading loading-spinner loading-xs" /> : <BsSend />}
            </button>
          </div>
          <input
            type="text"
            className="block h-12 w-full rounded-xl border border-[#c9c1b1] bg-[#FFFBF4] py-2.5 pl-4 pr-32 text-sm text-[#11120D] outline-none transition placeholder:text-[#999587] focus:border-[#565449] focus:ring-2 focus:ring-[#565449]/10"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default MessageInput;

/*

import { useState } from "react";
import { BsSend,BsEmojiSmile } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react' 


const MessageInput = () => {

  const [message,setMessage] = useState("");
  const [showEmoji,setShowEmoji] = useState(false);
  const {loading,sendMessage} = useSendMessage();

  const addEmoji = (e) =>{
    const sym = e.unified.split("_");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));

    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
  } 


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className='w-full relative'>
        { showEmoji && 
              <Picker className="px-4 flex-1 overflow-auto"
                data={data} 
                emojiSize={20} 
                emojiButtonSize={28} 
                onEmojiSelect ={addEmoji}
                maxFrequentRows={0} 
              />
            }
        
            <input 
                type="text" 
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                placeholder="Send a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <div 
                onClick = { () => setShowEmoji(!showEmoji)} 
                className='absolute inset-y-0 end-6 flex items-center pe-3'>
              <BsEmojiSmile />
            </div>
            <button type="submit" className='absolute inset-y-0 end-0 flex items-center pe-3'>
            {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
            </button>
            
        </div>
    </form>
  );
};

export default MessageInput;

*/


/*
Starter Code

import { BsSend } from "react-icons/bs";


const MessageInput = () => {
  return (
    <form className="px-4 my-3">
        <div className="w-full">
            <input 
                type="text" 
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                placeholder="Type your message here..."
            />
        </div>
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
            <BsSend />
        </button>
    </form>
  )
}

export default MessageInput
*/
