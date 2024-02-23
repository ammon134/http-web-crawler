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

// getURLsFromHTML

const HTMLString = `<div class="devsite-article-body clearfix">

<p><img src="/static/blog/introducing-learn-testing/image/thumbnail.jpg" alt="Learn Testing." width="100%" srcset="https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_36.jpg 36w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_48.jpg 48w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_72.jpg 72w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_96.jpg 96w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_480.jpg 480w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_720.jpg 720w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_856.jpg 856w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_960.jpg 960w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_1440.jpg 1440w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_1920.jpg 1920w,https://web.dev/static/blog/introducing-learn-testing/image/thumbnail_2880.jpg 2880w" sizes="(max-width: 840px) 100vw, 856px"></p>

<p>Today we are excited to announce the most recent addition to our course series!
<a href="/learn/testing">Learn Testing</a> is a brand-new course written by
<a href="https://samthor.au/about/">Sam Thorogood</a>, a former startup CTO and ex-Google</p>

<p><a href="https://mdn.dev/archives/insights/reports/mdn-web-developer-needs-assessment-2020.html#technologies-web-testing">Research has shown</a>,
developers still spend a lot of their time running manual tests. Often because
setting up proper tests is seen as cumbersome and difficult. But in most cases,
writing tests is worth the effort and can save you time in the long run! With
the launch of the first chapters of this new course and the ones following over
the next couple of months, we hope to encourage more developers to take the
plunge and start adding tests to their projects.</p>

<p>As with <a href="/learn">all the other courses on web.dev</a>, like Learn HTML, Learn
Performance, or Learn Accessibility you don't need to work through the course
chapter by chapter. It also neatly works as a reference that you can share with
your colleagues whenever you touch on testing.</p>

<p>As soon as you are ready, feel free to dive into Learn Testing! Let us know what
you think and what you are looking for in upcoming chapters, either by 
<a href="https://issuetracker.google.com/issues/new?component=1400680&amp;template=1857359">filing an issue</a>
or by posting at us on X with <a href="https://twitter.com/ChromiumDev">@ChromiumDev</a>.</p>

</div>`;

const baseURL = "https://web.dev";
const expectedURLs = [
  `${baseURL}/learn/testing`,
  "https://samthor.au/about/",
  "https://mdn.dev/archives/insights/reports/mdn-web-developer-needs-assessment-2020.html#technologies-web-testing",
  `${baseURL}/learn`,
  "https://issuetracker.google.com/issues/new?component=1400680&template=1857359",
  "https://twitter.com/ChromiumDev",
];

test("HTML returns correct list of URLs", () => {
  expect(getURLsFromHTML(HTMLString, baseURL)).toEqual(expectedURLs);
});

