# Codex Task: Extension-aware Playwright testing CLI

## Goal

Design and prototype a browser-extension-specific testing CLI powered by Playwright, with optional Playwright MCP integration.

The CLI should scan a browser extension repository, generate extension-aware test cases, run Playwright tests, and produce an extension-specific test report.

This should **not** replace Playwright. It should sit above Playwright as a repo-aware orchestrator for Chrome/Edge extension testing.

Suggested positioning:

> Repo-aware test generator and report layer for browser extensions, powered by Playwright.

Possible names:

- `extest`
- `extension-testpilot`
- `addon-testkit`

## Research notes

### What Playwright already supports

Playwright already supports Chrome extension testing through Chromium persistent contexts. The official approach is to use `chromium.launchPersistentContext()` and load the extension with Chromium flags:

```ts
args: [
  `--disable-extensions-except=${extensionPath}`,
  `--load-extension=${extensionPath}`,
]
```

It can also extract an MV3 extension id from the service worker URL and directly open extension pages:

```txt
chrome-extension://<extensionId>/popup.html
```

Reference:

- https://playwright.dev/docs/chrome-extensions

Playwright already provides HTML, JSON, JUnit, and custom reporters:

- https://playwright.dev/docs/test-reporters

Playwright MCP lets coding agents operate browsers via Model Context Protocol. It can be used for AI-assisted extension exploration, repro, and test generation:

- https://playwright.dev/docs/getting-started-mcp
- https://github.com/microsoft/playwright-mcp

### Similar existing work

Existing pieces exist, but none appear to fully cover this product shape:

- Playwright official Chrome extension docs: lower-level recipe, not repo-aware case generation.
- Playwright codegen: records flows, but does not infer extension-specific test plans from `manifest.json` or source code.
- Playwright reporters: general E2E reports, not extension-domain reports.
- Playwright MCP: browser-control layer for AI agents, but does not understand extension repo semantics by itself.
- Extension.js Playwright E2E docs: close to extension workflows, but focused on Extension.js ecosystem.
- WXT / Plasmo / CRXJS: extension development/build tooling, not generic repo-aware test generation.

References:

- https://extension.js.org/docs/workflows/playwright-e2e
- https://wxt.dev/
- https://github.com/kelseyaubrecht/playwright-chrome-extension-testing-template

## Product shape

Pipeline:

```txt
scan extension repo
  -> parse manifest/package/source files
  -> detect popup/options/background/content scripts/permissions/chrome APIs
  -> generate testplan.json
  -> generate Playwright fixture and spec files
  -> run tests with extension loaded in persistent Chromium context
  -> output Playwright reports + extension-specific Markdown/HTML report
  -> optionally generate Playwright MCP config and exploration prompts
```

## MVP CLI commands

```bash
extest init
extest scan
extest generate
extest run
extest report
extest mcp init
extest doctor
```

### `extest init`

Generate:

- `extest.config.ts`
- `playwright.config.ts`
- `tests/extension/fixtures/extension.ts`
- default report output folder

### `extest scan`

Detect:

- `manifest.json`
- manifest version
- `action.default_popup`
- `options_page` / `options_ui`
- `background.service_worker`
- `content_scripts`
- `permissions`
- `commands`
- `_locales/messages.json`
- `chrome.*` API usage in source
- build tool: Vite / Rollup / Webpack / WXT / Plasmo / CRXJS

Example output:

```json
{
  "type": "chrome-extension",
  "manifestVersion": 3,
  "entries": {
    "popup": "popup.html",
    "options": "options.html",
    "background": "service_worker.js"
  },
  "permissions": ["tabs", "bookmarks", "history", "storage", "tabGroups"],
  "apis": [
    "chrome.tabs.query",
    "chrome.bookmarks.search",
    "chrome.history.search",
    "chrome.storage.local",
    "chrome.tabGroups.query"
  ],
  "suggestedCases": [
    "popup-smoke",
    "popup-search",
    "storage-persistence",
    "tab-search",
    "bookmark-search",
    "history-search",
    "tabgroups-rendering"
  ]
}
```

### `extest generate`

Generate:

- `tests/extension/testplan.json`
- `tests/extension/generated/*.spec.ts`

Keep `testplan.json` as a first-class intermediate artifact. Do not generate only test code.

### `extest run`

Run Playwright with extension loading:

- build extension if needed
- use Chromium persistent context
- load extension path
- resolve extension id from service worker
- enable trace/video/screenshots on failure
- write JSON + HTML output

### `extest report`

Generate an extension-specific report from Playwright JSON + `testplan.json`:

```md
# Extension Test Report

## Summary

- Total: 24
- Passed: 21
- Failed: 3

## Extension Coverage

| Area | Passed | Failed |
|---|---:|---:|
| Popup | 8 | 1 |
| Background | 4 | 0 |
| Content Script | 3 | 1 |
| Storage | 2 | 0 |
| Search | 4 | 1 |

## Failed Cases

### popup-search-domain

Reason: expected result containing `github.com`, but no matching item appeared.

Possible causes:

1. Search index not initialized.
2. Tabs permission missing.
3. Popup input selector changed.
4. Test fixture did not open the expected tab.
```

### `extest mcp init`

Generate:

- `.extest/playwright-mcp.config.json`
- `.extest/mcp-exploration-prompt.md`
- optional MCP client snippet

Example MCP config:

```json
{
  "browser": {
    "browserName": "chromium",
    "userDataDir": ".extest/mcp-profile",
    "launchOptions": {
      "headless": false,
      "args": [
        "--disable-extensions-except=/absolute/path/to/dist-extension",
        "--load-extension=/absolute/path/to/dist-extension"
      ]
    }
  }
}
```

## Test case templates

Generate extension-aware tests based on detected capabilities.

### Common templates

- Popup smoke test
- Options page smoke test
- Background service worker availability
- Content script injection test
- Console error check
- Storage persistence test
- i18n smoke test
- Permission sanity test
- Commands/shortcuts smoke test

### API-driven templates

If source uses `chrome.tabs.query`:

- open multiple tabs
- open popup
- search/switch tab
- assert results and no console errors

If source uses `chrome.bookmarks.search`:

- generate bookmark-related test scaffold
- warn if real bookmark setup cannot be automated safely

If source uses `chrome.history.search`:

- visit pages
- open popup
- search history keyword

If source uses `chrome.tabGroups`:

- create grouped tabs if possible
- assert group color/title rendering

If source uses `chrome.storage.local`:

- set option
- close/reopen popup or options page
- assert persistence

## Blazwitcher-specific test ideas

Generate cases for:

1. Popup render smoke test.
2. Search input visibility.
3. Chinese keyword search.
4. English keyword search.
5. Pinyin initials search.
6. Domain search, e.g. `github.com`.
7. Space-token search, orderless matching, e.g. `repo github`.
8. Multiple tab result ordering.
9. Tab group color/title rendering.
10. Dark mode class/theme-mode behavior.
11. Background service worker no-error check.
12. Storage persistence for settings.
13. Console error capture.
14. Basic visual snapshot for popup/options.

Recommended UI test hooks:

```tsx
<input data-testid="search-input" />
<div data-testid="result-list" />
<div data-testid="result-item" />
```

## Suggested implementation stack

- Runtime: Node.js >= 20
- Language: TypeScript
- CLI: `commander` or `cac`
- File scan: `fast-glob`, `fs-extra`
- AST: `ts-morph` or `@babel/parser`
- Config validation: `zod`
- Test runner: `@playwright/test`
- Reports: Playwright JSON + custom Markdown/HTML
- MCP: generated config for `@playwright/mcp`
- Package manager: `pnpm`

Suggested structure:

```txt
src/
  cli.ts
  commands/
    init.ts
    scan.ts
    generate.ts
    run.ts
    report.ts
    mcp.ts
    doctor.ts
  scanner/
    manifestScanner.ts
    packageScanner.ts
    sourceScanner.ts
    permissionScanner.ts
  generator/
    testPlanGenerator.ts
    playwrightGenerator.ts
    mcpConfigGenerator.ts
  runner/
    playwrightRunner.ts
    extensionFixtureWriter.ts
  reporter/
    jsonParser.ts
    markdownReporter.ts
    htmlReporter.ts
  templates/
```

## MVP acceptance criteria

1. Running `extest init` creates config and Playwright extension fixture.
2. Running `extest scan` prints manifest entries, permissions and detected Chrome APIs.
3. Running `extest generate` creates `testplan.json` and basic Playwright spec files.
4. Running `extest run` loads the extension in Chromium persistent context and runs generated tests.
5. Running `extest report` creates `extest-report/summary.md` and preserves Playwright HTML report.
6. Running `extest mcp init` creates a Playwright MCP config and an exploration prompt.
7. The implementation should avoid replacing Playwright internals. It should orchestrate Playwright.

## Important constraints

- Do not build a custom test runner in MVP.
- Do not make MCP a hard dependency.
- Do not promise AI-generated tests are always correct.
- Prefer deterministic Playwright tests first.
- Keep `testplan.json` as the core product artifact.
- Use `data-testid` where possible.
- Treat Playwright official extension testing pattern as the source of truth.

## Suggested first steps for Codex

1. Inspect current repository structure and build output path.
2. Locate `manifest.json` and extension entry files.
3. Add `extest.config.ts` draft.
4. Add a Playwright extension fixture.
5. Add scanner for `manifest.json` and `package.json`.
6. Add `testplan.json` generator.
7. Add one generated popup smoke test and one search-input test.
8. Add `extest-report/summary.md` generation from Playwright JSON.
9. Add README section explaining how to run.

## Starting prompt for Codex

```txt
Implement the MVP for an extension-aware Playwright testing CLI in this repository.

Start by inspecting the repo structure, manifest location, build output, package manager, and existing test setup.

Do not replace Playwright. Add a thin CLI/orchestrator that can:
1. scan the extension manifest and package.json,
2. generate a testplan.json,
3. generate Playwright extension fixture/specs,
4. run Playwright with Chromium persistent context and extension loading flags,
5. produce a Markdown extension test summary,
6. optionally generate Playwright MCP config.

Use Node.js + TypeScript. Keep MCP optional. Keep generated tests deterministic. Prefer data-testid selectors when available, otherwise fall back to robust locators.

Use Playwright official Chrome extension testing pattern as the source of truth.
```
