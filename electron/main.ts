import {app, BrowserWindow, Menu, nativeImage, Tray} from 'electron'
import path from "path";
import settings from 'electron-settings';
import {Server, Socket} from 'socket.io'
import {configureSettings} from "./services/settings";
import {autoUpdater} from "electron-updater";
import {configureIpcMain} from "./ipcmain-hooks";

let tray: Tray
export let win: BrowserWindow
export const SOCKET_IO_PORT = 8000
export let io: Server | null = null
export let socket: Socket | null = null

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = path.join(process.env.ROOT, process.env.VITE_DEV_SERVER_URL ? 'public' : '.output/public')
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const iconPath = app.isPackaged ? path.join(process.resourcesPath, 'electron-extras', 'icon.png') : path.join('electron-extras', 'icon.png')

configureIpcMain()

async function bootstrap() {
  io = new Server(SOCKET_IO_PORT, {})

  io.on('connection', (socket_io) => {
    socket = socket_io
  })

  if (!settings.hasSync('session')) {
    settings.setSync('session', {
      sid: null,
      username: null,
      password: null
    })
  }

  if (!settings.hasSync('app')) {
    settings.setSync('app', {
      width: 1024,
      height: 768
    })
  }

  win = new BrowserWindow({
    height: settings.getSync('app.height') as any,
    width: settings.getSync('app.width') as any,
    x: settings.getSync('app.position.x') as any,
    y: settings.getSync('app.position.y') as any,
    webPreferences: {
      devTools: !app.isPackaged,
      preload: path.join(process.env.DIST!, 'preload.js'),
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false,
    },
  })

  win.setIcon(nativeImage.createFromPath(iconPath))

  configureSettings()

  if (app.isPackaged) {
    await win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  } else {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL!)
    win.webContents.toggleDevTools()
  }

  if (app.isPackaged) {
    win.removeMenu()
  }

  createTray()
}

app.whenReady().then(bootstrap)

process.on('uncaughtException', (error) => {
  console.error(error)
})

const createTray = () => {
  tray = new Tray(nativeImage.createFromPath(iconPath))

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Vérifier les mises à jour', type: 'normal', click: async () => await autoUpdater.checkForUpdates()},
    {label: `Quitter l'application`, type: 'normal', click: () => app.quit()}
  ])

  tray.setContextMenu(contextMenu)
  tray.setToolTip('Instant-Gaming Webscraper')
}
