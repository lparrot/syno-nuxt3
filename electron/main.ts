import {app, BrowserWindow, ipcMain} from 'electron'
import {lstat} from 'node:fs/promises'
import {cwd} from 'node:process'
import path from "path";
import settings from 'electron-settings';

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, 'public')
  : path.join(process.env.ROOT, '.output/public')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow

const preload = path.join(process.env.DIST, 'preload.js')

async function bootstrap() {
  if (!settings.hasSync('session')) {
    settings.setSync('session', {
      sid: null,
      username: null,
      password: null
    })
  }

  win = new BrowserWindow({
    webPreferences: {
      enablePreferredSizeMode: true,
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL != null) {
    await win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    await win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  }

  win.maximize()
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
