import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <aside className="flex w-[min(36%,320px)] min-w-[250px] shrink-0 flex-col border-r border-white/10 bg-slate-950/45 p-4 sm:p-5">
        <div className="mb-5">
          <h1 className="mb-4 text-lg font-semibold tracking-tight text-white">Messages</h1>
          <SearchInput />
        </div>
        <div className="mb-3 border-t border-white/10" />
        <Conversations />
        <LogoutButton />
    </aside>
  )
}

export default Sidebar;

/*
Starter Code

import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <LogoutButton />
        
    </div>
  )
}

export default Sidebar;

*/
