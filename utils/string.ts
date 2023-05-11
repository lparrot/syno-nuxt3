export function interpolate(text: string, ...params: any[]) {
  return text.replace(
    /\{([^{}]*)}/g,
    (a: string, b: number) => {
      return params[b];
    }
  );
}

export function isBlank(text: string) {
  return text == null || text.trim() === ''
}

export function isNotBlank(text: string) {
  return !isBlank(text)
}
