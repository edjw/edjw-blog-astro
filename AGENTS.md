# Project guidance

This is Ed Johnson-Williams’s personal Astro blog, deployed on Netlify.

- Use pnpm for dependency and frontend-tool commands; use `pnpm dlx` for one-off binaries.
- Run package scripts with `pnpm run <script>` and installed executables with `pnpm exec <command>`.
- Import Vite and Vitest APIs from `vite` and `vitest`.
- Validate changes with `pnpm run check` and `pnpm test`.
