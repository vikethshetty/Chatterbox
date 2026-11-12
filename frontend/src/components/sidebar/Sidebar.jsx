import { FiMessageCircle } from "react-icons/fi";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ className = "" }) => (
  <aside className={`flex min-h-0 w-full min-w-0 shrink-0 flex-col border-r border-[#e5ddce] bg-[#FFFBF4] p-4 sm:w-[300px] sm:p-5 ${className}`}>
    <header className="mb-7 flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#11120D] text-[#FFFBF4]">
        <FiMessageCircle className="text-lg" />
      </span>
      <span className="text-[17px] font-bold tracking-[-.04em] text-[#11120D]">ChatterBox</span>
    </header>

    <div className="mb-3 flex items-center justify-between">
      <h1 className="text-sm font-semibold text-[#11120D]">Messages</h1>
      <span className="text-xs text-[#777466]">Inbox</span>
    </div>
    <SearchInput />
    <div className="mb-2 mt-5 border-t border-[#e5ddce]" />
    <Conversations />
    <LogoutButton />
  </aside>
);

export default Sidebar;
