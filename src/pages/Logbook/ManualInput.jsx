import React, { useState } from "react";
import Details from "../../components/Details";
import tableData from "./TableData.json";
import TableComponent from "../../components/TableComponent";
import HeaderSection from "../../components/HeaderSection";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import InfoIcon from "@mui/icons-material/Info";
import CaseNoIcon from "@mui/icons-material/Balance";
import TitleIcon from "@mui/icons-material/Title";
import PartyIcon from "@mui/icons-material/ClassOutlined";
import DocumentIcon from "@mui/icons-material/DescriptionOutlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import StatusIcon from "@mui/icons-material/Schedule";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ManualInput = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure the modal is on top of other elements
  };

  const modalContentStyles = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "600px",
  };

  function Modal({ isOpen, onClose }) {
    if (!isOpen) return null; // Don't render modal if it's not open

    return (
      <div style={modalStyles} className="flex justify-between items-center">
        <div style={modalContentStyles} className="flex-1">
          {/** Header */}
          <div className="flex justify-between items-center w-full border-b-2 px-3 py-2 ">
            <h2 className="text-xl text-[#0F2043] font-semibold">
              Add New Case
            </h2>
            <Tooltip
              title="Close"
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
              <IconButton aria-label="Close" onClick={onClose}>
                <CloseIcon style={{ color: "#0F2043", cursor: "pointer" }} />
              </IconButton>
            </Tooltip>
          </div>

          {/** Form */}
          <div className="p-3 bg-white rounded-lg shadow-md ">
            <form>
              {/* Case No. */}
              <div className="mb-4 flex items-center">
                <label className="text-gray-600 font-medium w-1/3 flex items-center gap-3 ">
                  <CaseNoIcon fontSize="small" /> Case No.
                </label>
                <input
                  type="text"
                  className="block w-2/3 border border-gray-300 rounded-md bg-gray-100 text-gray-00 px-3 py-2 cursor-text"
                  placeholder="Empty"
                />
              </div>

              {/* Title */}
              <div className="mb-4 flex items-center">
                <label className="text-gray-600 font-medium w-1/3 flex items-center gap-3 ">
                  <TitleIcon fontSize="small" /> Title
                </label>
                <input
                  type="text"
                  className="block w-2/3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 px-3 py-2 cursor-text"
                  placeholder="Empty"
                />
              </div>

              {/* Party Filer */}
              <div className="mb-4 flex items-center">
                <label className="text-gray-600 font-medium w-1/3 flex items-center gap-3 ">
                  <PartyIcon fontSize="small" /> Party Filer
                </label>
                <input
                  type="text"
                  className="block w-2/3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 px-3 py-2 cursor-text"
                  placeholder="Empty"
                />
              </div>

              {/* Document Type */}
              <div className="mb-4 flex items-center">
                <label className="text-gray-600 font-medium w-1/3 flex items-center gap-3 ">
                  <DocumentIcon fontSize="small" /> Document Type
                </label>
                <select className="bg-gray-100 text-gray-500 border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 focus:outline-none w-2/3">
                  <option value="motion">Motion</option>
                  <option value="plead">Plead</option>
                  <option value="case">Case</option>
                </select>
              </div>

              {/* Attachment */}
              <div className="mb-4 flex items-center">
                <label className="text-gray-600 font-medium w-1/3 flex items-center gap-3">
                  <AttachmentIcon fontSize="small" /> Attachment
                </label>
                <button
                  type="button"
                  className="bg-gray-100 text-gray-500 border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 focus:outline-none w-2/3 text-left"
                >
                  + Upload File
                </button>
              </div>

              {/* Status */}
              <div className="mb-4 flex items-center">
                <label className="text-gray-600 font-medium w-1/3 flex items-center gap-3">
                  <StatusIcon fontSize="small" /> Status
                </label>
                <select className="bg-gray-100 text-gray-500 border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-200 focus:outline-none w-2/3">
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  className="bg-white text-[#0F2043] border border-[#0F2043] px-4 py-2 rounded-md shadow-sm hover:bg-[#0F2043] hover:text-white focus:outline-none"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="bg-[#0F2043] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#0E1B39] focus:outline-none"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <HeaderSection title="Logbook - Manual Input" />

      {/** Filter Buttons */}
      <div className="flex justify-between items-center">
        {/* Dropdowns Group */}
        <div className="flex space-x-4">
          {/* Add New Case Button */}
          <button
            className="bg-[#0F2043] text-white px-3 py-1 rounded-md shadow cursor-pointer"
            onClick={openModal}
          >
            + Add New Case
          </button>

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
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        {/* More Info Button */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Tooltip
            title={showDetails ? "Close Details" : "More Details"} // Change tooltip based on the state
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
              onClick={handleMoreInfoClick} // Toggle on click
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
            rowClassName={`cursor-pointer ${getRowClass}`} // Add dynamic class to highlight selected row
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
              </div> // Card-like message
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ManualInput;
