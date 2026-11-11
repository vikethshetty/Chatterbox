import { Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import useResetPassword from "../../hooks/useResetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, reset } = useResetPassword();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await reset(email);
    setEmail("");
    setTimeout(() => { window.location.href = "/login"; }, 2000);
  };

  return (
    <AuthLayout
      title="Forgot password"
      description="Enter the email linked to your account."
      footer={<>Remembered your password? <Link to="/login" className="auth-link ml-1">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="forgot-email" className="auth-label">Email address</label>
          <input id="forgot-email" type="email" autoComplete="email" placeholder="name@example.com" className="auth-input" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Send reset link"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
