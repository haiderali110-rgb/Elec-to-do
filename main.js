const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
 
 
const DATA_PATH = path.join(app.getPath('userData'), 'tasks-db.json');

function createWindow() {
    const win = new BrowserWindow({
        width: 450,
        height: 650,
        title: "Electron Todo",
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('src/index.html');
 
}

 
ipcMain.handle('get-tasks', () => {
    if (!fs.existsSync(DATA_PATH)) return [];
    return JSON.parse(fs.readFileSync(DATA_PATH));
});

ipcMain.on('save-tasks', (event, tasks) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(tasks));
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});