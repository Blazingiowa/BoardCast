const {
    app
} = require('electron');
const {
    BrowserWindow
} = require('electron');

app.on('ready', () => {
    const brWindow = new BrowserWindow();
    brWindow.loadURL(`file://${__dirname}/../html/title.html`);
    brWindow.webContents.openDevTools();
});