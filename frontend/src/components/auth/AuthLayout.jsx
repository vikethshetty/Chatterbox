import { FiMessageCircle } from "react-icons/fi";

const AuthLayout = ({ title, description, children, footer, className = "" }) => (
  <main className={`auth-card ${className}`}>
    <header className="auth-brand">
      <span className="auth-brand-mark"><FiMessageCircle aria-hidden="true" /></span>
      <span>ChatterBox</span>
    </header>
    <div className="auth-heading">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
    {children}
    {footer && <div className="auth-footer">{footer}</div>}
  </main>
);

export default AuthLayout;
