const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow(){
    const win = new BrowserWindow({
        window: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "prelosad.js")
        }
    });
    win.loadFile("index.html")
}
app.whenReady().then(createWindow);