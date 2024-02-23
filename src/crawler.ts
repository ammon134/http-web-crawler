import { JSDOM } from "jsdom";

export type TPages = {
  [key: string]: number;
};

export const crawlPage = async (
  currentURL: string | URL,
  pages: TPages,
): Promise<TPages> => {
  // Normalize currentURLObj
  const currentURLObj = getURLObject(normalizeURL(currentURL));
  // If it exists in the pages, increment count
  // Otherwise add it to pages
  if (pages[currentURLObj.toString()]) {
    pages[currentURLObj.toString()] += 1;
    return pages;
  } else {
    pages[currentURLObj.toString()] = 1;
  }
  // Print currentURL
  console.log(`Crawling ${currentURLObj.toString()}...`);

  try {
    // Fetch it and get a list of URLs
    const res = await fetch(currentURLObj, {
      method: "GET",
    });
    if (!res.ok) {
      console.log("HTTP fetch error.");
      return pages;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("text/html")) {
      console.log(`Response is not text/html. It's ${contentType}`);
      return pages;
    }
    const HTMLBody = await res.text();
    const urlList = getURLsFromHTML(HTMLBody, currentURLObj);

    // Filter this list to have list of URLs with specified baseURL
    const filteredUrlList = urlList.filter((aString) => {
      const tmpURLObj = new URL(aString);
      return tmpURLObj.hostname == currentURLObj.hostname;
    });

    // Call crawlPage on each URL of this list
    for (let url of filteredUrlList) {
      pages = await crawlPage(url, pages);
    }
  } catch (err: any) {
    console.log(`Fetch error: ${err.message}`);
  }
  // Return pages
  return pages;
};

export const getURLObject = (url: string | URL): URL => {
  if (typeof url == "string") {
    try {
      return new URL(url);
    } catch {
      throw new Error("Error converting url to object.");
    }
  } else {
    return url;
  }
};

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

export const normalizeURL = (url: string | URL): string => {
  let urlObj: URL;
  if (typeof url == "string") {
    try {
      urlObj = new URL(url);
    } catch (err: any) {
      console.log(`${err.message}`);
      return "";
    }
  } else {
    urlObj = url;
  }
  let fullpath = `http://${urlObj.hostname}${urlObj.pathname}`;
  if (fullpath.endsWith("/")) {
    fullpath = fullpath.slice(0, fullpath.length - 1);
  }
  return fullpath;
};
