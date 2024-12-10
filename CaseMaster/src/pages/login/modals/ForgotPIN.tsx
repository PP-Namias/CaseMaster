import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel, FormLabel, Button, TextField } from "@mui/material";
import Profile from "../Profiles";

interface ForgotPasswordProps {
  selectedProfile: Profile;
  handleCloseModal: () => void;
  setCurrentView: (view: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  selectedProfile,
  handleCloseModal,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("email");
  const [currentStep, setCurrentStep] = useState<string>("method-selection");
  const [code, setCode] = useState<string>("");


  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const handleSubmitMethod = () => {
    if (selectedMethod === "email") {
      setCurrentStep("email-verification");
    } else if (selectedMethod === "phone") {
      setCurrentStep("sms-verification");
    }
  };

  const handleSubmitCode = () => {
    console.log("Submitted code:", code);
    setCurrentStep("reset-pin");
  };

  const handleResetPin = () => {
    /*if (newPin === confirmPin) {
      console.log("PIN successfully reset:", newPin);
      handleCloseModal();
    } else {
      alert("PINs do not match. Please try again.");
    }*/
    setCurrentStep("success");
  };

  const VerificationView = ({ type }: { type: string }) => {
    const [isEmailVerification, setIsEmailVerification] = useState<boolean>(type === "email");

    const toggleVerificationMethod = () => {
      setIsEmailVerification(!isEmailVerification);
    };

    return (
      <div className="flex items-center justify-center flex-col mt-20">
        <h3 className="font-bold text-3xl text-[#0f2043] mt-2">Enter Security Code</h3>
        <p className="text-xl text-[#0f2043] text-opacity-40 mt-4 text-center">
          A 6-digit verification code was
        </p>
        <p className="text-xl text-[#0f2043] text-opacity-40 text-center mb-6">
          just sent to {isEmailVerification ? selectedProfile.email : selectedProfile.phone}
        </p>
        <TextField
          label="Enter Code"
          variant="outlined"
          inputProps={{ maxLength: 6 }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-4"
          sx={{ width: "100%" }}
        />
        <div className="flex justify-between items-center w-full mt-4">
          <p className="flex justify-center items-start flex-col">
            <span className="text-[#517FD3] cursor-pointer text-sm">Resend Code</span>
            <span
              className="text-[#517FD3] cursor-pointer text-sm"
              onClick={toggleVerificationMethod}
            >
              Verify {isEmailVerification ? "phone" : "email"} instead
            </span>
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitCode}
            className="mt-4"
            sx={{ textTransform: "none", marginTop: "1rem" }}
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  };

  const ResetPinView = () => (
    <div className="flex items-center justify-center flex-col mt-16">
      <h3 className="font-bold text-3xl text-[#0f2043] mt-2">Set New PIN</h3>
      <p className="text-xl text-[#0f2043] text-opacity-40 text-center">
        Avoid using easy to gues PINs like 
      </p>
      <p className="text-xl text-[#0f2043] text-opacity-40  text-center">
        1234 or 0000 or your birthdate
      </p>
      <div className="flex flex-col w-full mt-4">
        <p className="text-sm text-[#0f2043]">New PIN</p>
        <input
          type="password"
          maxLength={6}
          className="border border-gray-300 rounded p-2 mb-4"
        />
        <p className="text-sm text-[#0f2043]">Verify New PIN</p>
        <input
          type="password"
          maxLength={6}
          className="border border-gray-300 rounded p-2"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleResetPin}
        className="mt-4"
        sx={{ textTransform: "none", marginTop: "1rem" }}
      >
        Submit
      </Button>
    </div>
  );

  const SuccessView = () => (
    <div className="flex items-center justify-center flex-col mt-16">
      <h3 className="font-bold text-3xl text-[#0f2043] mt-2">PIN Successfully Reset</h3>
      <p className="text-xl text-[#0f2043] text-opacity-40 text-center mt-4">
        Your PIN has been successfully reset. You can now use your new PIN to access your account.
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCloseModal}
        className="mt-4"
        sx={{ textTransform: "none", marginTop: "1rem" }}
      >
        Close
      </Button>
    </div>
  );
  

  // Method Selection View
  const MethodSelectionView = () => (
    <div className="flex items-center justify-center flex-col mt-16">
      <div
        className="h-12 w-12 rounded-full"
        style={{
          backgroundImage: `url(${selectedProfile?.image})`,
          backgroundSize: "cover",
        }}
      ></div>
      <p>{selectedProfile?.name}</p>
      <h3 className="font-bold text-3xl text-[#0f2043] mt-2">
        Forgot Your PIN?
      </h3>
      <FormLabel component="legend" className="text-xl text-[#0f2043] text-opacity-40 mt-4 tracking-tight text-center">
        Choose how you want to recover your account:
      </FormLabel>
      <RadioGroup
        value={selectedMethod}
        onChange={handleMethodChange}
        className="mb-4"
      >
        <FormControlLabel
          value="email"
          control={<Radio />}
          label={`Send code to email of ${selectedProfile.email}`}
        />
        <FormControlLabel
          value="phone"
          control={<Radio />}
          label={`Send code to sms of ${selectedProfile.phone}`}
        />
      </RadioGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitMethod}
        className="mt-4"
        sx={{ textTransform: "none" }}
      >
        Confirm
      </Button>
    </div>
  );

  return (
    <>
      {currentStep === "method-selection" && <MethodSelectionView />}
      {currentStep === "email-verification" && <VerificationView type="email" />}
      {currentStep === "sms-verification" && <VerificationView type="sms" />}
      {currentStep === "reset-pin" && <ResetPinView />}
      {currentStep === "success" && <SuccessView />}
    </>
  );
};

export default ForgotPassword;
