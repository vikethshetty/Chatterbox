import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";


const LogoutButton = () => {

  const {loading,logout}= useLogout();
  const {authUser} = useAuthContext();
  
  return (
    <div className="mt-3 border-t border-white/10 pt-4">
      {!loading ? (
        <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm text-slate-400 transition hover:bg-white/[0.06] hover:text-white" aria-label="Log out">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-slate-800 ring-1 ring-white/10">
            <span className="text-sm font-semibold text-white">{authUser?.fullName?.charAt(0)?.toUpperCase()}</span>
          </span>
          <span className="min-w-0 flex-1 truncate font-medium text-slate-200">{authUser?.fullName}</span>
          <BiLogOut className="h-5 w-5 shrink-0" />
        </button>
      ) : (
        <div className="flex justify-center"><span className="loading loading-spinner loading-sm text-cyan-300" /></div>
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
