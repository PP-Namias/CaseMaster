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
