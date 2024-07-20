CLI to create a new blogpost

## Edit
`app/Commands/Blog.php` is the main command which is set as the default in `config/commands.php`

It's set up in the `package.json` of the main project to just run with `pnpm post`

Works on macOS, Linux, and Windows with WSL (Windows Subsystem for Linux)

Uses:
- https://laravel-zero.com
- https://laravel.com/docs/11.x/prompts