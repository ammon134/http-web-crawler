export const normalizeURL = (url: string): string => {
  if (!URL.canParse(url)) {
    return "";
  }
  const urlObj = new URL(url);
  let fullpath = `${urlObj.hostname}${urlObj.pathname}`;
  if (fullpath.endsWith("/")) {
    fullpath = fullpath.slice(0, fullpath.length - 1);
  }
  return fullpath;
};
