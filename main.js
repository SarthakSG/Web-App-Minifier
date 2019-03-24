const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
function createWindow() {
    let win = new BrowserWindow({ width: 800, height: 200 });

    const menuTemplate = [{
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform ==
                    'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }];
    if (process.platform == 'darwin') menuTemplate.unshift({})
    let mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu);

    win.loadFile('index.html');

    win.on('closed', () => {
        win = null
    })


}

app.on('ready', createWindow);
