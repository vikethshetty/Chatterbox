import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";


const SearchInput = () => {
  const [search,setSearch] = useState("");
  const { setSelectedConversation }= useConversation();
  const { conversations }=useGetConversations();

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!search) return;

    if(search.length<3){
      return toast.error("Search must be at least 3 characters long");
    }

    const conversation = conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    }else{
      toast.error("No such user found");
    }
  }

  
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input type="text" aria-label="Search conversations" placeholder="Search people" className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900/80 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/15" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" aria-label="Search" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-950/30 transition hover:brightness-110">
        <IoSearchSharp className="h-5 w-5 outline-none"/>
        </button>
    </form>
  );
}

export default SearchInput;


/*

STARTER CODE

import { IoSearchSharp } from "react-icons/io5";


const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
        <input type="text" placeholder="Search..." className="input input-bordered rounded-full" />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none"/>
        </button>
    </form>
  );
}

export default SearchInput;

*/
