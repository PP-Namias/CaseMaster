import React, { useState, useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ProfileIcon from './capy.jpg';
import Button from '@mui/material/Button';
import ModalView from './ModalComponent'; // Import your ModalView component

interface Profile {
  id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profiles] = useState<Profile[]>([
    { id: 1, name: 'Mon Rivamonte', role: 'Admin', image: ProfileIcon, email: 'Mon@gmail.com', phone: '+639159015884' },
    { id: 2, name: 'Gwyneth Uy', role: 'CEO', image: ProfileIcon, email: 'gwy@gmail.com', phone: '+639090909090' },
  ]);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState<string>('');

  const correctPin = "1234";
  const inputRefs = Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null));

  const handleBack = () => {
    navigate('/');
  };

  const test = () => {
    navigate('/dashboard');
  };

  const clickProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true); // Open the modal when a profile is clicked
  };

  const goToAddExistingProfile = () => {
    navigate('/add-existing-profile');
  };

  const handleSkipped = () => {
    setIsSkipped(true);
  };

  const createAnotherProfile = () => {
    navigate('/profile-setup');
  };

  const handleAddExistingProfile = () => {
    navigate('/add-existing-profile');
  };

  return (
    <div style={{ position: 'relative' }}>
      {!isSkipped && (
        <div style={{
          position: 'absolute',
          top: '-5rem',
          left: '5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={handleBack}
            className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center"
          >
            <ArrowBackIcon />
          </button>
          <p>Back</p>
        </div>
      )}
      <div className='mt-56'>
        <div className='flex justify-center items-center flex-col'>
          <div className='flex justify-center items-center flex-col'>
            <h2 className="font-bold text-3xl text-[#0f2043]">{isSkipped ? 'Select your Profile' : 'You are all Set!'}</h2>
            <p className="text-xl text-[#0f2043] text-opacity-40">{isSkipped ? 'Select a profile to use then enter your PIN' : 'Do you want to create another profile?'}</p>
          </div>
          <div className='flex justify-center items-center mt-8'>
            {profiles.map(profile => (
              <div
                key={profile.id}
                onClick={() => clickProfile(profile)}
                className='w-40 h-44 border rounded-xl flex items-center justify-center text-center flex-col cursor-pointer mr-6 border-[#0f2043] border-opacity-20 '
              >
                <div
                  style={{
                    backgroundImage: `url(${profile.image})`,
                    width: '60px',
                    height: '60px',
                    backgroundSize: 'cover',
                    borderRadius: '50%',
                  }}></div>
                <div>
                  <h4>{profile.name}</h4>
                  <p className="text-[#0f2043] text-opacity-40">{profile.role}</p>
                </div>
              </div>
            ))}
            <div
              className='w-40 h-44 border border-dashed rounded-xl flex items-center justify-center text-center flex-col cursor-pointer mr-3 border-[#0f2043] border-opacity-20 '
            >
              <div onClick={isSkipped ? goToAddExistingProfile : handleAddExistingProfile}>
                <AddIcon />
              </div>
            </div>
          </div>
          {!isSkipped ? (
            <div className='mt-10'>
              <Button
                onClick={handleSkipped}
                variant='outlined'
                sx={{ marginRight: '0.7rem', borderRadius: '5px', textTransform: 'none' }}
              >
                Skip
              </Button>
              <Button
                onClick={createAnotherProfile}
                variant="contained"
                sx={{ marginRight: '0.7rem', borderRadius: '5px', backgroundColor: '#517FD3', textTransform: 'none' }}
              >
                Create Another
              </Button>
            </div>
          ) : (
            <p onClick={test} className='text-[#d52e2e] mt-12'>Sign out Microsoft Account</p>
          )}
        </div>
      </div>

      {/* Render ModalView if the modal is open */}
      {isModalOpen && selectedProfile && (
        <ModalView
          isModalOpen={isModalOpen}
          currentView="enter-pin"
          handleCloseModal={() => setIsModalOpen(false)}
          selectedProfile={selectedProfile}
        />
      )}
    </div>
  );
};

export default Profile;
