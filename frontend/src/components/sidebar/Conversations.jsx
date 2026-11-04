import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';


const Conversations = () => {
  const {loading,conversations} = useGetConversations();
  //console.log("Conversations :",conversations);
  return (
    <div className="flex-1 overflow-y-auto py-1 [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,.25)_transparent]">
      {conversations.map((conversation,idx)=>(
        <Conversation 
         key={conversation._id}
         conversation={conversation}
         lastIdx={idx === conversations.length - 1}
        />
      ))}
      
      {loading ? <div className="flex justify-center py-6"><span className="loading loading-spinner loading-sm text-cyan-300" /></div> : null}
      {!loading && conversations.length === 0 && <p className="px-2 py-6 text-center text-sm text-slate-500">No conversations yet</p>}
    </div>
  )
}

export default Conversations

/*
STARTER CODE

import Conversation from './Conversation'

const Conversations = () => {
  return (
    <div className="py-2 flex-col overflow-auto">
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
    </div>
  )
}

export default Conversations

*/
