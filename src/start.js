const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

/*const path = require('path');
const url = require('url');*/

let mainWindow;

function createWindow() {

    let mainWindowOptions = { ...electron.screen.getPrimaryDisplay().workAreaSize, frame: false };
    mainWindow = new BrowserWindow(mainWindowOptions);
    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadURL(process.env.ELECTRON_START_URL ||
        /*url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        }*/ 'http://localhost:3000'
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => { app.quit() });
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});