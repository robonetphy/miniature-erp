const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const express = require("express");
const server = express();
const port = 8080;
var cors = require("cors");

var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "../db/database.sqlite"),
  },
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("src/index.html");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});

server.use(cors());
server.get("/", (req, res) => {
  res.send("Hello World!");
});
server.get("/data", (req, res) => {
  let result = knex.select("Name").from("User");
  result.then(function (rows) {
    res.send(rows);
  });
});
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
