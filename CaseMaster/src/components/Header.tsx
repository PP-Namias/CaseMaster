import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NotificationIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Zoom from "@mui/material/Zoom";
import Divider from "@mui/material/Divider";

export default function Header({ title }: { title: string }) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5, border: "1px", marginX: 3 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#f6f9ff", gap: 1.5 }}
      >
        <Toolbar>
          <Stack direction="column" spacing={1}>
            <Typography variant="body1" sx={{ color: "#828CA0" }}>
              {formattedDate}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ color: "#0F2043", fontWeight: "bold" }}
            >
              {title}
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack spacing={2} direction="row">
            {/* Conditionally render the search bar */}
            {title !== "Dashboard" && (
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
                  backgroundColor: "#d3cfcf4d",
                  color: "#424242",
                  height: "2.5rem",
                  borderRadius: "20px",
                }}
              />
            )}
            <Tooltip
              title="Notifications"
              TransitionComponent={Zoom}
              placement="bottom"
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
              <IconButton aria-label="Notification">
                <NotificationIcon
                  style={{ color: "#0F2043", cursor: "pointer" }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
        <Box sx={{ marginLeft: 3 }}>
          <Divider sx={{ width: "calc(100% - 2.5rem)" }} />
        </Box>
      </AppBar>
    </Box>
  );
}
