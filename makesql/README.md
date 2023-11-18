# makesql

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
