# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
docker run --rm -it -p 3000:3000 -v $(pwd):/app -w /app node:20.0.0-slim yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
docker run --rm -it -p 3000:3000 -v $(pwd):/app -w /app node:20.0.0-slim yarn dev
```

## Production

Build the application for production:

```bash
docker run --rm -it -p 3000:3000 -v $(pwd):/app -w /app node:20.0.0-slim yarn build
```

Locally preview production build:

```bash
docker run --rm -it -p 3000:3000 -v $(pwd):/app -w /app node:20.0.0-slim yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
