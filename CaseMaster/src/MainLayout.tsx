import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  // Dynamic titles based on the route
  const getTitle = () => {
    const titles: Record<string, string> = {
      "/dashboard": "Dashboard",
      "/caselogs/FromEmail": "Case Logs - From Email",
      "/caselogs/ManualInput": "Case Logs - Manual Input",
      "/mails/Inbox": "Inbox Mails",
      "/mails/Sent": "Sent Mails",
      "/mails/Starred": "Starred Mails",
      "/mails/Archive": "Archived Mails",
      "/attachments/AllAttachments": "All Attachments",
      "/attachments/MyAttachments": "My Attachments",
      "/attachments/SharedWithMe": "Shared with Me",
      "/attachments/Starred": "Starred Attachments",
      "/attachments/Archive": "Archived Attachments",
      "/casetracker/CaseTracker": "Case Tracker",
    };

    return titles[location.pathname] || "Casemaster";
  };

  return (
    <Box className="flex h-screen w-screen max-h-screen max-w-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box className="flex-grow flex flex-col max-h-screen max-w-screen">
        {/* Header */}
        <Box sx={{ flexShrink: 0 }}>
          <Header title={getTitle()} />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto", // Allow scrolling for long pages
            paddingY: 2,
            paddingX: 3, // Add spacing
            maxHeight: "100%", // Set maximum height
            maxWidth: "100%", // Set maximum width
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
