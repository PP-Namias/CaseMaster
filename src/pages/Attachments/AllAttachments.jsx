import React, { useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import DropdownMenu from "../../components/DropdownMenu";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SaveIcon from "@mui/icons-material/Save";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import folderData from "./folderData.json";
import menuData from "../../components/menuData.json";
import TableComponent from "../../components/TableComponent";
import AttachmentData from "./AttachmentData.json";

const AllAttachments = () => {
  const [newAnchorEl, setNewAnchorEl] = useState(null);
  const [typeAnchorEl, setTypeAnchorEl] = useState(null);
  const [dateAddedAnchorEl, setDateAddedAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuClose = (setter) => () => setter(null);
  const handleMenuClick = (setter) => (event) => setter(event.currentTarget);
  const handleRowClick = (row) => setSelectedRow(row);

  const { columns, datas } = AttachmentData;

  return (
    <div className="p-6 space-y-4 ">
      <HeaderSection title="All Attachments" />

      <div className="flex items-start justify-start mt-2.5">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMenuClick(setNewAnchorEl)}
            className="w-[120px] h-8 bg-[#0f2043] text-white flex items-center justify-center cursor-pointer"
          >
            <AddIcon style={{ fontSize: "1rem" }} /> New
          </button>
          <DropdownMenu
            anchorEl={newAnchorEl}
            setAnchorEl={setNewAnchorEl}
            handleMenuClose={handleMenuClose(setNewAnchorEl)}
            menuItems={menuData.newMenuItems}
          />

          <button
            onClick={handleMenuClick(setTypeAnchorEl)}
            className="w-20 h-8 border-gray-400 text-sm flex justify-center items-center cursor-pointer"
          >
            Type <KeyboardArrowDownIcon />
          </button>
          <DropdownMenu
            anchorEl={typeAnchorEl}
            setAnchorEl={setTypeAnchorEl}
            handleMenuClose={handleMenuClose(setTypeAnchorEl)}
            menuItems={menuData.typeMenuItems}
          />

          <button
            onClick={handleMenuClick(setDateAddedAnchorEl)}
            className="w-[140px] h-8 border-gray-400 text-sm flex justify-center items-center cursor-pointer"
          >
            Date Added <KeyboardArrowDownIcon />
          </button>
          <DropdownMenu
            anchorEl={dateAddedAnchorEl}
            setAnchorEl={setDateAddedAnchorEl}
            handleMenuClose={handleMenuClose(setDateAddedAnchorEl)}
            menuItems={menuData.dateAddedMenuItems}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-start items-center">
        {folderData.map((folder, index) => (
          <div
            key={index}
            className="w-72 h-24 flex justify-center items-center rounded-lg mx-1.5 my-1"
            style={{ backgroundColor: "rgba(15, 32, 67, 0.05)" }}
          >
            <SaveIcon style={{ fontSize: "70px", color: folder.iconColor }} />
            <div className="mx-1.5 overflow-auto">
              <p>{folder.title}</p>
              <p className="text-xs">
                {folder.size} - {folder.location}
              </p>
            </div>
            <MoreVertIcon />
          </div>
        ))}
      </div>

      <div className="flex">
        <div className="flex-1">
          <TableComponent
            columns={columns}
            data={datas}
            onRowClick={handleRowClick}
            rowClassName="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AllAttachments;
