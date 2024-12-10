import * as React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CaseLogsIcon from "@mui/icons-material/AutoStoriesOutlined";
import MailIcon from "@mui/icons-material/EmailOutlined";
import AttachmentIcon from "@mui/icons-material/AttachmentOutlined";
import CaseTrackerIcon from "@mui/icons-material/TableChartOutlined";
import SubMenuIcon from "@mui/icons-material/FiberManualRecord";
import Avatar from "@mui/material/Avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";




import SettingsIcon from '@mui/icons-material/Settings';



export default function Sidebar() {
  const [activeItem, setActiveItem] = React.useState("Dashboard");
  const [openSections, setOpenSections] = React.useState<
    Record<string, boolean>
  >({
    logbook: false,
    mails: false,
    attachments: false,
  });

  const navigate = useNavigate(); // useNavigate hook for routing

  const toggleSection = (
    section: string,
    defaultItem: string | null = null
  ) => {
    setOpenSections((prev) => {
      const isOpening = !prev[section];
      const updatedSections = {
        ...prev,
        [section]: isOpening,
      };

      // Close all other sections when one is opened
      if (isOpening) {
        Object.keys(updatedSections).forEach((key) => {
          if (key !== section) updatedSections[key] = false;
        });
      }

      // Automatically select the default item when opening the section
      if (isOpening && defaultItem) {
        setActiveItem(defaultItem);
        handleItemClick(defaultItem); // Trigger navigation if needed
      }

      return updatedSections;
    });
  };

  const handleItemClick = (item: string, route?: string) => {
    setActiveItem(item);
    switch (item) {
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "From Email":
        navigate("/caselogs/FromEmail");
        break;
      case "Manual Input":
        navigate("/caselogs/ManualInput");
        break;
      case "All Attachments":
        navigate("/attachments/AllAttachments");
        break;
      case "My Attachments":
        navigate("/attachments/MyAttachments");
        break;
      case "Shared with Me":
        navigate("/attachments/SharedWithMe");
        break;
      case "Starred Attachments":
        navigate("/attachments/Starred");
        break;
      case "Archive Attachments":
        navigate("/attachments/Archive");
        break;
      case "Inbox":
        navigate("/mails/Inbox");
        break;
      case "Sent":
        navigate("/mails/Sent");
        break;
      case "Starred":
        navigate("/mails/Starred");
        break;
      case "Archive":
        navigate("/mails/Archive");
        break;
      case "Case Tracker":
        navigate("/casetracker/CaseTracker");
        break;


      case "Settings":
        navigate("/settings");
        break;

      default:
        break;
    }
  };

  const listItemStyles = (item: string) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 3,
    cursor: "pointer",
    color: "white",
    fontSize: "0.75rem",
    "&:hover": {
      bgcolor: "#0B1730",
    },
    "&.Mui-selected": {
      bgcolor: "white",
      color: "#0f2043",
      fontWeight: "bold",
      "&:hover": {
        bgcolor: "white",
      },
    },
    paddingY: "0.5rem",
    paddingX: "1rem",
  });

  const iconStyles = (item: string) => ({
    minWidth: "unset",
    marginRight: "0.25rem",
    color: activeItem === item ? "#0f2043" : "#f6f9ff",
    "&:hover": {
      color: "#0f2043",
    },
  });

  const renderListItem = (
    item: string,
    icon: React.ReactNode,
    section?: string,
    defaultItem?: string,
    route?: string
  ) => (
    <ListItemButton
      sx={listItemStyles(item)}
      selected={activeItem === item}
      onClick={() =>
        section
          ? toggleSection(section, defaultItem)
          : handleItemClick(item, route)
      }
    >
      <ListItemIcon sx={iconStyles(item)}>{icon}</ListItemIcon>
      <ListItemText primary={item} sx={{ marginLeft: "0.3rem" }} />
      {section && (openSections[section] ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );

  const renderSubListItem = (item: string, route: string) => (
    <ListItemButton
      sx={listItemStyles(item)}
      selected={activeItem === item}
      onClick={() => handleItemClick(item, route)}
    >
      <ListItemIcon sx={iconStyles(item)}>
        <SubMenuIcon
          sx={{ width: "0.7rem", height: "0.7rem", marginLeft: "0.25rem" }}
          className={activeItem === item ? "text-[#0F2043]" : "text-[#f6f9ff]"}
        />
      </ListItemIcon>
      <ListItemText primary={item} sx={{ paddingLeft: "1rem" }} />
    </ListItemButton>
  );

  return (
    <Stack className="w-72 bg-[#0F2043] h-screen p-8 min-w-72" spacing={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "left",
          paddingTop: "1.25rem",
        }}
      >
        <Box sx={{ marginRight: 2 }}>
          <img
            src="/logo-white.ico"
            alt="Casemaster Logo"
            style={{ width: 40, height: 40 }}
          />
        </Box>
        <Typography sx={{ color: "#f6f9ff", fontWeight: "600" }} variant="h6">
          CASEMASTER
        </Typography>
      </Box>

      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          color: "#f6f9ff",
        }}
        component="nav"
        aria-labelledby="casemaster"
      >
        {renderListItem("Dashboard", <DashboardIcon />)}
        {renderListItem(
          "Case Logs",
          <CaseLogsIcon />,
          "caselogs",
          "From Email",
          "/caselogs/FromEmail" // Adding the route for Case Logs
        )}
        <Collapse in={openSections.caselogs} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderSubListItem("From Email", "/caselogs/FromEmail")}
            {renderSubListItem("Manual Input", "/caselogs/ManualInput")}
          </List>
        </Collapse>
        {renderListItem(
          "Mails",
          <MailIcon />,
          "mails",
          "Inbox",
          "/mails/inbox"
        )}
        <Collapse in={openSections.mails} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderSubListItem("Inbox", "/mails/Inbox")}
            {renderSubListItem("Sent", "/mails/Sent")}
            {renderSubListItem("Starred", "/mails/Starred")}
            {renderSubListItem("Archive", "/mails/Archive")}
          </List>
        </Collapse>
        {renderListItem(
          "Attachments",
          <AttachmentIcon />,
          "attachments",
          "All Attachments",
          "/attachments/AllAttachments"
        )}
        <Collapse in={openSections.attachments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderSubListItem(
              "All Attachments",
              "/attachments/AllAttachments"
            )}
            {renderSubListItem("My Attachments", "/attachments/MyAttachments")}
            {renderSubListItem("Shared with Me", "/attachments/SharedWithMe")}
            {renderSubListItem("Starred Attachments", "/attachments/Starred")}
            {renderSubListItem("Archive Attachments", "/attachments/Archive")}
          </List>
        </Collapse>
        {renderListItem(
          "Case Tracker",
          <CaseTrackerIcon />,
          undefined,
          undefined,
          "/casetracker/CaseTracker"
        )}








        {renderListItem("Mail", <MailIcon />, undefined, undefined, "/mail/layout")}
        {renderListItem("Case Tracker", <CaseTrackerIcon />, undefined, undefined, "/casetracker/CaseTracker")}
        {renderListItem("Settings", <SettingsIcon />, undefined, undefined, "/settings")}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box className="flex mt-auto mx-3 gap-3 items-center border-t pt-6">
        <Avatar src="/broken-image.jpg" variant="rounded" />
        {true && (
          <Box className="">
            <p className="text-s text-white">Kopibara</p>
            <p className="text-xs text-white">BRANCH CLERK</p>
          </Box>
        )}
        {true && (
          <span className="ml-auto">
            <IconButton>
              <SettingsOutlinedIcon className="text-white" />
            </IconButton>
          </span>
        )}
      </Box>
    </Stack>
  );
}
