const { app, BrowserWindow, Menu } = require('electron');
const { ipcMain } = require('electron/main');
const Calculator = require('./Calculator');
// Set environment
process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;

function createMainWindow() {
   mainWindow = new BrowserWindow({
      title: 'Bil Calculator',
      width: isDev ? 800 : 500,
      height: 600,
      icon: './assets/icons/icon.png',
      resizable: isDev ? true : false,
      backgroundColor: 'white',
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
      },
   });

   // open dev tools if in development mode
   if (isDev) {
      mainWindow.webContents.openDevTools();
   }

   // add file path
   mainWindow.loadFile('./public/index.html');
}

app.on('ready', () => {
   createMainWindow();
   // set menu
   const mainMenu = Menu.buildFromTemplate(menu);
   Menu.setApplicationMenu(mainMenu);
});

const menu = [
   // if Mac set appMenu
   ...(isMac ? [{ role: 'appMenu' }] : []),
   {
      role: 'fileMenu',
   },
   ...(isDev
      ? [
           {
              label: 'Developer',
              submenu: [
                 { role: 'reload' },
                 { role: 'forcereload' },
                 { type: 'separator' },
                 { role: 'toggledevtools' },
              ],
           },
        ]
      : []),
];

app.on('window-all-closed', () => {
   if (!isMac) {
      app.quit();
   }
});

app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
   }
});

app.allowRendererProcessReuse = true;

ipcMain.on('send:data', (e, args) => {
   const { days, units } = JSON.parse(args);
   const calculator = new Calculator(days, units);
   mainWindow.webContents.send(
      'send:calculations',
      JSON.stringify({
         beforeVAT: calculator.beforeVAT,
         afterVAT: calculator.afterVAT,
      })
   );
});
