import React from 'react'
import Loginform from '../components/Loginform.jsx';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/useSession.js';

const LoginPage = () => {

  const navigate  = useNavigate();
  const { login } = useSession();

  const handleLoginSuccess = (userdata) => {
    login(userdata);
    
    if(!userdata.isMfaActive) {
      navigate("/setup2fa");
    } else {
      navigate("/verify2fa");
    }
  };

  return <Loginform onLoginSuccess={handleLoginSuccess} />;
}

export default LoginPage
