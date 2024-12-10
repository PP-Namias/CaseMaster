import * as React from "react";
import Chip from "@mui/material/Chip";

interface ChipComponentProps {
  label: string; // Title or label for the chip
  variant?: "filled" | "outlined"; // Optional variant
  onClick?: () => void; // Optional click handler
}

const ChipComponent: React.FC<ChipComponentProps> = ({
  label,
  variant = "filled", // Default to filled if not provided
  onClick,
}) => {
  // Define the background color mapping
  const backgroundColors: { [key: string]: string } = {
    New: "#517FD4",
    Active: "#288C4D",
    Closed: "#D35153",
    Appealed: "#D39651",
    Archived: "#6F6F6F",
  };

  const backgroundColor =
    backgroundColors[label] ||
    (variant === "outlined" ? "transparent" : "#DCE5F6");

  return (
    <Chip
      label={label}
      variant={variant === "outlined" ? "outlined" : "filled"}
      onClick={onClick}
      sx={{
        backgroundColor: backgroundColor,
        color: "#FFFFFF", // Set text color to white
        borderColor: backgroundColor, // Match border to background color for outlined variant
      }}
    />
  );
};

export default ChipComponent;
