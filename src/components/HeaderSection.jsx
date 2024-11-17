import React from "react";
import { Input, InputAdornment, Divider } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SearchIcon from "@mui/icons-material/Search";

const HeaderSection = ({ title }) => {
  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div>
      <div>
        <p className="text-[#0F2043] font-medium">{formattedDate}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="left-component">
          <h1 className="text-4xl text-[#0F2043] font-semibold ">{title}</h1>
        </div>
        <div className="right-component mb-0">
          <div className="flex justify-center items-center">
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon
                    style={{ color: "#424242", marginLeft: "15px" }}
                  />
                </InputAdornment>
              }
              placeholder="Search"
              disableUnderline
              style={{
                backgroundColor: "rgba(211, 207, 207, 0.3)",
                color: "#424242",
                height: "3rem",
                borderRadius: "20px",
              }}
            />
            <div className="h-11 w-32 border border-gray-200 flex justify-center items-center text-[#424242] mx-2.5">
              <ListAltOutlinedIcon /> To-do list
            </div>
            <div className="w-11 h-11 rounded-md text-white flex justify-center items-center bg-[#0F2043]">
              <NotificationsNoneIcon />
            </div>
          </div>
        </div>
      </div>

      <Divider style={{ marginTop: "1rem" }} />
    </div>
  );
};

export default HeaderSection;
