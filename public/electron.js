const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // webSecurity: false
    },
  });

  win.webContents.openDevTools();

  if (!isDev) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools(); // Open DevTools in development
  } else {
    win.loadFile(
      `${path.join(__dirname, '../build/index.html')}`
    );
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});