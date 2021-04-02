const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");
let mainWindow;
function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  mainWindow.loadURL(startUrl);
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.maximize();
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
//create main menu template
const mainMenuTemplate = [
  {
    label: "Purchase",
    submenu: [
      {
        label: "Create New Purchase",
        click() {
          mainWindow.webContents.send("modalToLoad", "Purchase");
        },
      },
    ],
  },
  {
    label: "Stock",
    submenu: [
      {
        label: "Create New Stock",
        click() {
          mainWindow.webContents.send("modalToLoad", "Stock");
        },
      },
    ],
  },
  {
    label: "Company",
    submenu: [
      {
        label: "Create New Company",
        click() {
          mainWindow.webContents.send("modalToLoad", "Company");
        },
      },
    ],
  },
  {
    label: "Breakage",
    submenu: [
      {
        label: "Create New Breakage",
        click() {
          mainWindow.webContents.send("modalToLoad", "Breakage");
        },
      },
    ],
  },
  {
    label: "Return",
    submenu: [
      {
        label: "Create New Return",
        click() {
          mainWindow.webContents.send("modalToLoad", "Return");
        },
      },
    ],
  },
  {
    label: "Merchant",
    submenu: [
      {
        label: "Create New Merchant",
        click() {
          mainWindow.webContents.send("modalToLoad", "Merchant");
        },
        accelerator: process.platform == "darwin" ? "Command+M" : "ALT+M",
      },
    ],
  },
  {
    label: "Invoice",
    submenu: [
      {
        label: "Create New Invoice",
        click() {
          mainWindow.webContents.send("modalToLoad", "Invoice");
        },
        accelerator: process.platform == "darwin" ? "f1" : "f1",
      },
    ],
  },
  {
    label: "Advance",
    submenu: [
      {
        label: "Manage HSN",
        click() {
          mainWindow.webContents.send("modalToLoad", "HSN");
        },
      },
      {
        label: "Manage Size",
        click() {
          mainWindow.webContents.send("modalToLoad", "Size");
        },
      },
      {
        label: "Manage Type",
        click() {
          mainWindow.webContents.send("modalToLoad", "Type");
        },
      },
    ],
  },
];
