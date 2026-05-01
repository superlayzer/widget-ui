# Widget UI

`@superlayzer/widget-ui` is a design system for building widgets that run inside [Layzer](https://layzer.ai)'s MCP App sandbox. It provides Tailwind 4 design tokens, a curated React component library, and utilities optimized for consistent in-iframe widget experiences.

This package is a fork of [`@openai/apps-sdk-ui`](https://github.com/openai/apps-sdk-ui), maintained by Layzer to track upstream while shipping Layzer-specific defaults. See [UPSTREAM.md](./UPSTREAM.md) for the sync workflow and [NOTICE](./NOTICE) for attribution.

## Features

- **Design tokens** for colors, typography, spacing, sizing, shadows, surfaces, and more.
- **Tailwind 4 integration** pre-configured with Widget UI's design tokens.
- **Accessible components**, built on Radix primitives with consistent styling.
- **Utilities** for dark mode, responsive layouts, and iframe-friendly behaviors.
- **Minimal boilerplate** — import styles, wrap with a provider, start building.

## Prerequisites

Widget UI requires **React 19** and **Tailwind 4**.

- React: https://react.dev/learn/installation
- Tailwind 4: https://tailwindcss.com/docs/installation

## Installation

### 1. Install the package

```bash
npm install @superlayzer/widget-ui
```

### 2. Setup styles

Add the foundation styles and Tailwind layers to the top of your global stylesheet (e.g. `main.css`):

```css
@import "tailwindcss";
@import "@superlayzer/widget-ui/css";
/* Required for Tailwind to find class references in Widget UI components. */
@source "../node_modules/@superlayzer/widget-ui";

/* The rest of your widget CSS */
```

Then import your stylesheet _before_ rendering any components:

```tsx
// Must be imported first to ensure Tailwind layers and style foundations are defined before any potential component styles
import "./main.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 3. Configure router (optional)

`<WidgetUIProvider>` helps define your default router link component, used in components like `<TextLink>` and `<ButtonLink>`.

This provider is optional — router links can also be passed directly to components via the `as` prop.

```tsx
// Must be imported first to ensure Tailwind layers and style foundations are defined before component styles
import "./main.css"

import { WidgetUIProvider } from "@superlayzer/widget-ui/components/WidgetUIProvider"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Link } from "react-router"
import { App } from "./App"

declare global {
  interface WidgetUIConfig {
    LinkComponent: typeof Link
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WidgetUIProvider linkComponent={Link}>
      <App />
    </WidgetUIProvider>
  </StrictMode>,
)
```

### Start building

Your widget is now ready to use Widget UI!

Here's an example of a simple reservation card, using Tailwind classes and components.

```tsx
import { Badge } from "@superlayzer/widget-ui/components/Badge"
import { Button } from "@superlayzer/widget-ui/components/Button"
import { Calendar, Invoice, Maps, Members, Phone } from "@superlayzer/widget-ui/components/Icon"

export function ReservationCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-default bg-surface shadow-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-secondary text-sm">Reservation</p>
          <h2 className="mt-1 heading-lg">La Luna Bistro</h2>
        </div>
        <Badge color="success">Confirmed</Badge>
      </div>
      <div>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Calendar className="size-4" />
            Date
          </dt>
          <dd className="text-right">Apr 12 · 7:30 PM</dd>
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Members className="size-4" />
            Guests
          </dt>
          <dd className="text-right">Party of 2</dd>
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Invoice className="size-4" />
            Reference
          </dt>
          <dd className="text-right uppercase">4F9Q2K</dd>
        </dl>
      </div>
      <div className="mt-4 grid gap-3 border-t border-subtle pt-4 sm:grid-cols-2">
        <Button variant="soft" color="secondary" block>
          <Phone />
          Call
        </Button>
        <Button color="primary" block>
          <Maps />
          Directions
        </Button>
      </div>
    </div>
  )
}
```

## Upstream

This package tracks [openai/apps-sdk-ui](https://github.com/openai/apps-sdk-ui). To merge upstream updates, see [UPSTREAM.md](./UPSTREAM.md).

## License

[MIT](LICENSE) © OpenAI (upstream) and Layzer (fork modifications). See [NOTICE](./NOTICE) for attribution details.
