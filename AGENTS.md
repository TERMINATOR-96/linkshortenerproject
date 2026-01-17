# Agent Instructions

This document provides AI/LLM coding assistants with project-specific guidelines and coding standards for the Link Shortener project.

## Overview

This is a Next.js 16 link shortener application built with modern web technologies. When contributing code to this project, agents must follow the established patterns and conventions documented in this file and the referenced documentation.

## Core Principles

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

## Important Commands

```bash
npm run dev      # Start development server
npm run build    # Build production bundle
npm run lint     # Run ESLint
```

**Last Updated**: January 15, 2026
