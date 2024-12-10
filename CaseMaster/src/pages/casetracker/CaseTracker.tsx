import { Box } from "@mui/system";
import React, { useState } from "react";
import FilterButtons from "../../components/FilterButtons";
import TableComponent from "../../components/TableComponent";
import { Button } from "@mui/material";

const CaseTracker: React.FC = () => {
  const CaseType = ["Case Type", "Civil Case", "Special Case", "Criminal Case"];
  const Deadline = ["Deadline", "Today", "Yesterday", "Last 7 days", "Last 30 days"];
  const Dates = ["Date", "Today", "Yesterday", "Last 7 days", "Last 30 days"];

  const tableHeadData = ["Case No.", "Title", "Deadline", "Status"];
  const tableBodyData = [
    {
      "Case No.": 12345,
      Title: "PRESIDENT MARCOS VS VP SARAH DUTERTE",
      Deadline: "2024-12-10",
      Status: "Active",
    },
    {
      "Case No.": 67890,
      Title: "CITIZEN VS GOVERNMENT",
      Deadline: "2024-12-15",
      Status: "Closed",
    },
    {
      "Case No.": 24680,
      Title: "GOVERNMENT VS CITIZEN",
      Deadline: "2024-12-20",
      Status: "New",
    },
    {
      "Case No.": 13579,
      Title: "VP LENI ROBREDO VS SENATOR PACQUIAO",
      Deadline: "2024-12-25",
      Status: "Appealed",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      Deadline: "2024-12-30",
      Status: "Archived",
    },
  ];

  const popoverContent = (
    <Box style={{ padding: "1rem" }}>
      <p>Additional options and actions can be placed here.</p>
    </Box>
  );

  const handleAddCase = () => {
    console.log("Add New Case button clicked");
    // Add your logic here
  };

  return (
    <Box sx={{ marginX: 3, marginTop: 1 }}>
      {/* Top Section: Add Case Button and Filters */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={handleAddCase}
          sx={{
            backgroundColor: "#0F2043",
            color: "#FFFFFF",
            borderRadius: "12px",
            textTransform: "none",
            paddingX: 3,
            paddingY: 1,
            "&:hover": {
              backgroundColor: "#0E1B39",
            },
          }}
        >
          + Add New Case
        </Button>
        <FilterButtons options={CaseType} defaultIndex={0} />
        <FilterButtons options={Deadline} defaultIndex={0} />
        <FilterButtons options={Dates} defaultIndex={0} />
      </Box>

      {/* Table */}
      <TableComponent
        tableHeadData={tableHeadData}
        tableBodyData={tableBodyData}
        popoverContent={popoverContent}
      />
    </Box>
  );
};

export default CaseTracker;
