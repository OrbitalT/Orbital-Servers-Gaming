const {
    app,
    BrowserWindow,
    Menu
} = require('electron')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 510,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    var menu = Menu.buildFromTemplate([{
        label: 'Menu',
        submenu: [{
                label: 'CSV',
                click() {
                    openCSVWindow()
                }
            },
            {
                label: 'Docs',
                click() {
                    shell.openExternal('https://github.com/OrbitalT/Lease-Gen/blob/Master/README.md')
                },
                accelerator: 'Alt+D'
            },
            {
                type: 'separator'
            },
            {
                role: 'toggleDevTools'
            },
            {
                label: 'Exit',
                click() {
                    app.quit()
                }
            }
        ]
    }])
    Menu.setApplicationMenu(menu);

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})