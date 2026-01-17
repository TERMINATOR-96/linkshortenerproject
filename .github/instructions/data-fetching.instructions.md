---
description: Read this file to understand how to fetch data for the project.
---

# Data Fetching Guidelines
This document outlines the best practices for data fetching in our Next.js project. Adhering to these guidelines will ensure optimal performance, maintainability, and scalability.

## 1. Use Server Components for Data Fetching
In Next.js, ALWAYS prefer Server Components for data fetching. NEVER use Client Components to fetch data.

## 2. Data Fetching Methods
ALWAYS use the helper functions in the /data directory for data fetching. NEVER fetch data directly in components.

All helper functions in the /data directory should use Drizzle ORM to interact with the PostgreSQL database.  