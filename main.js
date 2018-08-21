// Modules to control application life and create native browser window
const electron = require("electron");
const { app, BrowserWindow, globalShortcut } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let toggled = false;
const totalWidth = 400 + 40 + 40;
let timeout;

function createWindow() {
  // Create the browser window.
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  console.log(width, height);
  let side = "right";

  mainWindow = new BrowserWindow({
    width: totalWidth,
    height,
    y: 40,
    x: width + 500,
    frame: false,
    transparent: true,
    useContentSize: true,
    resizable: false,
    minHeight: height
  });

  app.dock.hide();
  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  mainWindow.loadFile("./index-opacity.html");
  // mainWindow.setAlwaysOnTop(true, "screensaver", 2);
  // mainWindow.setVisibleOnAllWorkspaces(true);
  // mainWindow.setResizable(false);
  // mainWindow.setVisibleOnAllWorkspaces(true);
  // mainWindow.setPosition(width + 500, 40, true);

  const ret = globalShortcut.register("CommandOrControl+Shift+T", () => {
    toggled = !toggled;
    if (toggled) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  // console.log(electron.screen.getAllDisplays());

  // function reset() {
  //   clearTimeout(timeout);
  //   if (!toggled) return;

  //   timeout = setTimeout(() => {
  //     let [x, y] = mainWindow.getPosition();
  //     // console.log(x, width/2)
  //     if (x + 200 > width / 2) {
  //       side = "right";
  //       mainWindow.setPosition(width - totalWidth, 40, true);
  //     } else {
  //       side = "left";
  //       mainWindow.setPosition(0, 40, true);
  //     }
  //   }, 200);
  // }
  // mainWindow.on("moved", () => {
  //   // console.log('moved!!', mainWindow.getPosition())
  //   reset();
  // });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    clearTimeout(timeout);
    globalShortcut.unregister("CommandOrControl+Shift+T");

    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  });

  // setTimeout(() => {
  //   mainWindow.setBounds({x: - 400 - 20, y: 40, width: 400, height: height - 80}, true)

  // }, 1000)

  // setTimeout(() => {
  //   mainWindow.setContentBounds({x: width + 1000 - 20, y: 40, width: 400, height: height - 80}, true)

  // }, 3000)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  clearTimeout(timeout);

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
