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
        <label className="relative min-w-0 flex-1">
        <IoSearchSharp aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8e8b7e]" />
        <input type="text" aria-label="Search conversations" placeholder="Find a person" className="h-10 w-full rounded-[10px] border border-[#c9c1b1] bg-[#FFFBF4] pl-9 pr-3 text-[13px] text-[#11120D] outline-none transition placeholder:text-[#999587] focus:border-[#565449] focus:ring-2 focus:ring-[#565449]/10" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </label>
        <button type="submit" aria-label="Search" className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-[#c9c1b1] bg-[#ece6d8] text-[#565449] transition hover:bg-[#e4dccb]">
        <IoSearchSharp className="h-4 w-4 outline-none"/>
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
