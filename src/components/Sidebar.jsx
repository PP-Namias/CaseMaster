import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Avatar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";
import FromEmail from "../pages/Logbook/FromEmail";
import ManualInput from "../pages/Logbook/ManualInput";
import Inbox from "../pages/Mails/Inbox";
import Starred from "../pages/Mails/Starred";
import Sent from "../pages/Mails/Sent";
import Archive from "../pages/Mails/Archive";
import Attachments from "../pages/Attachments/AllAttachments";
import CaseTracker from "../pages/CaseTracker";
import Task from "../pages/Task";
import AllAttachments from "../pages/Attachments/AllAttachments";
import MyAttachments from "../pages/Attachments/MyAttachments";
import ArchiveAttachments from "../pages/Attachments/Archive";
import SharedWithMe from "../pages/Attachments/SharedWithMe";
import StarredAttachments from "../pages/Attachments/Starred";
import Settings from "../pages/Settings/Settings";
import Badge from "@mui/material/Badge";
import "./Sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [dropdownState, setDropdownState] = useState({
    logbook: false,
    mails: false,
    attachments: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const Menus = [
    {
      title: "Dashboard",
      icon: (
        <Badge badgeContent={4} color="error">
          <SpaceDashboardOutlinedIcon />
        </Badge>
      ),
      path: "/",
    },
    {
      title: "Logbook",
      icon: (
        <Badge
          badgeContent={
            2 /* Calculate the sum of dropdown badgeContent if needed */
          }
          color="primary"
        >
          <AutoStoriesOutlinedIcon />
        </Badge>
      ),
      path: "/from-email" || "/manual-input",
      element: <FromEmail /> || <ManualInput />,
      hasDropdown: true,
      dropdownKey: "logbook",
      dropdownItems: [
        {
          title: "From Email",
          path: "/from-email",
          element: <FromEmail />,
          badgeContent: 1, // Individual badge for this dropdown
        },
        {
          title: "Manual Input",
          path: "/manual-input",
          element: <ManualInput />,
          badgeContent: 1, // Individual badge for this dropdown
        },
      ],
    },
    {
      title: "Mails",
      icon: (
        <Badge
          badgeContent={99 /* Dynamically sum counts for dropdown items */}
          color="secondary"
          max={99}
        >
          <EmailOutlinedIcon />
        </Badge>
      ),
      path: "/inbox",
      element: <Inbox />,
      hasDropdown: true,
      dropdownKey: "mails",
      dropdownItems: [
        {
          title: "Inbox",
          path: "/inbox",
          element: <Inbox />,
          badgeContent: 30,
        },
        {
          title: "Starred",
          path: "/starred",
          element: <Starred />,
          badgeContent: 20,
        },
        { title: "Sent", path: "/sent", element: <Sent />, badgeContent: 15 },
        {
          title: "Archive",
          path: "/archive",
          element: <Archive />,
          badgeContent: 5,
        },
      ],
    },
    {
      title: "Attachments",
      icon: (
        <Badge
          badgeContent={10 /* Dynamically calculate count for dropdown items */}
          color="success"
        >
          <AttachmentOutlinedIcon />
        </Badge>
      ),
      path: "/all-attachments",
      element: <AllAttachments />,
      hasDropdown: true,
      dropdownKey: "attachments",
      dropdownItems: [
        {
          title: "All Attachments",
          path: "/all-attachments",
          element: <AllAttachments />,
          badgeContent: 3,
        },
        {
          title: "My Attachments",
          path: "/my-attachments",
          element: <MyAttachments />,
          badgeContent: 2,
        },
        {
          title: "Shared With Me",
          path: "/shared-with-me",
          element: <SharedWithMe />,
          badgeContent: 3,
        },
        {
          title: "Starred",
          path: "/starred-attachments",
          element: <StarredAttachments />,
          badgeContent: 1,
        },
        {
          title: "Archive",
          path: "/archive-attachments",
          element: <ArchiveAttachments />,
          badgeContent: 1,
        },
      ],
    },
    {
      title: "Case Tracker",
      icon: (
        <Badge badgeContent={7} color="error">
          <TableChartOutlinedIcon />
        </Badge>
      ),
      path: "/case-tracker",
      element: <CaseTracker />,
    },
    {
      title: "Task",
      icon: (
        <Badge badgeContent={3} color="warning">
          <AssignmentOutlinedIcon />
        </Badge>
      ),
      path: "/task",
      element: <Task />,
    },
  ];
  const [activeMenu, setActiveMenu] = useState(null);
  const handleNavigation = (
    path,
    hasDropdown = false,
    dropdownKey = null,
    isDropdownItem = false
  ) => {
    setActiveMenu(path);

    if (hasDropdown && !isDropdownItem) {
      setDropdownState((prevState) => ({
        ...prevState,
        [dropdownKey]: !prevState[dropdownKey],
      }));
      if (location.pathname !== path) {
        navigate(path);
      }
    } else if (isDropdownItem) {
      navigate(path);
    } else {
      setDropdownState({});
      navigate(path);
    }
  };

  const handleDropdownToggle = (key) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div
      className={`${
        open ? "w-[16.875rem]" : "w-[6.438rem]"
      } primary-color h-screen p-5 pt-8 duration-300 relative flex flex-col justify-between`}
    >
      <div>
        <div
          className="absolute cursor-pointer -right-3 top-8 w-6 h-6 flex items-center justify-center border-dark-purple p-4 border-2 rounded-full bg-white"
          onClick={() => setOpen(!open)}
        >
          <ArrowBackIosNewOutlinedIcon
            className={`${
              !open && "rotate-180"
            } transition-transform duration-300 text-dark-purple`}
          />
        </div>

        {/* Logo and Title Section */}
        <div className="flex items-center gap-x-4 mb-6">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          {open && (
            <h1 className="text-white font-medium text-xl duration-200">
              Designer
            </h1>
          )}
        </div>

        {/* Menu Items */}
        <ul className="">
          {Menus.map((menu, index) => (
            <div key={index}>
              <li
                onClick={() =>
                  handleNavigation(
                    menu.path,
                    menu.hasDropdown,
                    menu.dropdownKey
                  )
                }
                className={`text-white text-sm flex items-center justify-between gap-x-4 py-3 px-5 rounded-md cursor-pointer ${
                  menu.path === activeMenu
                    ? "bg-white text-[#0f2043] font-semibold"
                    : "hover:bg-[#0B1730]"
                }`}
              >
                <div className="flex items-center gap-x-4">
                  <span
                    className={`${
                      menu.path === activeMenu ? "text-[#0f2043]" : "text-white"
                    }`}
                  >
                    {menu.icon}
                  </span>
                  <span
                    className={`${
                      menu.path === activeMenu ? "text-[#0f2043]" : "text-white"
                    } ${!open ? "hidden" : "block"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </div>
                {menu.hasDropdown &&
                  open &&
                  (dropdownState[menu.dropdownKey] ? (
                    <ExpandLessIcon
                      className={`text-white ${
                        dropdownState[menu.dropdownKey] ? "" : "text-[#0f2043]"
                      }`}
                      onClick={() => handleDropdownToggle(menu.dropdownKey)}
                    />
                  ) : (
                    <ExpandMoreIcon
                      className={`text-white ${
                        dropdownState[menu.dropdownKey] ? "" : "text-[#0f2043]"
                      }`}
                      onClick={() => handleDropdownToggle(menu.dropdownKey)}
                    />
                  ))}
              </li>

              {/* Dropdown Items */}
              {menu.hasDropdown && dropdownState[menu.dropdownKey] && open && (
                <ul className="pt-2 ml-6 space-y-2">
                  {menu.dropdownItems.map((dropdownItem, idx) => (
                    <li
                      key={idx}
                      onClick={() =>
                        handleNavigation(dropdownItem.path, false, null, true)
                      }
                      className={`text-white text-sm flex items-center gap-x-4 py-2 px-4 rounded-md cursor-pointer hover:bg-[#0B1730] ${
                        dropdownItem.path === activeMenu ? "bg-[#0C1A37]" : ""
                      }`}
                    >
                      <span>{dropdownItem.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="border-t flex p-3 items-center border-gray-500">
        <Avatar
          alt="Kopibara Kun"
          src="/src/assets/profile/kopibara.jpg"
        ></Avatar>
        {open && (
          <div className="ml-3 flex-1">
            <h4 className="text-white text-sm">Kopibara Kun</h4>
            <p className="text-[#b3b3b3] text-xs">Branch Staff</p>
          </div>
        )}
        {open && (
          <IconButton
            aria-label="Settings"
            className="ml-3"
            onClick={() => handleNavigation("/settings")}
          >
            <SettingsOutlinedIcon style={{ color: "white" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
