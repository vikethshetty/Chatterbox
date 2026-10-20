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
    <main className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:grid md:grid-cols-2">
      <section className="relative flex min-h-52 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-6 text-white sm:p-9 md:min-h-[590px] md:p-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur">
            <FiMessageCircle className="text-2xl" />
          </div>
          <span className="text-xl font-bold tracking-tight">ChatterBox</span>
        </div>

        <div className="relative z-10 my-8 md:my-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">Your people, one place</p>
          <h1 className="max-w-md text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Good conversations start here.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100 sm:text-base">
            Sign in to catch up, share a moment, and stay close to the people who matter.
          </p>
        </div>

        <div className="relative z-10 hidden items-center gap-3 text-sm text-blue-100 md:flex">
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
          Simple, real-time conversations
        </div>
      </section>

      <section className="flex items-center p-6 sm:p-10 md:p-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
              Welcome back
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Sign in</h2>
            <p className="mt-2 text-sm text-slate-400">Enter your account details to continue.</p>
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
        </div>
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
