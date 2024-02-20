import { normalizeURL as nu } from "./crawler";

const expected = "blog.boot.dev/path";
const urls_host_path = [
  "https://blog.boot.dev/path/",
  "https://blog.boot.dev/path",
  "http://blog.boot.dev/path/",
  "http://blog.boot.dev/path",
];

test("correctly normalizes URL", () => {
  for (let i = 0; i < urls_host_path.length; i++) {
    expect(nu("https://blog.boot.dev/path/")).toBe(expected);
  }
});

const invalid_urls = ["/en-US/docs", "", "http://whatis"];
test("returns empty string when url is invalid", () => {
  for (let i = 0; i < invalid_urls.length; i++) {
    expect(nu("")).toBe("");
  }
});
