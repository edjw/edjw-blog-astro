# Project guidance

This is Ed Johnson-Williams’s personal Astro blog, deployed on Netlify.

- Use Vite+ (`vp`) for dependency and frontend-tool commands instead of invoking package managers or bundled tools directly; use `vp dlx` for one-off binaries.
- Vite+ built-ins such as `vp dev`, `vp build`, and `vp test` do not invoke same-named package scripts; use `vp run <script>` for those.
- Import Vite and Vitest APIs from `vite-plus` and `vite-plus/test`; do not install bundled tools directly.
- Validate changes with `vp check` and `vp test`.
