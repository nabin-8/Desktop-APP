# Desktop-APP

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
    ttps://github.com/nabin-8/Desktop-APP.git"
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

### Key Fundamentals
1. Main Process:
- [official-docs](https://www.electronjs.org/docs/latest/tutorial/process-model) 
    - **Role**: Acts like the "brain" of your Electron app.

    - **Responsibilities**: Controls the application lifecycle, handles system events, and creates/manages browser windows.

    - **Example**: In main.js, the Main Process creates the window and handles app events like when the app is ready or all windows are closed.

2. Renderer Process:
- [official-docs](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process)
    - **Role**: Runs the web pages (like index.html) inside each window.

    - **Responsibilities**: Manages the web content, handles user interactions, and updates the UI.

    - **Example**: Each browser window created by the Main Process runs in its own Renderer Process. It’s like a mini-browser.

3. IPC (Inter-Process Communication):
- [official-docs](https://www.electronjs.org/docs/latest/tutorial/ipc)
    - **Role**: Allows the Main Process and Renderer Process to talk to each other.

    - **Responsibilities**: Sends and receives messages between processes to coordinate tasks and share data.

    - **Example**: If you want to save a file (a task best handled by the Main Process), the Renderer Process would send an IPC message to the Main Process to perform that action.

4. Preload Script:
- [official-docs](https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts)
    - **Role**: Runs before the Renderer Process loads any web content.

    - **Responsibilities**: Exposes limited, safe Node.js features to the web page, enhancing security.

    - **Example**: In preload.js, you can safely provide Node.js functionalities to your web content, like showing version numbers without giving full access to Node.js.
