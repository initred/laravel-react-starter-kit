# Laravel React Starter Kit

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | [Docker](https://www.docker.com/) ([Laravel Sail](https://laravel.com/docs/sail)) |
| Backend | [PHP 8.4](https://www.php.net/), [Laravel 12](https://laravel.com/docs/12.x), [Inertia v2](https://inertiajs.com/) |
| Frontend | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| Compiler | [React Compiler](https://react.dev/learn/react-compiler) (`babel-plugin-react-compiler`) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com) (`radix-nova` style) |
| Icons | [Tabler Icons](https://tabler.io/icons) (`@tabler/icons-react`) |
| Font | [Geist](https://vercel.com/font) (`@fontsource-variable/geist`) |
| Routing | [Wayfinder](https://github.com/laravel/wayfinder) (type-safe routes) |
| Auth | [Laravel Fortify](https://laravel.com/docs/fortify) |
| Testing | [Pest 4](https://pestphp.com/) (with browser testing), [Larastan](https://github.com/larastan/larastan), [Rector](https://getrector.com/) |
| Linting | [ESLint 9](https://eslint.org/), [Prettier 3](https://prettier.io/), [Laravel Pint](https://laravel.com/docs/pint) |
| AI Dev | [Laravel Boost](https://github.com/laravel/boost) (MCP server) |

## Getting Started

After cloning this template, run the following command to install dependencies:

```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs
```

Then, start the application using Laravel Sail and run the setup script:

```bash
vendor/bin/sail up -d
vendor/bin/sail composer setup
```

## Development

```bash
vendor/bin/sail composer dev
```

For server-side rendering (SSR):

```bash
vendor/bin/sail composer dev:ssr
```

## Testing

```bash
vendor/bin/sail composer test
```
