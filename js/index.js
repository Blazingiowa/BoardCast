const {
    app,
    BrowserWindow
} = require('electron');
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800
    });
    win.setMenu(null);

    //↓完成間近になったら消すデベロッパツール
    win.webContents.openDevTools();
    //↑

    //win.loadURL(`file://${__dirname}/../index.html`);
    win.loadURL(`file://${__dirname}/../form.html`);
    
    win.on("closed", () => {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on('active', () => {
    if (win === null) {
        createWindow();
    }
});
