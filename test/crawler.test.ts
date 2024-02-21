import { normalizeURL } from "../src/crawler.ts";

const expected_full_path = "blog.boot.dev/path";
const host_path_urls = [
  "https://blog.boot.dev/path/",
  "https://blog.boot.dev/path",
  "http://blog.boot.dev/path/",
  "http://blog.boot.dev/path",
];

test("correctly normalizes URL", () => {
  for (const url of host_path_urls) {
    expect(normalizeURL(url)).toBe(expected_full_path);
  }
});

const invalid_urls = ["/en-US/docs", ""];
test("returns empty string when url is invalid", () => {
  for (const url of invalid_urls) {
    expect(normalizeURL(url)).toBe("");
  }
});
