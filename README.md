# Justlife News

A news website built with Nuxt.js and TypeScript, displaying articles from the News API (newsdata.io) with SSR, pagination, and a detail page.

## Setup

```bash
yarn install
```

Create a `.env` file (or set the variable in your environment):

```
NUXT_NEWS_API_KEY=your_newsdata_io_api_key
```

Get an API key from [newsdata.io](https://newsdata.io).

To use mock data instead of the real API (e.g. when API credits are exceeded), set `NUXT_USE_MOCK_NEWS=true` in your `.env`. The app will then serve data from `server/mocks/` and does not require an API key.

## Run

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
yarn build
yarn preview
```

## Test

```bash
yarn test
```
