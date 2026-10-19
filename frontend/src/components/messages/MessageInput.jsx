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
    <div className="px-4 my-3">
      <div className="w-full relative">
        {showEmoji && (
          <div className="absolute bottom-full right-0 z-50 mb-2">
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={28}
              onEmojiSelect={addEmoji}
              maxFrequentRows={0}
              theme="dark"
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="absolute bottom-3 right-3 flex items-center">
            <button
              type="button"
              aria-label="Choose emoji"
              aria-expanded={showEmoji}
              onClick={() => setShowEmoji((isOpen) => !isOpen)}
              className="mr-2"
            >
              <BsEmojiSmile />
            </button>
            <label className="mr-2 cursor-pointer" aria-label="Attach a file">
              <input type="file" id="file" className="hidden" onChange={(e) => sendFile(e.target.files)} />
              <GrAttachment />
            </label>
            <button type="submit" className="flex items-center" aria-label="Send message" disabled={loading}>
              {loading ? <div className="loading loading-spinner" /> : <BsSend />}
            </button>
          </div>
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 pr-24 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
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
