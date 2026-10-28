# Env

## APP_NAME is the display name; APP_SLUG is the technical identifier

APP_NAME is the user-facing service name (Korean allowed). Laravel uses it in mail layouts, notifications, and the Fortify 2FA issuer, and the frontend reads it as VITE_APP_NAME, so do not add a separate service name variable. APP_SLUG must be a short, English, lowercase, project-specific identifier (e.g. "douinc"): config/cache.php, config/database.php, and config/session.php derive the cache prefix, Redis prefix, and session cookie name from it, so projects sharing Redis or a browser host do not collide. Do not derive these from APP_NAME, because Str::slug() turns Korean into an empty string.

## Leave values unquoted unless they contain spaces

Write values without quotes (`APP_ENV=production`, `MAIL_FROM_NAME=${APP_NAME}`); `${VAR}` interpolation works unquoted in phpdotenv, Vite, and `dou run`. Wrap a value in double quotes only when it contains whitespace or  `#` (e.g. `APP_NAME="Dou Inc"`), because phpdotenv fails to parse unquoted whitespace and treats  `#` as a comment. Never use single quotes for values with `${VAR}`; phpdotenv does not interpolate them. Write `secret://` references unquoted (`APP_KEY=secret://<service>/APP_KEY`), because the deploy workflow matches `^KEY=secret://` lines.