import { Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import useReset from "../../hooks/useReset";

const ResetPassword = () => {
  const { loading, reset } = useReset();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await reset(password, confirmPassword);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <AuthLayout
      title="Choose a new password"
      description="Use a password you have not used here before."
      footer={<>Back to <Link to="/login" className="auth-link ml-1">sign in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="reset-password" className="auth-label">New password</label>
          <input id="reset-password" type="password" autoComplete="new-password" placeholder="New password" className="auth-input" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="reset-confirm-password" className="auth-label">Confirm new password</label>
          <input id="reset-confirm-password" type="password" autoComplete="new-password" placeholder="Enter it again" className="auth-input" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
        </div>
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Update password"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
