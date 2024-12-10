import React from "react";
import { TextField } from "@mui/material";
import Profile from "../Profiles";

interface EnterPinProps {
  selectedProfile: Profile;
  pinValues: string[];
  showPin: boolean;
  errorIndexes: number[];
  inputRefs: React.RefObject<HTMLInputElement>[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleCloseModal: () => void;
  setCurrentView: (view: string) => void;
}

const EnterPin: React.FC<EnterPinProps> = ({
  selectedProfile,
  pinValues,
  showPin,
  errorIndexes,
  inputRefs,
  handleInputChange,
  setCurrentView,
}) => (
  <div className="flex items-center justify-center flex-col mt-16">

    <div
      className="h-12 w-12 rounded-full"
      style={{
        backgroundImage: `url(${selectedProfile?.image})`,
        backgroundSize: "cover",
      }}
    ></div>
    <p>{selectedProfile?.name}</p>
    <h3 className="text-4xl font-medium mb-4 text-[#0f2043] font-bold mt-2">
      Enter Your PIN
    </h3>
    <div className="flex justify-center mt-2">
      {inputRefs.map((ref, index) => (
        <TextField
          key={index}
          inputRef={ref}
          type={showPin ? "password" : "text"}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "2rem",
              padding: 0,
              margin: 0,
            },
          }}
          value={pinValues[index]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
          className="w-20 mr-2"
          variant="outlined"
          error={errorIndexes.includes(index)}
          sx={{
            borderRadius: "10px",
            margin: "0.3rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: "5.5rem",
              backgroundColor: pinValues[index] !== "" ? "#517fd3" : "",
              "& fieldset": {
                borderColor: "#517FD3",
              },
              "&:hover fieldset": {
                borderColor: "#517FD3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#517FD3",
              },
              "& input": {
                backgroundColor: pinValues[index] !== "" ? "#517fd3" : "",
                color: pinValues[index] !== "" ? "#fff" : "",
                height: "100%",
                boxSizing: "border-box",
                padding: 0,
                margin: 0,
                borderRadius: "10px",
              },
            },
          }}
        />
      ))}
    </div>
    <p className="text-[#517fd3] text-xs mt-8">
      Forgot your PIN?{" "}
      <strong
        className="cursor-pointer"
        onClick={() => setCurrentView("forgot-pin")}
      >
        Click here for help
      </strong>
    </p>
  </div>
);

export default EnterPin;
