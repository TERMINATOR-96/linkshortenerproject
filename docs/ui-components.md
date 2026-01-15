# UI Components

## Overview

This project uses [shadcn/ui](https://ui.shadcn.com/) exclusively for all UI components. **DO NOT create custom components** when shadcn/ui provides an equivalent.

## Core Principles

### 1. Use shadcn/ui Components Only
- **Always** check if shadcn/ui has a component before creating a custom one
- Never build custom buttons, inputs, dialogs, cards, etc. from scratch
- Leverage the pre-built, accessible, and well-tested shadcn components

### 2. Component Installation
When you need a shadcn/ui component that isn't already in the project:
```bash
npx shadcn@latest add [component-name]
```

This installs the component into `/components/ui/` directory.

### 3. Component Composition
- Combine shadcn/ui primitives to build complex UI patterns
- Use shadcn's composition patterns (e.g., Dialog with DialogTrigger, DialogContent, etc.)
- Maintain the component structure and naming conventions from shadcn/ui

## Common Components

| Use Case | shadcn Component |
|----------|------------------|
| Buttons | `<Button>` |
| Forms | `<Form>`, `<Input>`, `<Label>` |
| Dialogs/Modals | `<Dialog>` |
| Cards | `<Card>` |
| Dropdowns | `<DropdownMenu>` |
| Navigation | `<NavigationMenu>` |
| Tables | `<Table>` |
| Tooltips | `<Tooltip>` |

## Import Pattern

```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
```

## Styling

- Use Tailwind CSS classes for customization
- Leverage built-in variants (e.g., `<Button variant="outline">`)
- Extend variants in component files when needed
- Follow shadcn's className composition patterns with `cn()` utility

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Component Examples](https://ui.shadcn.com/examples)
- Components are located in: `/components/ui/`

---

**Remember**: If you're about to create a UI component from scratch, check shadcn/ui first.
