import { Link } from "react-router-dom";
import { useState } from "react";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";
import GenderCheckbox from "./GenderCheckbox";
import useSignup from "../../hooks/useSignup";

const inputClassName = "h-11 w-full rounded-xl border border-white/10 bg-slate-900/75 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs((current) => ({ ...current, gender }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(inputs);
  };

  const updateField = (field) => (event) => {
    setInputs((current) => ({ ...current, [field]: event.target.value }));
  };

  return (
    <main className="relative mx-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-[1.75rem] border border-white/15 bg-slate-950/90 px-5 py-6 shadow-[0_24px_80px_rgba(2,6,23,0.65)] backdrop-blur-2xl [scrollbar-width:none] sm:px-8 sm:py-7 [&::-webkit-scrollbar]:hidden">
      <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

      <section className="relative z-10">
        <header className="mb-5 flex items-center justify-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-blue-900/40 ring-1 ring-white/20">
            <FiMessageCircle className="text-xl" />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">ChatterBox</span>
        </header>

        <div className="mb-5 text-center">
          <h1 className="text-[1.75rem] font-bold tracking-tight text-white">Create your account</h1>
          <p className="mt-1.5 text-sm text-slate-400">A few details and you’re in.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-fullname" className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-300">FULL NAME</label>
              <input id="signup-fullname" type="text" autoComplete="name" placeholder="Your name" className={inputClassName} value={inputs.fullName} onChange={updateField("fullName")} />
            </div>
            <div>
              <label htmlFor="signup-username" className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-300">USERNAME</label>
              <input id="signup-username" type="text" autoComplete="username" placeholder="Choose a username" className={inputClassName} value={inputs.username} onChange={updateField("username")} />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-300">EMAIL ADDRESS</label>
            <input id="signup-email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClassName} value={inputs.email} onChange={updateField("email")} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="signup-password" className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-300">PASSWORD</label>
              <input id="signup-password" type="password" autoComplete="new-password" placeholder="Create a password" className={inputClassName} value={inputs.password} onChange={updateField("password")} />
            </div>
            <div>
              <label htmlFor="signup-confirm-password" className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-300">CONFIRM PASSWORD</label>
              <input id="signup-confirm-password" type="password" autoComplete="new-password" placeholder="Repeat password" className={inputClassName} value={inputs.confirmPassword} onChange={updateField("confirmPassword")} />
            </div>
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-bold text-slate-950 shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : <>Create account <FiArrowRight /></>}
          </button>
        </form>

        <p className="mt-5 border-t border-white/10 pt-4 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200 hover:underline">Sign in</Link>
        </p>
      </section>
    </main>
  );
};

export default SignUp;
