import { contextBridge, ipcRenderer, IpcRenderer } from 'electron'

console.log('---- electron/preload.ts ----')

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)

declare global {
  interface Window { ipcRenderer: IpcRenderer; }
}
