const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const sqlite3 = require('sqlite3').verbose();

function runMigration() {
    const db = new sqlite3.Database('db/notes.db');

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)")
    });
    db.close();
}
const handleCallAPI = async () => {
    const res = await fetch('https://dummyjson.com/carts');
    const data = await res.json();
    return JSON.stringify(data);
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

    ipcMain.handle('call-api', handleCallAPI)

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    runMigration()
    createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



