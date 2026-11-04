import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex h-[calc(100dvh-2rem)] min-h-[32rem] w-full max-w-[1440px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home;

/*

import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home;

*/
