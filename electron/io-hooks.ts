import {app} from "electron";
import {socket} from "./main";

export async function ioHooks() {
  socket?.on('action:info', async (callback) => {
    callback = checkCallback(callback)

    await callback({
      version: app.getVersion()
    })
  })
}

function checkCallback(callback: any) {
  return typeof callback == "function" ? callback : () => {
  }
}
