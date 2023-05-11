import {app, BrowserWindow, ipcMain} from 'electron'
import {lstat} from 'node:fs/promises'
import {cwd} from 'node:process'
import path from "path";
import settings from 'electron-settings';
import {Server, Socket} from 'socket.io'

export const SOCKET_IO_PORT = 8000
export let io: Server | null = null
export let socket: Socket | null = null

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, 'public')
  : path.join(process.env.ROOT, '.output/public')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow

const preload = path.join(process.env.DIST, 'preload.js')

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
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false,
    },
  })

  win.on('moved', () => {
    const [x, y] = win.getPosition()
    settings.setSync('app.position.x', x)
    settings.setSync('app.position.y', y)
  })

  win.on('maximize', () => {
    settings.setSync('app.maximized', true)
  })

  win.on('unmaximize', () => {
    settings.setSync('app.maximized', false)
  })

  win.on('resized', () => {
    const [width, height] = win.getSize();
    settings.setSync('app.height', height)
    settings.setSync('app.width', width)
  })

  if (process.env.VITE_DEV_SERVER_URL != null) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.toggleDevTools()
  } else {
    await win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  }

  if (settings.getSync('app.maximized')) {
    win.maximize()
  }

  socket?.on('settings:get', (key, callback) => {
    callback(settings.getSync(key));
  })

  socket?.on('settings:set', (key, value, callback) => {
    settings.setSync(key, value)
    callback({success: true})
  })
}

app.whenReady().then(bootstrap)

lstat(cwd()).then(stats => {
  // console.log('[fs.lstat]', stats)
}).catch(err => {
  console.error(err)
})

ipcMain.handle('settings.get', async (event, key) => {
  return settings.getSync(key);
});

ipcMain.handle('settings.set', async (event, key, payload) => {
  return settings.setSync(key, payload);
});
