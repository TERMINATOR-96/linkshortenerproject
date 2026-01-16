# Agent Instructions

This document provides AI/LLM coding assistants with project-specific guidelines and coding standards for the Link Shortener project.

## Overview

This is a Next.js 16 link shortener application built with modern web technologies. When contributing code to this project, agents must follow the established patterns and conventions documented in this file and the referenced documentation.

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST

**BEFORE GENERATING ANY CODE, YOU MUST:**

1. **ALWAYS** read the relevant instruction file(s) from the `/docs` directory
2. **NEVER** write code based on assumptions or general knowledge alone
3. **VERIFY** that your implementation matches the documented patterns exactly

This is **NON-NEGOTIABLE**. The `/docs` directory contains specific implementation details, authentication flows, component patterns, and architectural decisions that MUST be followed. Skipping this step will result in code that doesn't match project standards.

## Quick Reference

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS 4
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **Package Manager**: npm

## Detailed Documentation

**🚨 MANDATORY READING:** All agent instructions are organized in the `/docs` directory for better maintainability. You **MUST ALWAYS** read the relevant .md file(s) **BEFORE** generating **ANY** code. This is not optional.

**Available Documentation:**

- **[Authentication](/docs/authentication.md)**: Clerk authentication patterns, protected routes, and modal sign-in/sign-up configuration
- **[UI Components](/docs/ui-components.md)**: shadcn/ui component usage, installation, and styling guidelines

**When in doubt, READ THE DOCS FIRST. When certain, READ THE DOCS ANYWAY.**

## Core Principles

### 0. Documentation First (MOST IMPORTANT)
- **READ `/docs` files BEFORE writing ANY code**
- Each `/docs` file contains critical patterns and standards specific to that domain
- Do NOT rely on general knowledge or assumptions—follow documented patterns exactly
- If a feature involves authentication, UI components, or any documented area, read that doc file FIRST
- This principle overrides all others—no code should be written without consulting relevant documentation

### 1. Type Safety First
- Always use TypeScript with strict mode enabled
- Never use `any` type; use `unknown` with type guards instead
- Define proper interfaces for all data structures
- Use type inference where appropriate but be explicit for public APIs

### 2. Server-First Architecture
- Default to Server Components in Next.js App Router
- Use Client Components (`'use client'`) only when necessary (interactivity, hooks, browser APIs)
- Keep server actions for data mutations
- Minimize client-side JavaScript bundle

### 3. Performance & Accessibility
- Optimize images with Next.js `<Image>` component
- Use semantic HTML elements
- Implement proper ARIA attributes where needed
- Follow responsive design patterns with mobile-first approach

### 4. Code Organization
- Keep components small and focused (Single Responsibility)
- Use composition over prop drilling
- Maintain clear separation between business logic and presentation
- Follow the established project structure

### 5. Routing & Middleware
- **NEVER use `middleware.ts`** - This is deprecated in Next.js 16 and later versions
- **ALWAYS use `proxy.ts`** instead for middleware-like functionality
- The `middleware.ts` pattern is no longer supported in this project's Next.js version
- All request interception and routing logic should be handled through `proxy.ts`

## Project Structure

```
linkshortenerproject/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Clerk provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── db/                     # Database layer
│   ├── index.ts           # Database connection
│   └── schema.ts          # Drizzle ORM schema
├── lib/                    # Shared utilities
│   └── utils.ts           # Utility functions (e.g., cn())
├── docs/                   # Agent instruction files
└── public/                # Static assets
```

## Development Workflow

When making changes:

1. **READ DOCUMENTATION FIRST**: **MANDATORY—** Before writing a single line of code, read ALL relevant files in `/docs` directory that relate to your task. This is the FIRST and MOST IMPORTANT step.
2. **Understand Context**: Study the documentation thoroughly and identify the patterns you must follow
3. **Follow Patterns**: Use existing code as reference for consistency
4. **Type Everything**: Ensure all new code has proper TypeScript types
5. **Test Locally**: Verify changes work in development environment
6. **Respect Conventions**: Adhere to naming, structure, and style guidelines

## Important Commands

```bash
npm run dev      # Start development server
npm run build    # Build production bundle
npm run lint     # Run ESLint
```

## Getting Help

If you encounter ambiguity:
1. Check the detailed docs in `/docs` directory
2. Look for similar patterns in existing codebase
3. Refer to official documentation of the technology in question
4. Prioritize consistency with existing patterns

---

**Last Updated**: January 15, 2026
