let settings: any = null

export default async function () {
  if (settings == null) {
    settings = await window.app.getSettings('');
  }

  return {
    settings
  }
}
