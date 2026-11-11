import { Navigate, Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import Forgot from './pages/forgot/ForgotPassword';
import Reset from './pages/reset/ResetPassword';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const {authUser} = useAuthContext();

  return (
    
    <div className="flex min-h-dvh items-center justify-center p-3 sm:p-6">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login /> } />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp /> } />
        <Route path="/forgot" element= {<Forgot />} />
        <Route path="/reset/:token" element={<Reset/>} />
      </Routes>
      <Toaster position="top-center" toastOptions={{ style: { border: '1px solid #c9c1b1', borderRadius: '12px', background: '#FFFBF4', color: '#11120D', boxShadow: '0 8px 24px rgba(17,18,13,.12)' } }} />
    </div>
  );
  

}

export default App;
