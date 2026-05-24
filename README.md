# Inventory Management System

An inventory management web app with a Spring Boot backend and a React + Vite frontend. The project uses JWT authentication, PostgreSQL persistence, and a dashboard-style interface for managing products and inventory-related workflows.

## What I Used

### Backend

- Java 21
- Spring Boot 4
- Spring Security for authentication and authorization
- JWT for access and refresh token handling
- Spring Data JPA for database access
- PostgreSQL as the database
- Springdoc OpenAPI for API documentation
- Lombok to reduce boilerplate

### Frontend

- React 19
- Vite
- TypeScript
- TanStack Router for routing
- TanStack Query for server-state management
- TanStack Table for tabular data
- Axios for API calls
- Zustand for auth state persistence
- React Hook Form for forms
- Tailwind CSS for styling
- Recharts for charts and analytics views
- Lucide React for icons

## Features

- JWT-based login, registration, and token refresh flow
- Secure backend with role-aware auth setup
- Product management with create, read, and update flows
- Dashboard layout with sidebar navigation
- Frontend service layer for products, auth, inventory, suppliers, and analytics
- PostgreSQL-backed persistence with JPA entities and repositories
- Swagger/OpenAPI support for API exploration

## Project Structure

```text
Inventory-Management-System/
├── backend/        # Spring Boot API
├── frontend/       # React + Vite client
├── docker-compose.yml
└── docs.md         # Internal project notes
```

## Backend Overview

The backend is organized around Spring Boot modules for configuration, security, controllers, services, repositories, DTOs, entities, and exception handling. The implemented API currently includes:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh`
- `GET /api/products`
- `GET /api/products/{id}`
- `POST /api/products`
- `PUT /api/products/{id}`

API documentation is available through Springdoc at:

- `/swagger-ui.html`
- `/api-docs`

## Frontend Overview

The frontend uses TanStack Router with dedicated auth and dashboard layouts. It includes pages and components for:

- Login and registration
- Dashboard overview
- Product management
- Inventory views
- Supplier section navigation

It also includes an Axios wrapper that attaches the access token and refreshes it automatically when a request returns `401`.

## Run Locally

### Prerequisites

- Node.js 20+ and pnpm
- Java 21
- Docker and Docker Compose

### 1. Start PostgreSQL

From the repository root:

```bash
docker compose up -d postgres
```

The backend is configured to connect to PostgreSQL at `jdbc:postgresql://localhost:5432/postgres` with the default `postgres / postgres` credentials.

### 2. Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

### 3. Start the Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

The frontend runs on the default Vite port, usually `http://localhost:5173`.

## Docker Option

The root `docker-compose.yml` starts PostgreSQL and the backend service together.

```bash
docker compose up --build
```

## Configuration

Backend configuration is in `backend/src/main/resources/application.properties`. Key settings include:

- PostgreSQL connection details
- JPA auto update mode
- JWT secret and token expiration values
- Springdoc paths

## Notes

- The backend currently exposes auth and product APIs.
- The frontend already includes inventory, supplier, and analytics service layers, so the UI and API contracts are prepared for future expansion.
- The project uses a separate frontend and backend codebase, which makes it easier to evolve the UI and API independently.
