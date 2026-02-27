# Laravel React Starter Kit

## Tech Stack

| Category | Technology |
|---|---|
| Database | [PostgreSQL 18](https://www.postgresql.org/) (default), [MySQL 8.4](https://www.mysql.com/) |
| Runtime | [Docker](https://www.docker.com/) ([Laravel Sail](https://laravel.com/docs/sail)) |
| Backend | [PHP 8.4](https://www.php.net/), [Laravel 12](https://laravel.com/docs/12.x), [Inertia v2](https://inertiajs.com/) |
| Frontend | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| Compiler | [React Compiler](https://react.dev/learn/react-compiler) (`babel-plugin-react-compiler`) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com) (`radix-vega` style) |
| Icons | [Tabler Icons](https://tabler.io/icons) (`@tabler/icons-react`) |
| Font | [Pretendard Variable](https://github.com/orioncactus/pretendard) (가변 다이나믹 서브셋) |
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

### Database Setup

This starter kit supports **PostgreSQL** (default) and **MySQL**. Run the setup script to choose your database:

```bash
bash database-setup.sh
```

The script will:
1. Prompt you to select PostgreSQL or MySQL
2. Configure `compose.yaml` and `.env` for the selected database
3. Clean up the setup files automatically

### Start the Application

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
