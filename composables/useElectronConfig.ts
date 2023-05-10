let settings: any = null

export default async function () {
  if (settings == null) {
    settings = await window.syno.getSettings('');
  }

  return {
    settings
  }
}
