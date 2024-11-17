import React, { useState, useEffect } from "react";
import Details from "../../components/Details";
import tableData from "./TableData.json";
import TableComponent from "../../components/TableComponent";
import HeaderSection from "../../components/HeaderSection";

const FromEmail = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const { columns, data } = tableData;

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleBack = () => {
    setSelectedRow(null);
  };

  const handleCloseDetails = () => {
    setSelectedRow(null);
  };

  return (
    <div className="p-6 space-y-4">
      {/** Header */}
      <HeaderSection title="Logbook - From email" />

      {/** Filter Buttons */}
      <div className="flex space-x-4">
        {/* Status Dropdown */}
        <div className="relative">
          <select className="bg-white text-[#0F2043] appearance-none border border-[#0F2043] rounded-md px-4 py-2 shadow-sm hover:bg-[#0F2043] hover:text-white focus:bg-[#0F2043] focus:text-white cursor-pointer">
            <option>Status</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* Document Type Dropdown */}
        <div className="relative">
          <select className="bg-white text-[#0F2043] appearan ce-none border border-[#0F2043] rounded-md px-4 py-2 shadow-sm hover:bg-[#0F2043] hover:text-white focus:bg-[#0F2043] focus:text-white cursor-pointer">
            <option>Document Type</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* Date Added Dropdown */}
        <div className="relative">
          <select className="bg-white text-[#0F2043] appearance-none border border-[#0F2043] rounded-md px-4 py-2 shadow-sm hover:bg-[#0F2043] hover:text-white focus:bg-[#0F2043] focus:text-white cursor-pointer">
            <option>Date Added</option>
            {/* Add more options here */}
          </select>
        </div>
      </div>

      {/** Table and Details */}
      <div className="flex flex-col md:flex-row">
        <div className={`flex-1 ${selectedRow ? "md:w-2/3" : "w-full"}`}>
          <TableComponent
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
            rowClassName="cursor-pointer"
          />
        </div>

        {selectedRow && (
          <div className="flex-2 md:w-1/3 mt-4 md:mt-0 md:ml-4">
            {/* Details Component */}
            <Details row={selectedRow} onClose={handleCloseDetails} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FromEmail;
