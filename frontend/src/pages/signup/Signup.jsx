import { Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import GenderCheckbox from "./GenderCheckbox";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "", username: "", email: "", password: "", confirmPassword: "", gender: "",
  });
  const { loading, signup } = useSignup();

  const updateField = (field) => (event) => {
    setInputs((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(inputs);
  };

  return (
    <AuthLayout
      className="signup-card"
      title="Create an account"
      description="Set up your ChatterBox profile."
      footer={<>Already have an account? <Link to="/login" className="auth-link ml-1">Sign in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-fullname" className="auth-label">Full name</label>
            <input id="signup-fullname" type="text" autoComplete="name" placeholder="Full name" className="auth-input" value={inputs.fullName} onChange={updateField("fullName")} required />
          </div>
          <div>
            <label htmlFor="signup-username" className="auth-label">Username</label>
            <input id="signup-username" type="text" autoComplete="username" placeholder="Username" className="auth-input" value={inputs.username} onChange={updateField("username")} required />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="auth-label">Email address</label>
          <input id="signup-email" type="email" autoComplete="email" placeholder="name@example.com" className="auth-input" value={inputs.email} onChange={updateField("email")} required />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-password" className="auth-label">Password</label>
            <input id="signup-password" type="password" autoComplete="new-password" placeholder="Create a password" className="auth-input" value={inputs.password} onChange={updateField("password")} required />
          </div>
          <div>
            <label htmlFor="signup-confirm-password" className="auth-label">Confirm password</label>
            <input id="signup-confirm-password" type="password" autoComplete="new-password" placeholder="Enter it again" className="auth-input" value={inputs.confirmPassword} onChange={updateField("confirmPassword")} required />
          </div>
        </div>

        <GenderCheckbox
          selectedGender={inputs.gender}
          onCheckboxChange={(gender) => setInputs((current) => ({ ...current, gender }))}
        />

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
