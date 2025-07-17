# Task Completion Checklist

## Quality Assurance Steps

1. **Format Code**: Run `pnpm run format` to ensure consistent formatting
2. **Lint Code**: Run `pnpm run lint` to catch code quality issues
3. **Build Check**: Run `pnpm run build` to verify production build works
4. **Type Safety**: Ensure TypeScript compilation passes (consider adding explicit typecheck)

## Content Validation

- Verify blog post frontmatter follows schema requirements
- Check that tags are kebab-case format
- Ensure social descriptions are ≤155 characters
- Validate that images are properly referenced and optimised

## Testing & Verification

- **Local Testing**: Use `pnpm run dev` to test changes locally
- **Build Verification**: Ensure `pnpm run build` completes without errors
- **Preview Testing**: Use `pnpm run preview` to test built site

## Deployment Readiness

- Code formatted and linted successfully
- Production build completes without errors
- All TypeScript types resolve correctly
- Content schema validation passes

## Git Workflow

- Commit changes with descriptive messages
- Netlify deployment happens automatically on push to main branch
