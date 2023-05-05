export function interpolate(text: string, ...params: any[]) {
  return text.replace(
    /\{([^{}]*)}/g,
    (a: string, b: number) => {
      return params[b];
    }
  );
};
