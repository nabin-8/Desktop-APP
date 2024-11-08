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
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('fetch-notes', (event) => {
    const db = new sqlite3.Database('db/notes.db');
    
    db.all("SELECT * FROM notes", (err, rows) => {
        mainWindow.webContents.send('read-notes-ui', rows);
    });
    
    db.close();
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  ipcMain.on('create-notes', (event, title, description) => {
    const db = new sqlite3.Database('db/notes.db');
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO notes (title, description) VALUES (?, ?)");
        stmt.run(title, description);
        stmt.finalize();
    });
    db.close();
  });
 
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



