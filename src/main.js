const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;

function createWindow(){
  mainWindow=new BrowserWindow({
    width:1280,
    height:720,
    title:'Main',
    frame: false,
    icon:'img/icon.png'
  });
  mainWindow.loadURL(`file://${__dirname}//html.css/login.html`);
}
app.on('ready', createWindow);
