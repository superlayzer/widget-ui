# Upstream sync

`@superlayzer/widget-ui` is a fork of [`openai/apps-sdk-ui`](https://github.com/openai/apps-sdk-ui). The upstream repo is wired up as a git remote so we can pull updates mechanically.

## One-time setup

If `git remote -v` does not list an `upstream` remote, add it:

```bash
git remote add upstream https://github.com/openai/apps-sdk-ui.git
```

## Sync workflow

```bash
# 1. Make sure your working tree is clean
git status

# 2. Fetch upstream and switch to a sync branch
git fetch upstream
git checkout main
git pull origin main
git checkout -b sync/upstream-$(date +%Y%m%d)

# 3. Merge upstream main
git merge upstream/main
```

Resolve conflicts (see "Expected conflicts" below), then:

```bash
# 4. Verify
npm install
npm run lint
npm run types
npm run test
npm run build

# 5. Open a PR
git push origin HEAD
gh pr create --title "Sync upstream $(date +%Y-%m-%d)" --body "Merges openai/apps-sdk-ui main."
```

## Expected conflicts

The fork-specific changes that will conflict on every sync are concentrated in a small number of files. When in doubt, accept upstream's version of source files and reapply the fork-specific renames listed below.

| File                                            | What to keep from the fork                                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `package.json`                                  | `name`, `version`, `description`, `repository`, `homepage`, `bugs`, `author`, `keywords`, `peerDependencies.react`, `publishConfig`  |
| `package-lock.json`                             | Regenerate with `npm install` after resolving `package.json`                                                                         |
| `README.md`                                     | Layzer-flavored intro, attribution, `@superlayzer/widget-ui` import paths                                                            |
| `NOTICE`                                        | Update the "Forked at" SHA to the new merge base                                                                                     |
| `UPSTREAM.md`                                   | This file — usually no change needed                                                                                                 |
| `src/components/WidgetUIProvider/**`            | Renamed from upstream's `AppsSDKUIProvider/`. Keep the rename.                                                                       |
| `src/global.d.ts`                               | `WidgetUI` namespace, `WidgetUIOverrides` interface                                                                                  |
| `postcss/*.mjs`                                 | `@superlayzer/widget-ui/components/...` plugin IDs                                                                                   |
| `.storybook-base/addon-theme/themes.ts`         | Layzer brand title/url                                                                                                               |
| `.storybook-base/addon-title/index.ts`          | `STORYBOOK_TITLE = "Widget UI"`                                                                                                      |
| `.storybook-base/components/StorybookApp.tsx`   | `WithWidgetUIContext` decorator                                                                                                      |
| `.storybook-base/preview.tsx`                   | `WithWidgetUIContext` import                                                                                                         |
| Source files referencing the provider/namespace | Components that import from `../WidgetUIProvider/internal` and types that reference `WidgetUI.LinkComponent` / `WidgetUI.Breakpoint` |
| `.github/workflows/`                            | Layzer publish + CI workflows                                                                                                        |

If upstream renames `AppsSDKUIProvider` to something else, prefer matching their structure and re-applying the `WidgetUIProvider` rename on top.

## After a sync

1. Update `NOTICE` with the new merge-base commit SHA: `git rev-parse upstream/main` (run before merging) or use the merge commit SHA after.
2. Open a PR and let CI run.
3. After merge, run the **Release** workflow (Actions tab → Release → Run workflow) and pick the appropriate version bump:
   - `patch` for upstream patch-level changes or fork-only fixes
   - `minor` for upstream minor releases or new features
   - `major` for breaking changes (upstream's or ours)
     The workflow bumps `package.json`, commits to `main`, tags `v<version>`, publishes to npm with provenance, and creates a GitHub Release.
4. Smoke-test against Layzer (`servers/mcp-test-server` in `superlayzer/layzer`) before announcing.

## When NOT to sync

- Upstream pushes a release that breaks API surface we depend on in Layzer — coordinate with the Layzer monorepo first.
- Upstream changes the build pipeline in a way that's incompatible with our publish workflow — adapt `.github/workflows/` before merging.
- The fork has accumulated Layzer-only changes that haven't been upstreamed — try to upstream them first, or carry them forward carefully.
