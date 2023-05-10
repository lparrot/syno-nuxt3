import {contextBridge, ipcRenderer} from 'electron'

console.log('---- electron/preload.ts ----')

contextBridge.exposeInMainWorld('syno', {
  getSettings: async (key: string) => {
    return ipcRenderer.invoke('settings.get', key)
  },
  setSettings: async (key: string, value: any) => {
    await ipcRenderer.invoke('settings.set', key, value)
  }
})

declare global {
  interface Window {
    syno: {
      getSettings: (key: string) => Promise<any>;

      setSettings: (key: string, value: any) => Promise<void>;
    }
  }
}
