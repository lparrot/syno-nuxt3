let settings: any = null

export default async function () {
  if (settings == null) {
    settings = await window.ipcRenderer.invoke('settings.get', '');
  }

  return {
    settings
  }
}
