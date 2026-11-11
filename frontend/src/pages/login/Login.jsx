import { Link } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthLayout from "../../components/auth/AuthLayout";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account."
      footer={<>New to ChatterBox? <Link to="/signup" className="auth-link ml-1">Create an account</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-username" className="auth-label">Username</label>
          <input
            id="login-username"
            type="text"
            autoComplete="username"
            placeholder="Your username"
            className="auth-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div>
          <div className="mb-[7px] flex items-center justify-between">
            <label htmlFor="login-password" className="auth-label mb-0">Password</label>
            <Link to="/forgot" className="auth-link">Forgot password?</Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              className="auth-input pr-12"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center text-[#8e8b7e] hover:text-[#565449]"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
