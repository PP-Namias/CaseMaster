import { Box } from "@mui/system";
import FilterButtons from "../../components/FilterButtons";
import Stack from "@mui/material/Stack";
import TableComponent from "../../components/TableComponent";
import { IconButton, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoFilledIcon from "@mui/icons-material/Info";
import React, { useState } from "react";
import DetailsComponent from "../../components/DetailsComponent";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import CancelIcon from "@mui/icons-material/Cancel";
import SubMenuIcon from "@mui/icons-material/FiberManualRecord";

const FromEmail: React.FC = () => {
  const DocumentType = [
    "Document Type", // Title or Default
    "All", // Default
    "Motion",
    "Pleadings",
    "Incident",
    "Criminal Case",
    "Civil Case",
    "Special Case",
  ];

  const Status = ["Status", "New", "Active", "Closed", "Appealed", "Archived"];

  const Dates = ["Date", "Today", "Yesterday", "Last 7 days", "Last 30 days"];

  const tableHeadData = ["Case No.", "Title", "Date Added", "Status"];
  const tableBodyData = [
    {
      "Case No.": 12345,
      Title: "PRESIDENT MARCOS VS VP SARAH DUTERTE",
      "Date Added": "2024-12-01",
      Status: "Active",
    },
    {
      "Case No.": 67890,
      Title: "CITIZEN VS GOVERNMENT",
      "Date Added": "2024-11-30",
      Status: "Closed",
    },
    {
      "Case No.": 24680,
      Title: "GOVERNMENT VS CITIZEN",
      "Date Added": "2024-11-29",
      Status: "New",
    },
    {
      "Case No.": 13579,
      Title: "VP LENI ROBREDO VS SENATOR PACQUIAO",
      "Date Added": "2024-11-28",
      Status: "Appealed",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
  ];

  const popoverContent = (
    <Box style={{ padding: "1rem" }}>
      <Stack direction={"column"} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          sx={{
            textTransform: "none",
            backgroundColor: "transparent",
            color: "#0F2043",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "#DCE5F6", // Add hover effect
            },
          }}
        >
          <SubMenuIcon
            sx={{ width: "0.5rem", height: "0.5rem", marginRight: "0.5rem" }}
            className={"text-[#0F2043]"}
          />
          View Details
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          sx={{
            textTransform: "none",
            backgroundColor: "transparent",
            color: "#0F2043",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "#DCE5F6", // Add hover effect
            },
          }}
        >
          <SubMenuIcon
            sx={{ width: "0.5rem", height: "0.5rem", marginRight: "0.5rem" }}
            className={"text-[#0F2043]"}
          />
          Edit Details
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          sx={{
            textTransform: "none",
            backgroundColor: "transparent",
            color: "#0F2043",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "#DCE5F6", // Add hover effect
            },
          }}
        >
          <SubMenuIcon
            sx={{ width: "0.5rem", height: "0.5rem", marginRight: "0.5rem" }}
            className={"text-[#0F2043]"}
          />
          View Email
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          sx={{
            textTransform: "none",
            backgroundColor: "transparent",
            color: "#0F2043",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "#DCE5F6", // Add hover effect
            },
          }}
        >
          <SubMenuIcon
            sx={{ width: "0.5rem", height: "0.5rem", marginRight: "0.5rem" }}
            className={"text-[#0F2043]"}
          />
          Import to Case Tracker
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          sx={{
            textTransform: "none",
            backgroundColor: "transparent",
            color: "#0F2043",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "#DCE5F6", // Add hover effect
            },
          }}
        >
          <SubMenuIcon
            sx={{ width: "0.5rem", height: "0.5rem", marginRight: "0.5rem" }}
            className={"text-[#0F2043]"}
          />
          Archive
        </Button>
      </Stack>
    </Box>
  );

  // State to manage which icon to show
  const [icon, setIcon] = useState("outlined");

  // State to manage whether the card should be shown and whether details are open
  const [showCard, setShowCard] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Handle mouse hover and click events to change icon
  const handleMouseEnter = () => setIcon("filled");
  const handleMouseLeave = () => setIcon("outlined");

  // Handle the icon button click to toggle the card visibility and the icon
  const handleClick = () => {
    setIsDetailsOpen((prev) => !prev); // Toggle the details open/close state
    setIcon(isDetailsOpen ? "outlined" : "filled"); // Toggle icon between info and cancel
    setShowCard((prev) => !prev); // Toggle showing the card
  };

  return (
    <Box sx={{ marginX: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={1} direction="row">
          <FilterButtons options={DocumentType} defaultIndex={0} />
          <FilterButtons options={Status} defaultIndex={0} />
          <FilterButtons options={Dates} defaultIndex={0} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ marginLeft: "auto" }}>
            <Tooltip
              title={isDetailsOpen ? "Close Details" : "Details"} // Change tooltip title based on isDetailsOpen state
              TransitionComponent={Zoom}
              placement="top"
              arrow
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -5],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton
                aria-label="Details"
                onClick={handleClick} // Toggle showCard and icon on click
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isDetailsOpen ? (
                  <CancelIcon className="text-[#0F2043]" /> // Show Cancel icon if details are open
                ) : icon === "outlined" ? (
                  <InfoOutlinedIcon className="text-[#0F2043]" />
                ) : (
                  <InfoFilledIcon className="text-[#0F2043]" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>

        {/* Box container to adjust only the table and card layout */}
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}
        >
          {/* Box containing the table */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <TableComponent
              tableHeadData={tableHeadData}
              tableBodyData={tableBodyData}
              popoverContent={popoverContent}
            />
          </Box>

          {/* Conditionally render the Card beside the Table */}
          {showCard && <DetailsComponent />}
        </Box>
      </Stack>
    </Box>
  );
};

export default FromEmail;
