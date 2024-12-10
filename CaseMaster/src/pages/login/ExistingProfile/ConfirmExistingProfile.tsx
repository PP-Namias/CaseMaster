import React, { useState } from 'react'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

const ConfirmExistingProfile = () => {
  const [verificationMethod, setVerificationMethod] = useState('email');
  const handleSwitchMethod = () => {
    setVerificationMethod((prev) => (prev === 'email' ? 'phone' : 'email'));
  };

  const verificationText =
  verificationMethod === 'email' ? (
    <>
      <span>An email with a 6-digit verification code</span>
      <br />
      <span>was just sent to (t*****@gmail.com)</span>
    </>
  ) : (
    <>
      <span>An SMS with a 6-digit verification code</span>
      <br />
      <span>was just sent to (+123 **** 5678)</span>
    </>
  );

  const switchMethodText =
    verificationMethod === 'email' ? 'Verify phone instead' : 'Verify email instead';

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '-5rem',
          left: '5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <button className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center">
          <ArrowBackIcon />
        </button>
        <p>Back</p>
      </div>
      <div className="mt-56">
        <div className="flex justify-center items-center flex-col">
          <p className="font-bold text-3xl text-[#0f2043]">2-step Verification</p>
          <p className="text-xl text-[#0f2043] text-opacity-40 mt-4 tracking-tight text-center">
            {verificationText}
          </p>
          <input className="w-[22rem] h-12 bg-transparent border rounded-md mt-6 mb-4" />
          <div className="flex justify-between items-center w-[28.5%] mt-4">
            <div className="flex justify-center items-start flex-col">
                <p className="text-sm text-[#517FD3] cursor-pointer">Resend Code</p>
              <p
                className="text-sm text-[#517FD3] cursor-pointer"
                onClick={handleSwitchMethod}
              >
                {switchMethodText}
              </p>
              
            </div>
            <div>
              <Button
                variant="contained"
                sx={{ textTransform: 'none', borderRadius: '0.5rem' }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmExistingProfile;
