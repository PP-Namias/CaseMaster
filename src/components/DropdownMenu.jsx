import React from "react";
import { Menu, MenuItem, Divider } from "@mui/material";

const DropdownMenu = ({ anchorEl, handleMenuClose, menuItems }) => {
  const open = Boolean(anchorEl);

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    handleMenuClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
      {menuItems.map((item, index) => {
        // Check if the item is a divider
        if (item.type === "divider") {
          return (
            <Divider key={index} style={{ marginTop: 0, marginBottom: 0 }} />
          );
        }

        return (
          <MenuItem key={index} onClick={() => handleItemClick(item)}>
            {item.icon && (
              <item.icon
                style={{
                  color: item.iconColor,
                  fontSize: "13px",
                  marginRight: "5px",
                }}
              />
            )}
            {item.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default DropdownMenu;
