const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let query = {}
if(process.argv.length === 3){
  if(path.isAbsolute(process.argv[2])){
      query = {
          file: process.argv[2]
      }
  }else{
      query = {
          file: process.cwd()+"/"+process.argv[2]
      }
  }
}
let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
	  width: (800 * 1.2),
	  height: (600 * 1.2),
	  webPreferences: {
		  webSecurity: false
	  }
  })
  mainWindow.setMenu(null)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'pdf.js/web/viewer.html'),
    protocol: 'file:',
    slashes: true,
    query: query
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
