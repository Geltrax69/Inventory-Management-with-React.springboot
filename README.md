# Inventory Management System (Spring Boot + React)

> ## Status: 🟡 In Progress
>
> <progress value="85" max="100"></progress>
> **Progress: 85%** — Full-stack architecture complete; build not verified in this environment

<p align="center">
  <img src="banner.webp" alt="Inventory Management banner" width="100%" />
</p>

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4-6DB33F?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-4169E1?style=flat&logo=postgresql)](https://www.postgresql.org/)

## What it is

A full-stack inventory management web app: a Spring Boot 4 backend (Java 21, JWT auth, PostgreSQL via JPA) with a React 19 + TypeScript + Vite frontend. Covers the real domain — products, categories, warehouses, inventory levels, stock transactions, purchase orders, sales orders, suppliers, users/roles, and an audit log. Dashboard with stat cards, low-stock alerts, and charts.

## What works (verified)

- ✅ Backend domain model complete: 10 entities (Product, Category, Inventory, InventoryTransaction, Warehouse, Supplier, PurchaseOrder, SalesOrder, User, Role, AuditLog) (verified by code read)
- ✅ JWT auth flow — AuthController with login/register/refresh DTOs, SecurityConfig (verified by code read)
- ✅ Frontend routes complete: login, register, dashboard, products, inventory — with TanStack Query hooks (`useProducts`, `useInventory`, `useAuth`) (verified by code read)
- ✅ API docs via Springdoc OpenAPI, CORS config, global exception handling (verified by code read)
- ⚠️ Build **not** verified here — no JDK in this environment, so `./mvnw` and `tsc` builds were not run

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Java 21, Spring Boot 4, Spring Security (JWT), Spring Data JPA |
| Database | PostgreSQL |
| API docs | Springdoc OpenAPI |
| Frontend | React 19, TypeScript, Vite |
| Frontend data | TanStack Router, TanStack Query, TanStack Table, Axios, Zustand |
| Forms / UI | React Hook Form, Tailwind CSS, Recharts, lucide-react |
| Build | Maven (`mvnw`), pnpm (frontend lockfile) |

## How to run

Prerequisites: Java 21, Maven, PostgreSQL, Node 20+, pnpm.

```bash
# 1. Start PostgreSQL and create the database (see backend/src/main/resources/application.properties)

# 2. Backend
cd backend
./mvnw spring-boot:run        # API → http://localhost:8080

# 3. Frontend (new terminal)
cd frontend
pnpm install
pnpm dev                      # UI → http://localhost:5173
```

## Screenshots

No screenshots in the repo. The banner above is the visual.

## What you can add more

- [ ] Verify the full build (`./mvnw package`, `pnpm build`) and record CI — no GitHub Actions workflow exists
- [ ] Seed data / demo mode so the dashboard isn't empty on first run
- [ ] The `docs.md` is good — expand it with API endpoint examples
- [ ] Pagination and search on the products/inventory tables (TanStack Table supports it)
- [ ] Role-based UI gating to match the backend's User/Role model
- [ ] Tests — backend has a `src/test` folder; frontend has none

## Project structure

```
backend/                        # Spring Boot 4 (Java 21)
└── src/main/java/com/inventory/inventorymanagementsystem/
    ├── controller/             # AuthController, ProductController…
    ├── entity/                 # Product, Warehouse, User, AuditLog…
    ├── dto/                    # auth/, product/, inventory/ DTOs
    ├── repository/             # Spring Data JPA repositories
    ├── config/                 # SecurityConfig, CorsConfig
    └── exception/              # GlobalExceptionHandler
frontend/                       # React 19 + TS + Vite
└── src/
    ├── routes/                 # TanStack Router pages (login, dashboard, products…)
    ├── hooks/                  # useAuth, useProducts, useInventory
    ├── layouts/                # AuthLayout, DashboardLayout
    └── lib/                    # API client, utils
docs.md                         # Architecture documentation
```

---
*README written after code audit on 2026-10-08. Backend build not verified (no JDK in audit environment).*
