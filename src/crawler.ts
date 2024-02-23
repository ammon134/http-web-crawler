export const normalizeURL = (url: string): string => {
  if (!URL.canParse(url)) {
    return "";
import { JSDOM } from "jsdom";



export const getURLsFromHTML = (
  html: string,
  baseURL: string | URL,
): string[] => {
  const { document } = new JSDOM(html).window;
  const aList = document.querySelectorAll("a");
  const URLs: string[] = [];
  for (let a of aList) {
    try {
      let baseURLObj: URL;
      if (typeof baseURL == "string") {
        baseURLObj = new URL(baseURL);
      } else {
        baseURLObj = baseURL;
      }
      let tmpURL = new URL(a.href, baseURLObj.origin);
      URLs.push(tmpURL.href);
    } catch (err: any) {
      console.log(`${err.message}: ${a.href}`);
    }
  }
  return URLs;
};

  }
  const urlObj = new URL(url);
  let fullpath = `${urlObj.hostname}${urlObj.pathname}`;
  if (fullpath.endsWith("/")) {
    fullpath = fullpath.slice(0, fullpath.length - 1);
  }
  return fullpath;
};
