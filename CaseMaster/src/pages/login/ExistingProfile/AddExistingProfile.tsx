import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';



const AddExistingProfile = () => {
const navigate = useNavigate();

const handleBack = () => {
  navigate('/');
}
const loginExistingProfile = () => {
  navigate('/login-existing-profile');
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
        <button  onClick={handleBack} className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center">
          <ArrowBackIcon />
        </button>
        <p>Back</p>
      </div >
      <div className='mt-56'>
        <div className='flex jusstify-cente items-center flex-col'>
        <h1 className="font-bold text-3xl text-[#0f2043] mt-8">What would you like to do?</h1>
        <p className="text-xl text-[#0f2043] text-opacity-40 mt-4">To continue, choose an option to either create a new one or</p>
        <p className="text-xl text-[#0f2043] text-opacity-40">log into an existing profile.</p>
        <div className='flex justify-center items-center flex-col'>
        <Button 
        variant='contained'
        sx={{
          marginTop:'2rem',
          backgroundColor:'#0f2043',
          textTransform:'none',
          width:'100%',
          borderRadius:'0.5rem',
        }}
        >
          Set up a New Profile
        </Button>
        <Button
        variant='outlined'
        sx={{
          marginTop:'1rem',
          borderColor:'#0f2043',
          color:'#0f2043',
          textTransform:'none',
          borderRadius:'0.5rem',
        }}
        onClick={loginExistingProfile}
        >
          Log in Existing Profile
        </Button>
        </div>
        </div>
      </div>

    </div>
  );
};

export default AddExistingProfile;
