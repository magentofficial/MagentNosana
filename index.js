name: Docsearch Crawl

on:
  push:
    branches:
      - master

jobs:
  crawl:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout codebase
        uses: actions/checkout@v2
      - name: Crawl the site
        env:
          APPLICATION_ID: ${{ secrets.DOCSEARCH_APP_ID }}
          API_KEY: ${{ secrets.DOCSEARCH_API_KEY }}
        run: |
          docker run \
          -e APPLICATION_ID -e API_KEY \
          -e CONFIG="$(node .github/workflows/docsearchConfigScript.js | cat .github/workflows/docsearchConfig.json)" \
          algolia/docsearch-scraper:v1.6.0
