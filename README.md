# makesql

https://makesql.tcode.dev

## Demo

![makesql tcode dev s3-website-ap-southeast-2 amazonaws com_](https://github.com/tcode-dev/makeSql/assets/42083313/0c22fa12-0091-4397-8ba3-1588f4d7b283)

## Project Setup

```sh
docker compose run --rm app npm install
```

### Compile and Hot-Reload for Development

```sh
docker compose up
```

### Type-Check, Compile and Minify for Production

```sh
docker compose run --rm app npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
docker compose run --rm app npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
docker compose run --rm e2e
```

`@playwright/test` を更新するときは、`compose.yaml` の `e2e` サービスのイメージも同じバージョンに更新してください。

### Lint with [ESLint](https://eslint.org/)

```sh
docker compose run --rm app npm run lint
```

### Format

```sh
docker compose run --rm app npm run format
```
