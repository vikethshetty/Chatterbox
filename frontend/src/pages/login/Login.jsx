import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin  from "../../hooks/useLogin";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMessageCircle, FiUser } from "react-icons/fi";

const Login = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);

    const {loading,login}=useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(username,password);
    }


  return (
    <main className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-950/85 px-6 py-8 shadow-2xl shadow-slate-950/50 backdrop-blur-2xl sm:px-10 sm:py-10">
      <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

      <section className="relative z-10">
        <header className="mb-9 flex items-center justify-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-blue-900/40">
            <FiMessageCircle className="text-xl" />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">ChatterBox</span>
        </header>

        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Sign in</h1>
          <p className="mt-2 text-sm text-slate-400">Welcome back</p>
        </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-username" className="mb-2 block text-sm font-medium text-slate-200">Username</label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">
                <FiUser className="shrink-0 text-lg text-slate-500" />
                <input
                  id="login-username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-200">Password</label>
                <Link to="/forgot" className="text-xs font-medium text-cyan-300 transition hover:text-cyan-200 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/80 px-4 transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">
                <FiLock className="shrink-0 text-lg text-slate-500" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="shrink-0 text-slate-400 transition hover:text-white"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-bold text-slate-950 shadow-lg shadow-blue-950/30 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : <>Sign in <FiArrowRight /></>}
            </button>
          </form>

          <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
            New to ChatterBox?{" "}
            <Link to="/signup" className="font-semibold text-cyan-300 transition hover:text-cyan-200 hover:underline">
              Create an account
            </Link>
          </p>
      </section>
    </main>
  );
};

export default Login;


/*
STARTER CODE FOR THIS FILE

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
                <span className='text-blue-500'> ChatApp</span>
            </h1>

            <form>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"/>
                </div>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10"/>
                </div>
                
                <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">{"Don't"} have an account?</a>

                <div><button className="btn btn-block btn-sm mt-2">Login</button></div>
            </form>
        </div>
    </div>
  );
};

export default Login;
*/
