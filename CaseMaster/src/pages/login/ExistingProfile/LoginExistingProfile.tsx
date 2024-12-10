import React, { useRef, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


const LoginExistingProfile = () => {
const navigate = useNavigate();

const handleContinue = () => {
  navigate('/existing-profile-pin');
}


  return (
    <div style={{position:'relative'}}>
       <div style={{
          position: 'absolute',
          top: '-5rem',
          left: '5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
            <button className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center" >
            <ArrowBackIcon />
            </button>
            <p>Back</p>
      </div>
      <div className='mt-56'>
          <div className='flex justify-center items-center flex-col'>
            <h1 className="font-bold text-3xl text-[#0f2043] mt-8">Log into an existing profile</h1>
            <p className="text-xl text-[#0f2043] text-opacity-40 mt-4">Use your email or phone to log your profile</p>
            <div className='flex justify-center items-center flex-col mt-6'>
                <input className='w-96 h-12 bg-tranparent border rounded-md'></input>
                <div className='flex justify-between items-center gap-40 mt-10'>
                    <p className='text-sm text-[#517fd3]'>Set up new profile</p>
                    <Button
                    variant='contained'
                    sx={{textTransform:'none', borderRadius:'0.5rem'}}
                    onClick={handleContinue}
                    >Continue</Button>
                </div>
            </div>
          <div>
          </div>
            
        </div> 
      </div> 
      
    </div>
  );
};

export default LoginExistingProfile;
