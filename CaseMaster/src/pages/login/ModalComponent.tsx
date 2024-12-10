import React, { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EnterPin from "./modals/EnterPin";
import ForgotPIN from "./modals/ForgotPIN";
import { useNavigate } from "react-router-dom";

interface ModalViewProps {
    isModalOpen: boolean;
    currentView: string;
    handleCloseModal: () => void;
    selectedProfile: {
        id: number;
        name: string;
        role: string;
        image: string;
        email: string;
        phone: string;
      };
  }

const ModalView: React.FC<ModalViewProps> =({ isModalOpen, currentView, handleCloseModal, selectedProfile }) => {
  const [pinValues, setPinValues] = useState<string[]>(new Array(4).fill(""));
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const inputRefs = Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null));
  const navigate = useNavigate();
  const [currentViewState, setCurrentViewState] = useState<string>(currentView);
  const correctPin = "1234"; 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if (/^\d$/.test(value) || value === '') {
      const updatedPinValues = [...pinValues];
      updatedPinValues[index] = value;
      setPinValues(updatedPinValues);

    
      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      } else if (!value && index > 0) {
        inputRefs[index - 1].current?.focus();
      }


      if (updatedPinValues.join('') === correctPin) {
        navigate('/dashboard');
      } else if (updatedPinValues.every((v) => v)) {
        setErrorIndexes([0, 1, 2, 3]);
      } else {
        setErrorIndexes([]);
      }
    }
  };

  const setCurrentView = (view: string) => {
    setCurrentViewState(view);
  };

  const renderView = () => {
    switch (currentViewState) {
      case "enter-pin":
        return (
          <EnterPin
            selectedProfile = {selectedProfile}
            pinValues={pinValues}
            showPin={true} 
            errorIndexes={errorIndexes}
            inputRefs={inputRefs}
            handleInputChange={handleInputChange}
            handleCloseModal={handleCloseModal} 
            setCurrentView={setCurrentView} 
          />
        );
        case "forgot-pin":
            return (
                <ForgotPIN
                selectedProfile = {selectedProfile}
                handleCloseModal={handleCloseModal}
                setCurrentView={setCurrentView}
                />
            );

      default:
        return <div>View not found</div>;
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Box
        className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center"
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
        {/* X button to close the modal */}
        <div
          onClick={() => {
            handleCloseModal();
          }}
          className="absolute top-10 right-14 w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center cursor-pointer text-[#0f2043] bg-white"
        >
          X
        </div>
        {renderView()}
      </Box>
    </Modal>
  );
};

export default ModalView;
