# Laravel React Starter Kit

## Tech Stack

| Category   | Technology                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Database   | [PostgreSQL 18](https://www.postgresql.org/) (default), [MySQL 8.4](https://www.mysql.com/)                                                                                                |
| Runtime    | [Podman](https://podman.io/) (managed by lerd)                                                                                                            |
| Backend    | [PHP 8.4](https://www.php.net/), [Laravel 13](https://laravel.com/docs/13.x), [Inertia v3](https://inertiajs.com/)                                                                         |
| Frontend   | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/)                                                                                                            |
| Compiler   | [React Compiler](https://react.dev/learn/react-compiler) (`babel-plugin-react-compiler`)                                                                                                   |
| Styling    | [Tailwind CSS 4](https://tailwindcss.com/)                                                                                                                                                 |
| Components | [shadcn/ui](https://ui.shadcn.com) (`radix-vega` style)                                                                                                                                    |
| Icons      | [Tabler Icons](https://tabler.io/icons) (`@tabler/icons-react`)                                                                                                                            |
| Font       | [Pretendard Variable](https://github.com/orioncactus/pretendard) (가변 다이나믹 서브셋)                                                                                                    |
| Routing    | [Wayfinder](https://github.com/laravel/wayfinder) (type-safe routes)                                                                                                                       |
| Auth       | [Laravel Fortify](https://laravel.com/docs/fortify)                                                                                                                                        |
| Testing    | [Pest 4](https://pestphp.com/) (with browser testing), [Larastan](https://github.com/larastan/larastan), [Rector](https://getrector.com/)                                                  |
| Linting    | [ESLint 9](https://eslint.org/), [Prettier 3](https://prettier.io/), [Laravel Pint](https://laravel.com/docs/pint)                                                                         |
| AI Dev     | [Laravel Boost](https://github.com/laravel/boost) (MCP server), [Laravel PAO](https://github.com/laravel/pao) (agent-optimized output), [shadcn skill](https://ui.shadcn.com) (MCP server) |

## Getting Started

### Prerequisites

Install lerd, the Podman-based PHP development environment this project runs on.

### Link and Set Up the Project

From the project root:

```bash
lerd init
lerd setup
```

- `lerd init` runs the setup wizard (PHP version, HTTPS, required services) and saves the answers to `.lerd.yaml`. This starter kit defaults to **PostgreSQL**; **MySQL** is also available.
- `lerd setup` links the site and runs the project setup: Composer and Node dependencies, `.env` configuration, `APP_KEY`, migrations, asset build, and the queue and scheduler workers.

Once setup finishes, open the site in your browser:

```bash
lerd open
```

## Development

Run the project's Composer and console commands through lerd, so they execute in the project's PHP container:

```bash
lerd composer install
lerd console route:list
```

## Testing

```bash
lerd composer test
```
