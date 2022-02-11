const {
    app,
    BrowserWindow,
    Menu
} = require('electron')
const https = require('https');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    var menu = Menu.buildFromTemplate([{
        label: 'Menu',
        submenu: [{
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

// var options = {
//   host: 'n8n.nnukez.com',
//   path: '/webhook-test/bb4639ce-39f5-43bc-92f8-36bac19bdace',
//   method: 'GET'
// };

// callback = function(response) {
//   var str = '';

//   //another chunk of data has been received, so append it to `str`
//   response.on('data', function (chunk) {
//     str += chunk;
//   });

//   //the whole response has been received, so we just print it out here
//   response.on('end', function () {
//     console.log(str);
//   });
// }

// https.request(options, callback).end();