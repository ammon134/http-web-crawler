import { TPages } from "./crawler";

export const printReport = (pages: TPages): void => {
  // Sort pages
  console.log("***");
  console.log("Printing report...");
  const sortedPages = sortPages(pages);
  for (const [url, count] of sortedPages) {
    console.log(`- Found ${count} internal link/s to ${url}`);
  }
};

const sortPages = (pages: TPages): Map<string, number> => {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => {
    return b[1] - a[1];
  });
  return new Map(pagesArray);
};
