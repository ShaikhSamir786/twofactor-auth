import React from 'react';
import { useNavigate } from 'react-router-dom';
import TwoVerify from '../components/TwoVerify';

const Verify2fa = () => {
  const navigate = useNavigate();

  const handleVerificationSuccess = async (data) => {
    // On success, navigate to home
    if (data) {
      navigate('/');
    }
  };

  const handleResetSuccess = () => {
    // Navigate to 2FA setup
    navigate('/setup2fa');
  };

  return (
    <TwoVerify
      onVerifySuccess={handleVerificationSuccess}
      onResetSuccess={handleResetSuccess}
    />
  );
};

export default Verify2fa;
