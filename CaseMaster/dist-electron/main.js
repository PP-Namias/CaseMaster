import { app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
const require2 = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
const { screen } = require2("electron");
function createWindow() {
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: 1400,
    // Set the width to 1600
    height: 900,
    // Set the height to 1000
    center: true,
    // Center the window on the screen
    titleBarStyle: "hidden",
    // Hide the title bar
    titleBarOverlay: {
      // Customize the title bar
      color: "#F6F9FF",
      symbolColor: "#000000"
    },
    icon: path.join(process.env.VITE_PUBLIC, "logo-white.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    },
    minWidth: 1400,
    minHeight: 800,
    maxWidth: screenWidth
  });
  win.removeMenu();
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
