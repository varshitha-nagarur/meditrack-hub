# MediTrack

**Medicines you need. Stock you can trust.**

Frontend scaffold for a pharmacy e-commerce + pharmacy-management portal. UI only —
all data is mock/static and every backend touchpoint is marked with a `TODO`.

> Router note: this scaffold uses **TanStack Router file-based routing** (`src/routes/`).
> All layouts and page bodies are plain React, so porting to `react-router-dom` locally
> only means rewriting the route registration files.

---

## Run locally

```bash
bun install      # or: npm install
bun run dev      # or: npm run dev   -> http://localhost:8080
bun run build    # production build
```

---

## Project structure

```
src/
  assets/                      hero + product images
  components/
    common/                    Button, Input, Select, Modal, ConfirmationDialog,
                               DataTable, Pagination, SearchBar, StatCard,
                               SectionHeading, StatusBadge, StockBadge,
                               ExpiryBadge, EmptyState, LoadingState,
                               Navbar, Footer
    customer/                  MedicineCard, CategoryCard, OrderCard, OrderTimeline
    admin/                     Sidebar
    inventory/                 InventoryTable
    prescription/              PrescriptionCard
  layouts/                     CustomerLayout.tsx, AdminLayout.tsx
  routes/                      pages (file-based routing, see below)
  data/                        medicines.ts, users.ts, orders.ts,
                               prescriptions.ts, inventory.ts   (mock data)
  types/                       medicine.ts, user.ts, order.ts,
                               prescription.ts, inventory.ts    (interfaces)
  services/api.ts              placeholder service layer (all TODOs live here)
  hooks/useStore.tsx           in-memory cart + wishlist context
  utils/                       format.ts, cart.ts, inventory-rules.ts,
                               status-tones.ts                  (business rules)
  styles.css                   design tokens (teal/blue primary, semantic colors)
```

### Routes

Customer: `/`, `/medicines`, `/medicines/:id`, `/cart`, `/wishlist`,
`/prescriptions`, `/checkout`, `/orders`, `/orders/:id`, `/profile`,
`/login`, `/signup`

Admin (separate `AdminLayout` + sidebar): `/admin`, `/admin/inventory`,
`/admin/inventory/scan`, `/admin/orders`, `/admin/prescriptions`,
`/admin/customers`, `/admin/supply-chain`, `/admin/audit-logs`,
`/admin/users`, `/admin/settings`

---

## Where to implement backend work

| Feature | Implement in | Currently |
| --- | --- | --- |
| API / database access | `src/services/api.ts` | returns mock arrays from `src/data/*` |
| Authentication + sessions | `src/routes/login.tsx`, `signup.tsx`, `services/api.ts` | mock role buttons, no session |
| Role-based access control | `src/data/users.ts` (`roleDefinitions`) + a route guard | UI display only |
| Payments | `src/routes/checkout.tsx` step 4 + `services/api.ts` | method picker, no charge |
| Inventory logic | `src/utils/inventory-rules.ts` (reorder ≤ 10, max 100, expiry window) | pure functions over mock batches |
| Real-time stock sync | `services/api.ts` inventory functions | static values |
| Cart stock reservation (TTL) | `src/hooks/useStore.tsx` + `services/api.ts` | visual "stock hold" placeholder |
| Prescription upload + verification | `src/routes/prescriptions.tsx`, `admin.prescriptions.tsx` | mock statuses |
| QR / RFID scanning | `src/routes/admin.inventory.scan.tsx` | mock scan result payload |
| Audit logging (append-only) | `src/data/inventory.ts` audit records + `services/api.ts` | static records |
| CRM / refill + co-purchase rules | `src/routes/profile.tsx`, `src/data/orders.ts` | mock rules, no AI |

Keep business rules in `src/utils/`, data fetching in `src/services/api.ts`, and
components presentational — that split is what makes each feature above
implementable independently.

---

This project is an academic prototype. It shows product information only and
provides no medical advice.
