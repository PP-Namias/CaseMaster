import React, { useState } from "react";
import Details from "../../components/Details";
import tableData from "./TableData.json";
import TableComponent from "../../components/TableComponent";
import HeaderSection from "../../components/HeaderSection";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import InfoIcon from "@mui/icons-material/Info";

const FromEmail = () => {
  const [data, setData] = useState(tableData.data);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedRow(null);
    setShowDetails(false);
  };

  const handleSave = (updatedRow) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
    setSelectedRow(updatedRow);
    setShowDetails(true);
  };

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsHovered(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  const handleMoreInfoClick = () => {
    setShowDetails((prev) => !prev);
  };

  const getRowClass = (row) => {
    return row.id === selectedRow?.id ? "bg-blue-100" : "";
  };

  return (
    <div className="p-6 space-y-4">
      <HeaderSection title="Logbook - From email" />

      {/** Filter Buttons */}
      <div className="flex justify-between items-center">
        {/* Dropdowns Group */}
        <div className="flex space-x-4">
          {/* Status Dropdown */}
          <div className="relative">
            <select className="bg-white text-[#0F2043] appearance-none border border-[#0F2043] rounded-md px-3 py-1 shadow-sm hover:bg-[#0F2043] hover:text-white focus:bg-[#0F2043] focus:text-white cursor-pointer">
              <option>Status</option>
              {/* Add more options here */}
            </select>
          </div>

          {/* Document Type Dropdown */}
          <div className="relative">
            <select className="bg-white text-[#0F2043] appearance-none border border-[#0F2043] rounded-md px-3 py-1 shadow-sm hover:bg-[#0F2043] hover:text-white focus:bg-[#0F2043] focus:text-white cursor-pointer">
              <option>Document Type</option>
              {/* Add more options here */}
            </select>
          </div>

          {/* Date Added Dropdown */}
          <div className="relative">
            <select className="bg-white text-[#0F2043] appearance-none border border-[#0F2043] rounded-md px-3 py-1 shadow-sm hover:bg-[#0F2043] hover:text-white focus:bg-[#0F2043] focus:text-white cursor-pointer">
              <option>Date Added</option>
              {/* Add more options here */}
            </select>
          </div>
        </div>

        {/* More Info Button */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Tooltip
            title={showDetails ? "Close Details" : "More Details"}
            TransitionComponent={Zoom}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
            placement="top"
          >
            {/* Replacing IconButton with div */}
            <div
              style={{ color: "#0F2043", cursor: "pointer" }}
              onClick={handleMoreInfoClick}
              className="p-1"
            >
              {isHovered ? <InfoIcon /> : <InfoOutlinedIcon />}
            </div>
          </Tooltip>
        </div>
      </div>

      {/** Table and Details */}
      <div className="flex flex-col md:flex-row">
        <div className={`flex-1 ${selectedRow ? "md:w-2/3" : "w-full"}`}>
          <TableComponent
            columns={tableData.columns}
            data={data}
            onRowClick={handleRowClick}
            rowClassName={`cursor-pointer ${getRowClass}`}
          />
        </div>

        {showDetails ? (
          <div className="flex-2 md:w-1/3 mt-4 md:mt-0 md:ml-4">
            {selectedRow ? (
              <Details
                row={selectedRow}
                onClose={handleCloseDetails}
                onSave={handleSave}
              />
            ) : (
              <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col justify-center items-center h-40 w-full">
                <h3 className="text-xl font-semibold text-[#0F2043]">
                  Details
                </h3>
                <p className="text-center text-gray-500">
                  Select an item to see the details
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FromEmail;
