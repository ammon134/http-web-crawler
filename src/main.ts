import { argv } from "process";
import { crawlPage } from "./crawler";

const main = async () => {
  if (argv.length != 3) {
    const err = new Error("Usage: node main.ts <BASE_URL>");
    throw err;
  }
  const baseURL = argv[2];
  console.log(`${baseURL} is where we will start crawling.`);

  const pages = await crawlPage(baseURL, {});
  console.log(pages);
};

main();
