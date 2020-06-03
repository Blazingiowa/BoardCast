const {
    app
} = require('electron');
const {
    BrowserWindow
} = require('electron');

app.on('ready', () => {
    const brWindow = new BrowserWindow();
    brWindow.loadURL(`file://${__dirname}/../index.html`);
});
