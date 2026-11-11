import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import ProfileAvatar from "../ProfileAvatar";


const LogoutButton = () => {

  const {loading,logout}= useLogout();
  const {authUser} = useAuthContext();
  
  return (
    <div className="mt-3 border-t border-[#e5ddce] pt-3">
      {!loading ? (
        <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm text-[#777466] transition hover:bg-[#f3eee4] hover:text-[#11120D]" aria-label="Log out">
          <span className="block h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#e5ddce]">
            <ProfileAvatar profilePic={authUser?.profilePic} gender={authUser?.gender} alt="Your avatar" className="h-full w-full object-cover" />
          </span>
          <span className="min-w-0 flex-1 truncate font-medium text-[#343329]">{authUser?.fullName}</span>
          <BiLogOut className="h-5 w-5 shrink-0" />
        </button>
      ) : (
        <div className="flex justify-center"><span className="loading loading-spinner loading-sm text-[#565449]" /></div>
      )}
    </div>
  )
}

export default LogoutButton

/*

import { BiLogOut } from "react-icons/bi";


const LogoutButton = () => {
  return (
    <div className="mt-auto ">
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
    </div>
  )
}

export default LogoutButton

*/
