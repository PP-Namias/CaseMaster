import React, { useState, useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Margin } from '@mui/icons-material';

const PINSetUp = () => {
  const navigate = useNavigate();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [showPin, setShowPin] = useState(true);
  const [pinValues, setPinValues] = useState(['', '', '', '']);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<'set-pin' | 'confirm-pin'>('set-pin');
  const [setPin, setSetPin] = useState<string>('');
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newPinValues = [...pinValues];

    if (/^\d$/.test(value)) {
      newPinValues[index] = value;

      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    } else if (value === '') {
      newPinValues[index] = value;

      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
      
    }
    setPinValues(newPinValues);
  };

  const handleConfirm = () => {
    if (currentView === 'set-pin') {
      const enteredPin = pinValues.join('');
      if (enteredPin.length === 4) {
        setSetPin(enteredPin);
        setPinValues(['', '', '', '']);
        setCurrentView('confirm-pin');
      } else {
        setErrorIndexes([0, 1, 2, 3]);
        setTimeout(() => {
          setErrorIndexes([]);
        }, 1000);
      }
    } else if (currentView === 'confirm-pin') {
      const enteredPin = pinValues.join('');
      if (enteredPin === setPin) {
        navigate('/profiles');
      } else {
        setErrorIndexes([0, 1, 2, 3]);
        setTimeout(() => {
          setErrorIndexes([]);
        }, 1000);
        setPinValues(['', '', '', '']);
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
          position: 'absolute',
          top: '-5rem',
          left: '5rem',
          zIndex: 10, 
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center"
        >
          <ArrowBackIcon sx={{color:''}}/>
        </button>
        <p>Back</p>
      </div>
      <div className="flex justify-center items-center flex-col mt-56">
        <div>
          <div className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center mb-4">
            3
          </div>
        </div>

        <h1 className="font-bold text-3xl text-[#0f2043]">
          {currentView === 'set-pin' ? 'Set your PIN Code' : 'Confirm your PIN Code'}
        </h1>
        <p className="text-xl text-[#0f2043] text-opacity-40">
          {currentView === 'set-pin'
            ? "Make sure it's easy to remember"
            : 'Please re-enter your PIN to continue'}
        </p>

        <div className="flex justify-center mt-[1.5rem]">
          {inputRefs.map((ref, index) => (
           <TextField
           key={index}
           inputRef={ref}
           type={showPin ? 'password' : 'text'}
           inputProps={{
             maxLength: 1,
             style: {
               textAlign: 'center',
               fontSize: '2rem',
               padding: 0, 
               margin: 0, 
             },
           }}
           value={pinValues[index]}
           onChange={(e) => handleInputChange(e, index)}
           className="w-20 mr-2"
           variant="outlined"
           error={errorIndexes.includes(index)}
           sx={{
            borderRadius: '10px',
             margin: '0.3rem',
             '& .MuiOutlinedInput-root': {
               borderRadius: '10px',
               height: '5.5rem',
               backgroundColor: pinValues[index] !== '' ? '#517fd3' : '', 
               '& fieldset': {
                 borderColor: '#517FD3',
          
               },
               '&:hover fieldset': {
                 borderColor: '#517FD3',
               },
               '&.Mui-focused fieldset': {
                 borderColor: '#517FD3',
               },
            
               '& input': {
                 backgroundColor: pinValues[index] !== '' ? '#517fd3' : '',
                 color: pinValues[index] !== '' ? '#fff' : '', 
                 height: '100%', 
                 boxSizing: 'border-box', 
                 padding: 0, 
                 margin: 0, 
                borderRadius: '10px',
               },
             },
           }}
         />         
          ))}
        </div>
        <div className='mt-8'>
        <Button 
            variant="contained" 
            onClick={handleConfirm} 
            sx={{textTransform: 'none'}}
            disabled={pinValues.some((value) => value === '')}
            >Confirm
        </Button>
        </div>
      </div>
    </div>
  );
};

export default PINSetUp;
