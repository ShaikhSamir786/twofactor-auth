
import React from 'react'
import TwoFASetup from '../components/TwoFAStep.jsx';
import { useNavigate } from 'react-router-dom';


const Setup2fa = () => {
  
  const navigate = useNavigate();
  const handleSetupComplete = () => {
    navigate("/verify2fa");

  };

  return <TwoFASetup onSetupComplete={handleSetupComplete} />
}

export default Setup2fa
