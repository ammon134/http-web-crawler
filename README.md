# HTTP Web Crawler

## Description

Tiny tool to report the count of each internal (crawlable) links of a website, given one of its URLs.

Tested with [Jest](https://jestjs.io/).

## Installation

Run the following commands to clone the tool and install all dependencies.

```sh
git clone https://github.com/ammon134/http-web-crawler.git
cd http-web-crawler
npm install
```

## Usage

```sh
npm start <URL>
```

For example, to run the tool on `https://web.dev/blog/introducing-learn-testing?hl=en`

```sh
npm start https://web.dev/blog/introducing-learn-testing?hl=en
```
