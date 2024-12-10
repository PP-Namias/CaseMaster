import { useState } from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Divider from "@mui/material/Divider";
import ImportOutlinedIcon from "@mui/icons-material/PublishOutlined";
import ImportFilledIcon from "@mui/icons-material/Publish";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EmailFilledIcon from "@mui/icons-material/Email";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditFilledIcon from "@mui/icons-material/Edit";

export default function DetailsComponent() {
  // Separate states for each icon
  type IconState = {
    import: "outlined" | "filled";
    email: "outlined" | "filled";
    edit: "outlined" | "filled";
    [key: string]: "outlined" | "filled";
  };

  const [icons, setIcons] = useState<IconState>({
    import: "outlined",
    email: "outlined",
    edit: "outlined",
  });

  // Mock data for the details table
  const detailsData = [
    {
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Case No.",
      value: "RCT-001",
    },
    {
      icon: <TitleOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Title",
      value: "BPI SAVINGS v. LABINDO",
    },
    {
      icon: <PersonOutlineIcon sx={{ fontSize: 20 }} />,
      label: "Party Filer",
      value: "Yvez Lawrence",
    },
    {
      icon: <CalendarTodayOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Date Added",
      value: "October 12, 2024 5:30 PM",
    },
    {
      icon: <LabelOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Document Type",
      value: "Motion",
    },
    {
      icon: <AttachFileOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Attachment",
      value: "101424_motion_recon.pdf",
    },
    {
      icon: <LabelOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Tag",
      value: "None",
    },
    {
      icon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
      label: "Status",
      value: "New",
    },
  ];

  // Generic handler for mouse enter/leave and click
  const handleIconChange = (action: string, iconName: string) => {
    setIcons((prev) => ({
      ...prev,
      [iconName]:
        action === "enter"
          ? "filled"
          : action === "leave"
          ? "outlined"
          : prev[iconName] === "outlined"
          ? "filled"
          : "outlined",
    }));
  };

  return (
    <Card
      sx={{
        minWidth: 400,
        maxWidth: 400,
        minHeight: 590,
        maxHeight: 590,
        boxShadow: "none",
        border: "1px solid",
        borderColor: "#DBDEE3",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ padding: 4 }}>
        <Box sx={{ color: "#0F2043" }}>
          <Stack spacing={1}>
            {/* Header */}
            <Stack direction={"row"}>
              <Typography variant="h6" fontWeight="bold">
                Details
              </Typography>
              <Box sx={{ flexGrow: 1 }} />

              <Stack direction={"row"} alignItems="center">
                {/* Import Button */}
                <Tooltip
                  title="Import to Case Tracker"
                  slots={{ transition: Zoom }}
                  placement="top"
                  arrow
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -5],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <IconButton
                    aria-label="import"
                    onClick={() => handleIconChange("click", "import")}
                    onMouseEnter={() => handleIconChange("enter", "import")}
                    onMouseLeave={() => handleIconChange("leave", "import")}
                    sx={{
                      borderRadius: "50%",
                      minWidth: "auto",
                      minHeight: "auto",
                    }}
                  >
                    {icons.import === "outlined" ? (
                      <ImportOutlinedIcon className="text-[#0F2043]" />
                    ) : (
                      <ImportFilledIcon className="text-[#0F2043]" />
                    )}
                  </IconButton>
                </Tooltip>

                {/* Email Button */}
                <Tooltip
                  title="Check Email"
                  slots={{ transition: Zoom }}
                  placement="top"
                  arrow
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -5],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <IconButton
                    aria-label="Email"
                    onClick={() => handleIconChange("click", "email")}
                    onMouseEnter={() => handleIconChange("enter", "email")}
                    onMouseLeave={() => handleIconChange("leave", "email")}
                    sx={{
                      borderRadius: "50%",
                      minWidth: "auto",
                      minHeight: "auto",
                    }}
                  >
                    {icons.email === "outlined" ? (
                      <EmailOutlinedIcon className="text-[#0F2043]" />
                    ) : (
                      <EmailFilledIcon className="text-[#0F2043]" />
                    )}
                  </IconButton>
                </Tooltip>

                {/* Edit Button */}
                <Tooltip
                  title="Edit Details"
                  slots={{ transition: Zoom }}
                  placement="top"
                  arrow
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -5],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <IconButton
                    aria-label="Edit"
                    onClick={() => handleIconChange("click", "edit")}
                    onMouseEnter={() => handleIconChange("enter", "edit")}
                    onMouseLeave={() => handleIconChange("leave", "edit")}
                    sx={{
                      borderRadius: "50%",
                      minWidth: "auto",
                      minHeight: "auto",
                    }}
                  >
                    {icons.edit === "outlined" ? (
                      <EditOutlinedIcon className="text-[#0F2043]" />
                    ) : (
                      <EditFilledIcon className="text-[#0F2043]" />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Divider sx={{ width: "calc(100% - 0.75rem)" }} />

            {/* Details Table */}
            <Box
              sx={{
                maxHeight: 480,
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: 4, // Width of the scrollbar
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f0f0f0", // Scrollbar track color
                  borderRadius: 4,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#D9D9D9", // Scrollbar thumb color
                  borderRadius: 4,
                  "&:hover": {
                    backgroundColor: "#909090", // Thumb color on hover
                  },
                },
              }}
            >
              <Stack spacing={2} mt={2}>
                {detailsData.map((detail, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ minHeight: 40 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "40%",
                      }}
                    >
                      {detail.icon}
                      <Typography
                        variant="body2"
                        sx={{ ml: 1, fontWeight: "bold" }}
                      >
                        {detail.label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ width: "60%", wordBreak: "break-word" }}
                    >
                      {detail.value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
