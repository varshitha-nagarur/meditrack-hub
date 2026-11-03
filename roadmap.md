# MediTrack backend build — roadmap

Source brief: uploaded audit request (Phases 1–4). Supabase was absent; Lovable Cloud is now connected.

## Phase 1 — Audit ✅
- No Supabase existed: no client, no env vars, no integrations dir. All data mock (`src/data/*` via `src/services/api.ts`), auth/cart/orders/inventory/payments/scanning all UI-only.
- Now connected: Lovable Cloud (integration generated `src/integrations/supabase/*`, bearer middleware in `src/start.ts`).

## Phase 2 — Backend implementation
- [x] Enable email/password auth; configure Google + Lovable social sign-in; create private `prescriptions` storage bucket (10MB).
- [ ] Migration 1: roles & profiles — `app_role` enum, `user_roles` + `has_role()`, `profiles` + signup trigger, `addresses`.
- [ ] Migration 2: catalogue — `categories`, `medicines`, `medicine_batches` (FEFO stock), `replenishment_requests`; seed 7 categories / 30 medicines / 14 batches.
- [ ] Migration 3: commerce — `cart_items`, `wishlist_items`, `orders`, `order_items`, `place_order()` RPC (transactional stock decrement), order status rules.
- [ ] Migration 4: prescriptions & audit — `prescriptions`, `audit_logs`, `log_audit()` RPC, storage RLS policies, realtime publication for inventory.
- [ ] Seed demo auth users (customer + pharmacist + inventory-manager + admin) and demo orders/prescriptions.
- [ ] Server functions: catalogue (public), auth, cart/wishlist, orders, prescriptions, inventory, admin CRUD + dashboard stats.
- [ ] Rewire frontend: login/signup/logout real, navbar session state, hybrid guest/DB cart + wishlist, admin gate (`_authenticated` + staff role), page data from DB.
- [ ] Payments: keep mock UI; report required provider config (Razorpay/Stripe) — no simulated success claims.

## Phase 3 — Preserve UI ✅ constraint
- Keep layouts, styling, components, routes and copy. Swap data sources only.

## Phase 4 — Test & report
- [ ] Playwright: signup → login → logout; customer order flow; staff/admin pages; RLS checks via SQL.
- [ ] Security scan (run_security_scan + deep scan).
- [ ] Final report per brief (implemented / added / schema / env vars / remaining manual setup / incomplete).
