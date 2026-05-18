# Inventory Management System — Docs

## Frontend Structure

```
frontend/src/
├── main.tsx                        # App entry — mounts QueryClient + RouterProvider
├── App.tsx                         # Unused (routing handled by TanStack Router)
├── index.css                       # Tailwind base + CSS variable theme tokens
│
├── routes/
│   ├── __root.tsx                  # Root route wrapper
│   ├── index.tsx                   # Redirects / → /dashboard or /login
│   ├── _auth.tsx                   # Auth layout route (redirects if already logged in)
│   ├── _auth.login.tsx             # /login page
│   ├── _auth.register.tsx          # /register page
│   ├── _dashboard.tsx              # Dashboard layout route (redirects if not logged in)
│   ├── _dashboard.dashboard.tsx    # /dashboard page — stat cards + low stock alerts
│   ├── _dashboard.products.tsx     # /products page — product table + create/edit modal
│   └── _dashboard.inventory.tsx    # /inventory page — inventory table + transaction modal
│
├── layouts/
│   ├── AuthLayout.tsx              # Centered card layout for login/register
│   └── DashboardLayout.tsx         # Sidebar + topbar shell for all dashboard pages
│
├── hooks/
│   ├── useAuth.ts                  # useLogin, useRegister, useLogout mutations
│   ├── useProducts.ts              # useProducts, useProduct, useCreateProduct, useUpdateProduct
│   └── useInventory.ts             # useInventory, useLowStock, useInventoryTransaction
│
├── services/
│   ├── auth.service.ts             # Raw axios calls for /api/auth/*
│   ├── product.service.ts          # Raw axios calls for /api/products
│   ├── inventory.service.ts        # Raw axios calls for /api/inventory
│   ├── supplier.service.ts         # Raw axios calls for /api/suppliers
│   └── analytics.service.ts        # Raw axios calls for /api/analytics/dashboard
│
├── store/
│   └── authStore.ts                # Zustand store — accessToken, refreshToken, username, role
│
├── lib/
│   ├── axios.ts                    # Axios instance — attaches JWT, handles 401 auto-refresh
│   └── utils.ts                    # cn() helper (clsx + tailwind-merge)
│
└── types/
    └── index.ts                    # TypeScript interfaces for all API shapes
```

---

## Backend Structure

```
backend/src/main/java/com/inventory/inventorymanagementsystem/
├── InventoryManagementSystemApplication.java   # Spring Boot entry point
│
├── config/
│   ├── SecurityConfig.java         # JWT filter chain, BCrypt bean, stateless sessions
│   └── CorsConfig.java             # Allows http://localhost:5173
│
├── security/
│   ├── JwtUtils.java               # Generate + validate access/refresh tokens
│   ├── JwtAuthFilter.java          # OncePerRequestFilter — reads Bearer token, sets SecurityContext
│   └── UserDetailsServiceImpl.java # Loads user from DB for Spring Security
│
├── entity/
│   ├── User.java                   # users table
│   ├── Role.java                   # roles table (ADMIN, MANAGER, STAFF)
│   ├── Category.java               # categories table
│   ├── Product.java                # products table
│   ├── Warehouse.java              # warehouses table
│   ├── Inventory.java              # inventory table (product + warehouse + quantity)
│   ├── InventoryTransaction.java   # inventory_transactions table (IN/OUT/ADJUST)
│   ├── Supplier.java               # suppliers table
│   ├── PurchaseOrder.java          # purchase_orders table
│   ├── SalesOrder.java             # sales_orders table
│   └── AuditLog.java               # audit_logs table
│
├── dto/
│   ├── auth/
│   │   ├── LoginRequest.java       # { username, password }
│   │   ├── RegisterRequest.java    # { username, password, email }
│   │   ├── RefreshRequest.java     # { refreshToken }
│   │   └── AuthResponse.java       # { accessToken, refreshToken, username, role }
│   ├── product/
│   │   ├── ProductRequest.java     # { name, sku, barcode, categoryId, price, status }
│   │   └── ProductResponse.java    # { id, name, sku, categoryName, price, status, createdAt }
│   └── inventory/
│       └── TransactionRequest.java # { productId, warehouseId, type, quantity }
│
├── repository/
│   ├── UserRepository.java
│   ├── RoleRepository.java
│   ├── CategoryRepository.java
│   ├── ProductRepository.java
│   ├── WarehouseRepository.java
│   ├── InventoryRepository.java        # includes findLowStockItems() query
│   ├── InventoryTransactionRepository.java
│   ├── SupplierRepository.java
│   ├── SalesOrderRepository.java
│   └── PurchaseOrderRepository.java
│
├── service/
│   ├── AuthService.java            # interface
│   ├── ProductService.java         # interface
│   └── impl/
│       ├── AuthServiceImpl.java    # login/register/refresh logic
│       └── ProductServiceImpl.java # CRUD + DTO mapping
│
├── controller/
│   ├── AuthController.java         # /api/auth/*
│   └── ProductController.java      # /api/products/*
│
└── exception/
    ├── GlobalExceptionHandler.java  # @RestControllerAdvice — standardized error responses
    ├── ResourceNotFoundException.java
    └── BadRequestException.java
```

---

## API Connections

| Frontend call | HTTP | Backend endpoint | What it does |
|---|---|---|---|
| `authService.login()` | POST | `/api/auth/login` | Verifies credentials, returns JWT access + refresh tokens |
| `authService.register()` | POST | `/api/auth/register` | Creates user with STAFF role, returns tokens |
| `authService.refresh()` | POST | `/api/auth/refresh` | Issues new token pair from a valid refresh token |
| `productService.getAll()` | GET | `/api/products` | Returns all products as DTOs |
| `productService.getById(id)` | GET | `/api/products/{id}` | Returns single product by ID |
| `productService.create()` | POST | `/api/products` | Creates a new product |
| `productService.update(id)` | PUT | `/api/products/{id}` | Updates an existing product |
| `inventoryService.getAll()` | GET | `/api/inventory` | Returns all inventory records |
| `inventoryService.getLowStock()` | GET | `/api/inventory/low-stock` | Returns items where quantity ≤ threshold |
| `inventoryService.createTransaction()` | POST | `/api/inventory/transaction` | Records a stock IN / OUT / ADJUST movement |
| `supplierService.getAll()` | GET | `/api/suppliers` | Returns all suppliers |
| `supplierService.create()` | POST | `/api/suppliers` | Creates a new supplier |
| `analyticsService.getDashboard()` | GET | `/api/analytics/dashboard` | Returns stat card totals for the dashboard |

---

## Auth Flow

```
Login form → POST /api/auth/login
           ← { accessToken, refreshToken, username, role }
                ↓
         Zustand authStore (persists refreshToken to localStorage)
                ↓
         axios.ts interceptor attaches: Authorization: Bearer <accessToken>
                ↓
         On 401 → POST /api/auth/refresh → new tokens → retry original request
```
