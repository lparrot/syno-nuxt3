import {win} from "../main";
import settings from "electron-settings";

export function configureSettings() {
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

  if (settings.getSync('app.maximized')) {
    win.maximize()
  }
}
