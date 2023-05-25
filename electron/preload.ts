import {contextBridge, ipcRenderer, shell} from 'electron'

console.log('---- electron/preload.ts ----')

contextBridge.exposeInMainWorld('app', {
  frontReady: () => {
    ipcRenderer.send('front:ready', true)
  },
  openLink: async (url: string) => {
    await shell.openExternal(url)
  },
  getSettings: async (key: string) => {
    return ipcRenderer.invoke('settings.get', key)
  },
  setSettings: async (key: string, value: any) => {
    await ipcRenderer.invoke('settings.set', key, value)
  },
})

declare global {
  interface Window {
    app: {
      frontReady: () => void;
      openLink: (url: string) => Promise<void>;
      getSettings: (key: string) => Promise<any>;
      setSettings: (key: string, value: any) => Promise<void>;
    }
  }
}
