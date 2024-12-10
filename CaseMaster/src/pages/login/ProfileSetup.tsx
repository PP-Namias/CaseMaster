import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Modal, Box, TextField, Button } from "@mui/material";

const ProfileSetup = () => {

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [currentModalView, setCurrentModalView] = useState("email"); 
  const [inputValue, setInputValue] = useState("");

     
  const handleNext = () => {
    navigate("/pin-setup");
  };

  const handleUploadImage = () => {

  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setCurrentModalView("email"); 
  };

  const handleCloseModal = () => {
    setOpenModal(false); 
    setInputValue(""); 
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <div className="flex justify-center items-center flex-col">
          <p className="text-[2.5rem] font-semibold text-[#0f2043]">Profile SetUp</p>
          <p className="text-[rgba(15,32,67,0.3)] text-2xl">Complete simple steps to get started</p>
        </div>

        <div className="flex items-center justify-center flex-col">
          <div>
            <div className="flex justify-start items-center my-1">
              <div className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center mr-2">1</div>
              <h4>Upload a profile picture</h4>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-28 h-28 bg-gray-300 mr-2.5"></div>

              <div className="flex justify-start items-start flex-col my-2">
                <button
                  onClick={handleUploadImage}
                  className="text-[#2E49D5] border border-[#2E49D5] bg-[rgba(46,73,213,0.3)] rounded-xl h-8 w-32 flex items-center justify-center">
                  Upload Image
                </button>

                <button
                  className="border border-[#D52E2E] bg-[rgba(213,46,46,0.2)] rounded-xl h-8 w-32 flex items-center justify-center text-[#E13D3D] mt-2">
                  Remove
                </button>
                <p className="text-sm text-[rgba(15,32,67,0.3)]">PNG or JPG files up to 5 mb</p>
                <p className="text-sm text-[rgba(15,32,67,0.3)]">Recommended size is 256 x 256 px</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-start items-center my-1">
              <div className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center mr-2">2</div>
              <h4>Enter required information</h4>
            </div>
            <div className="flex items-center justify-center my-2">
              <div className="flex flex-col mr-2.5">
                <label htmlFor="fullname">Full Name</label>
                <label htmlFor="email" className="my-3">Personal Email</label>
                <label htmlFor="phoneNo">Phone No</label>
              </div>
              <div className="flex flex-col"> 
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullname" 
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] rounded-md h-8 pl-2 focus:outline-none "
                />
                <input 
                  type="text" 
                  id="email" 
                  name="email" 
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] my-1 rounded-md h-8 pl-2 focus:outline-none"
                />
                <input 
                  type="text" 
                  id="phoneNo" 
                  name="phoneNo" 
                  placeholder="+63 |" 
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] rounded-md h-8 pl-2 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end items-center mt-4">
            <button onClick={handleOpenModal} className="text-white bg-[#517FD3] w-20 h-8 rounded-md mr-7">Next</button>
          </div>
        </div>
      </div>

      <Modal 
  open={openModal}
  onClose={handleCloseModal}
  closeAfterTransition
  BackdropProps={{
    style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } 
  }}
>
  <Box
    className="bg-white p-6 rounded-md shadow-lg"
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 550,
      height: 480,
      outline: "none",
    }}
    onClick={(e) => e.stopPropagation()}
  >
    {currentModalView === "email" ? (
      <div className="flex justify-center items-center flex-col">
        <div className="flex justify-end w-full mt-6">
          <div 
            onClick={handleCloseModal} 
            className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center mr-6 cursor-pointer text-[#0f2043]"
          >
            X
          </div>
        </div>
        <h3 className="text-4xl font-medium mb-4 text-[#0f2043] font-bold mt-8">Verify your email</h3>
        <p className="tracking-tight text-[rgba(15,32,67,0.3)]">To continue, please enter the code that has </p>
        <p className="tracking-tight text-[rgba(15,32,67,0.3)] mb-6">been sent to your email (*********@gmail.com)</p>
        <TextField
          label="Enter Code"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[70%]"
        />
        <div className="w-[70%] mt-2">
          <p className="tracking-tight text-xs text-[#517FD3]">Resend Code</p>
          <p 
            className="tracking-tight text-xs text-[#517FD3]"
            onClick={() => setCurrentModalView("phone")} 
          >
            Verify phone instead
          </p>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center flex-col">
        <div className="flex justify-end w-full mt-6">
          <div 
            onClick={handleCloseModal} 
            className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center mr-6 cursor-pointer text-[#0f2043]"
          >
            X
          </div>
        </div>
        <h3 className="text-4xl font-medium mb-4 text-[#0f2043] font-bold mt-8">Verify your phone</h3>
        <p className="tracking-tight text-[rgba(15,32,67,0.3)]">To continue, please enter the code that has </p>
        <p className="tracking-tight text-[rgba(15,32,67,0.3)] mb-6">been sent to your phone (09*********)</p>
        <TextField
          label="Enter Code"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[70%]"
        />
        <div className="w-[70%] mt-2">
          <p className="tracking-tight text-xs text-[#517FD3]">Resend Code</p>
          <p 
            className="tracking-tight text-xs text-[#517FD3]"
            onClick={() => setCurrentModalView("email")} // Switch to email view
          >
            Verify email instead
          </p>
        </div>
      </div>
    )}
    <div className="flex justify-end">
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginRight: '5rem', marginTop: '1rem', borderRadius: '10px' }}
        onClick={handleNext}
      >
        Confirm
      </Button>
    </div>
  </Box>
</Modal>

    </div>
  );
};

export default ProfileSetup;