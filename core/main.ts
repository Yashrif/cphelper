import { app, BrowserWindow } from "electron";
import * as path from "path";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";

import "./lib/ipcLoad";
import "./lib/ipcStore";

const isDev = process.env.NODE_ENV !== "production";

let mainWindow: BrowserWindow;
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: "CPHelper",
    width: 1270,
    height: 720,
    // frame: false,

    webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  prisma.settings
    .findUnique({
      where: { id: 1 },
      select: {
        handle: true,
      },
    })
    .then((data) => {
      if (data && data?.handle?.length > 0)
        isDev
          ? mainWindow.loadURL("http://localhost:5173/")
          : mainWindow.loadFile(path.join(__dirname, "index.html"));
      else
        isDev
          ? mainWindow.loadURL("http://localhost:5173/#/welcome")
          : mainWindow.loadFile(path.join(__dirname, "index.html"));
    });
};

app.whenReady().then(() => {
  createMainWindow();

  /* -----------------------------Adding redux dev tool ----------------------------- */

  if (isDev)
    mainWindow.webContents.once("dom-ready", async () => {
      await installExtension([REDUX_DEVTOOLS])
        // .then((name) => console.log(`Added Extension:  ${name}`))
        // .catch((err) => console.log("An error occurred: ", err))
        .finally(() => {
          mainWindow.webContents.openDevTools();
        });
    });
});
