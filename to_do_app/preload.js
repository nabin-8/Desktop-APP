const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  createNotes: (title, description) => ipcRenderer.send('create-notes', title, description),
  // callAPI:() => ipcRenderer.invoke('call-api')
  fetchNotes: () => ipcRenderer.send('fetch-notes'),
  readNotesUI: (callback) => {
    ipcRenderer.on('read-notes-ui', (_event, rows) => callback(rows))
  },
})