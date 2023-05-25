import {ipcMain} from "electron";
import settings from "electron-settings";
import {configureAutoUpdater} from "./services/autoupdater";

export function configureIpcMain() {
  ipcMain.on('front:ready', async (event) => {
    await configureAutoUpdater()
  });

  ipcMain.handle('settings.get', async (event, key) => {
    return settings.getSync(key);
  });

  ipcMain.handle('settings.set', async (event, key, payload) => {
    return settings.setSync(key, payload);
  });
}
