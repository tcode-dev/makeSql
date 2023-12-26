# makesql

https://makesql.tcode.dev

## Demo

![makesql tcode dev s3-website-ap-southeast-2 amazonaws com_](https://github.com/tcode-dev/makeSql/assets/42083313/0c22fa12-0091-4397-8ba3-1588f4d7b283)

## Project Setup

```sh
docker run --rm -it -v $(pwd):/app -w /app node:20.0.0-slim npm install
```

### Compile and Hot-Reload for Development

```sh
docker run --rm -it -p 80:80 -v $(pwd):/app -w /app node:20.0.0-slim npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
docker run --rm -it -v $(pwd):/app -w /app node:20.0.0-slim npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
docker run --rm -it -v $(pwd):/app -w /app node:20.0.0-slim npm run lint
```

### Format

```sh
docker run --rm -it -v $(pwd):/app -w /app node:20.0.0-slim npm run format
```
