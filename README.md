# Desktop-APP
Electron.js

## Steps to create Electron.js App
- go to [official side](https://www.electronjs.org/) to electron.js
- follow these [steps  to](https://www.electronjs.org/docs/latest/tutorial/quick-start) create electron app

#### Steps to create electron.js app
- check node.js and npm version
```bash
node -v
npm -v
```
- create directory and initialize it
```bash
mkdir to_do_app && cd to_do_app
npm init
```
- give name version and entry points
```json
{
  "name": "to-do-app",
  "version": "1.0.0",
  "description": "Nabins, TO DO APP",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/nabin-8/Desktop-APP.git"
  },
  "keywords": [
    "electron",
    "todo-app",
    "electronApp"
  ],
  "author": "Nabin Acharya",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/nabin-8/Desktop-APP/issues"
  },
  "homepage": "https://github.com/nabin-8/Desktop-APP#readme"
}


Is this OK? (yes)
```
- install electron.js
```bash
npm install --save-dev electron
```
-  add the start script and start
```json
{
  "scripts": {
    "start": "electron ."
  }
}
```
npm start

#### App Structure
- create these files
```bash
touch main.js preload.js index.html
```
- main.js: Creates and manages the Electron window.
- preload.js: Safely exposes version info to the webpage.
- index.html: Displays the Electron, Node, and Chrome versions.

- code with explanation
main.js
```javascript
const { app, BrowserWindow } = require('electron')
// Imports Electron modules to control app lifecycle and create windows.

const path = require('node:path')
// Imports Node.js module for file path operations.

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // Creates a new browser window with specified dimensions and preload script.

  mainWindow.loadFile('index.html')
  // Loads 'index.html' into the window.

  // mainWindow.webContents.openDevTools()
  // Uncomment to open DevTools for debugging.
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// Runs createWindow() when the app is ready and re-creates window on macOS when no windows are open.

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
// Quits the app when all windows are closed, except on macOS.
```
preload.js
```javascript
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  // Replaces text in the HTML elements with the given selector.

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
  // Updates version information for Chrome, Node.js, and Electron.
})
```
index.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Electron App</title>
</head>
<body>
  <h1>My Electron App</h1>
  <p>Chrome version: <span id="chrome-version"></span></p>
  <p>Node version: <span id="node-version"></span></p>
  <p>Electron version: <span id="electron-version"></span></p>
</body>
</html>
```
- start the app
```bash
npm start
```

- After following the above steps, you should have a fully functional Electron application that looks like this:
![Electron.img](https://www.electronjs.org/assets/images/simplest-electron-app-849f2d68df0c27475bfb850ed5d171a6.png)