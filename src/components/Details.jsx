import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ImportIcon from "@mui/icons-material/ListAltOutlined";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";

const Details = ({ row, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableRow, setEditableRow] = useState(row);

  if (!row) return null;

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing && onSave) {
      onSave(editableRow); // Trigger save callback when switching back to view mode
    }
  };

  const handleChange = (key, value) => {
    setEditableRow((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 border rounded-md border-gray-300 shadow-xl ">
      <div className="flex items-center justify-between border-b-2 pb-2 mb-3">
        {/* Title */}
        <h2 className="text-xl font-semibold text-[#0F2043]">Details</h2>

        {/* Icons */}
        <div className="flex items-center">
          <Tooltip
            title="Import to Case Tracker"
            TransitionComponent={Zoom}
            placement="top"
          >
            <IconButton aria-label="Import to Case Tracker" size="small">
              <ImportIcon style={{ color: "#0F2043", cursor: "pointer" }} />
            </IconButton>
          </Tooltip>

          <Tooltip
            title="Send Email"
            TransitionComponent={Zoom}
            placement="top"
          >
            <IconButton aria-label="Send Email">
              <EmailOutlinedIcon
                style={{ color: "#0F2043", cursor: "pointer" }}
                fontSize="inherit"
              />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={isEditing ? "Save Changes" : "Edit"}
            TransitionComponent={Zoom}
            placement="top"
          >
            <IconButton aria-label="Edit">
              <EditIcon
                style={{ color: "#0F2043", cursor: "pointer" }}
                onClick={handleEditClick}
              />
            </IconButton>
          </Tooltip>

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
            <IconButton aria-label="Close">
              <CloseIcon
                style={{ color: "#0F2043", cursor: "pointer" }}
                onClick={onClose}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {Object.keys(row).map((key) => (
        <div key={key} className="mb-1 text-[#0F2043]">
          <strong>{key}:</strong>
          {isEditing ? (
            <input
              type="text"
              className="ml-3 px-2 py-1 rounded border-[#0F2043] border-[2px]"
              value={editableRow[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              style={{
                border: "2px solid #0F2043",
                backgroundColor: "transparent",
                borderRadius: "8px",
              }}
            />
          ) : (
            <span className="ml-2">{editableRow[key]}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Details;
