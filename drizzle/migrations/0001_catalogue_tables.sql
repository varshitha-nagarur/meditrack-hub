-- ============ MediTrack migration 2: catalogue ============

create table public.categories (
  id text primary key,
  name text not null,
  description text not null default '',
  icon text not null default 'Pill',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.medicines (
  id text primary key,
  name text not null,
  composition text not null,
  manufacturer text not null,
  price numeric(10,2) not null check (price >= 0),
  mrp numeric(10,2) not null check (mrp >= 0),
  pack_size text not null default '',
  category_id text not null references public.categories(id) on update cascade,
  image_url text,
  prescription_required boolean not null default false,
  storage_info text not null default 'Store below 25°C in a dry place, away from direct sunlight.',
  usage_info text not null default 'Use strictly as directed by a registered medical practitioner.',
  return_policy text not null default 'Returns accepted within 7 days for sealed, unopened packs with the original invoice.',
  rating numeric(2,1) not null default 0,
  tags text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index medicines_category_idx on public.medicines (category_id);
create index medicines_name_idx on public.medicines (name);

-- Stock lives on batches. Orders decrement batches FEFO (first expiry, first out).
create table public.medicine_batches (
  id uuid primary key default gen_random_uuid(),
  medicine_id text not null references public.medicines(id) on delete cascade,
  batch_number text not null,
  quantity integer not null default 0 check (quantity >= 0),
  reorder_level integer not null default 10 check (reorder_level >= 0),
  maximum_level integer not null default 100 check (maximum_level >= 0),
  manufacturing_date date,
  expiry_date date,
  supplier text not null default '',
  location text not null default '',
  created_at timestamptz not null default now(),
  unique (medicine_id, batch_number)
);
create index medicine_batches_medicine_idx on public.medicine_batches (medicine_id);
create index medicine_batches_expiry_idx on public.medicine_batches (expiry_date);

create table public.replenishment_requests (
  id uuid primary key default gen_random_uuid(),
  medicine_id text not null references public.medicines(id) on delete cascade,
  current_quantity integer not null default 0,
  target_quantity integer not null default 100 check (target_quantity > 0),
  trigger_type text not null check (trigger_type in ('low-quantity', 'expiry-risk')),
  expiry_date date,
  supplier text not null default '',
  status text not null default 'pending' check (status in ('pending', 'approved', 'ordered', 'received')),
  raised_on date not null default current_date,
  created_by uuid,
  created_at timestamptz not null default now()
);
create index replenishment_medicine_idx on public.replenishment_requests (medicine_id);

-- ============ Grants & RLS ============

grant select on public.categories to anon, authenticated;
grant select on public.medicines to anon, authenticated;
grant all on public.categories to service_role;
grant all on public.medicines to service_role;
grant select, insert, update, delete on public.medicine_batches to authenticated;
grant all on public.medicine_batches to service_role;
grant select, insert, update, delete on public.replenishment_requests to authenticated;
grant all on public.replenishment_requests to service_role;

alter table public.categories enable row level security;
alter table public.medicines enable row level security;
alter table public.medicine_batches enable row level security;
alter table public.replenishment_requests enable row level security;

create policy "Categories are publicly readable"
  on public.categories for select to anon, authenticated using (true);
create policy "Admins can manage categories"
  on public.categories for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "Active medicines are publicly readable"
  on public.medicines for select to anon, authenticated using (is_active = true);
create policy "Admins can read all medicines"
  on public.medicines for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can manage medicines"
  on public.medicines for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "Staff can read batches"
  on public.medicine_batches for select to authenticated using (public.is_staff(auth.uid()));
create policy "Admins and inventory managers can manage batches"
  on public.medicine_batches for all to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'inventory-manager'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'inventory-manager'));

create policy "Staff can read replenishment requests"
  on public.replenishment_requests for select to authenticated using (public.is_staff(auth.uid()));
create policy "Admins and inventory managers can manage replenishment"
  on public.replenishment_requests for all to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'inventory-manager'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'inventory-manager'));

-- ============ Seed categories ============

insert into public.categories (id, name, description, icon, sort_order) values
  ('pain-relief', 'Pain Relief', 'Analgesics and anti-inflammatory medicines', 'Thermometer', 1),
  ('antibiotics', 'Antibiotics', 'Prescription-only antibacterial medicines', 'ShieldPlus', 2),
  ('diabetes-care', 'Diabetes Care', 'Oral anti-diabetics and monitoring support', 'Droplet', 3),
  ('cardiac-care', 'Cardiac Care', 'Blood pressure and cholesterol management', 'HeartPulse', 4),
  ('vitamins-supplements', 'Vitamins & Supplements', 'Daily nutrition and immunity support', 'Pill', 5),
  ('cold-cough', 'Cold & Cough', 'Relief for seasonal cold, cough and allergies', 'Wind', 6),
  ('first-aid', 'First Aid', 'Wound care, antiseptics and daily essentials', 'BriefcaseMedical', 7);

-- ============ Seed medicines ============

insert into public.medicines (id, name, composition, manufacturer, price, mrp, pack_size, category_id, prescription_required, rating, tags) values
  ('med-001', 'Dolo 650 Tablet', 'Paracetamol 650 mg', 'Micro Labs', 31.50, 37.17, 'Strip of 15 tablets', 'pain-relief', false, 4.7, '{popular,frequently-purchased,refill}'),
  ('med-002', 'Combiflam Tablet', 'Ibuprofen 400 mg + Paracetamol 325 mg', 'Sanofi India', 44.20, 52.16, 'Strip of 20 tablets', 'pain-relief', false, 4.5, '{popular}'),
  ('med-003', 'Volini Pain Relief Gel', 'Diclofenac Diethylamine 1.16% w/w', 'Sun Pharma', 152.00, 179.36, 'Tube of 30 g', 'pain-relief', false, 4.3, '{essential}'),
  ('med-004', 'Meftal Spas Tablet', 'Dicyclomine 20 mg + Mefenamic Acid 250 mg', 'Blue Cross Labs', 62.50, 73.75, 'Strip of 10 tablets', 'pain-relief', true, 4.2, '{}'),
  ('med-005', 'Saridon Advance Tablet', 'Paracetamol 500 mg + Caffeine 30 mg', 'Bayer', 38.00, 44.84, 'Strip of 10 tablets', 'pain-relief', false, 4.1, '{frequently-purchased}'),
  ('med-006', 'Zerodol SP Tablet', 'Aceclofenac 100 mg + Paracetamol 325 mg + Serratiopeptidase 15 mg', 'Ipca Labs', 118.00, 139.24, 'Strip of 10 tablets', 'pain-relief', true, 4.4, '{}'),
  ('med-007', 'Augmentin 625 Duo Tablet', 'Amoxicillin 500 mg + Clavulanic Acid 125 mg', 'GSK India', 224.50, 264.91, 'Strip of 10 tablets', 'antibiotics', true, 4.6, '{popular}'),
  ('med-008', 'Azithral 500 Tablet', 'Azithromycin 500 mg', 'Alembic Pharma', 132.00, 155.76, 'Strip of 5 tablets', 'antibiotics', true, 4.5, '{}'),
  ('med-009', 'Taxim-O 200 Tablet', 'Cefixime 200 mg', 'Alkem Labs', 176.00, 207.68, 'Strip of 10 tablets', 'antibiotics', true, 4.2, '{}'),
  ('med-010', 'Ciplox 500 Tablet', 'Ciprofloxacin 500 mg', 'Cipla', 96.00, 113.28, 'Strip of 10 tablets', 'antibiotics', true, 4.0, '{}'),
  ('med-011', 'Metrogyl 400 Tablet', 'Metronidazole 400 mg', 'J.B. Chemicals', 42.00, 49.56, 'Strip of 15 tablets', 'antibiotics', true, 4.1, '{}'),
  ('med-012', 'Glycomet 500 SR Tablet', 'Metformin 500 mg (SR)', 'USV Pvt Ltd', 48.60, 57.35, 'Strip of 20 tablets', 'diabetes-care', true, 4.6, '{refill,frequently-purchased}'),
  ('med-013', 'Januvia 50 Tablet', 'Sitagliptin 50 mg', 'MSD Pharma', 412.00, 486.16, 'Strip of 15 tablets', 'diabetes-care', true, 4.4, '{}'),
  ('med-014', 'Accu-Chek Active Test Strips', 'Blood glucose test strips (50 count)', 'Roche Diagnostics', 1150.00, 1357.00, 'Box of 50 strips', 'diabetes-care', false, 4.5, '{essential,refill}'),
  ('med-015', 'Zoryl 2 Tablet', 'Glimepiride 2 mg', 'Intas Pharma', 118.00, 139.24, 'Strip of 10 tablets', 'diabetes-care', true, 4.2, '{}'),
  ('med-016', 'Telma 40 Tablet', 'Telmisartan 40 mg', 'Glenmark Pharma', 148.00, 174.64, 'Strip of 15 tablets', 'cardiac-care', true, 4.7, '{refill,frequently-purchased}'),
  ('med-017', 'Ecosprin 75 Tablet', 'Aspirin 75 mg', 'USV Pvt Ltd', 12.40, 14.63, 'Strip of 14 tablets', 'cardiac-care', true, 4.5, '{refill}'),
  ('med-018', 'Rosuvas 10 Tablet', 'Rosuvastatin 10 mg', 'Sun Pharma', 186.00, 219.48, 'Strip of 10 tablets', 'cardiac-care', true, 4.4, '{}'),
  ('med-019', 'Amlodac 5 Tablet', 'Amlodipine 5 mg', 'Zydus Cadila', 34.00, 40.12, 'Strip of 15 tablets', 'cardiac-care', true, 4.3, '{}'),
  ('med-020', 'Zincovit Tablet', 'Multivitamin + Multimineral with Zinc', 'Apex Labs', 108.00, 127.44, 'Strip of 15 tablets', 'vitamins-supplements', false, 4.6, '{popular,essential}'),
  ('med-021', 'Shelcal 500 Tablet', 'Calcium Carbonate 500 mg + Vitamin D3 250 IU', 'Torrent Pharma', 132.00, 155.76, 'Strip of 15 tablets', 'vitamins-supplements', false, 4.5, '{refill}'),
  ('med-022', 'Neurobion Forte Tablet', 'Vitamin B-Complex with B12', 'Merck Ltd', 42.00, 49.56, 'Strip of 30 tablets', 'vitamins-supplements', false, 4.4, '{frequently-purchased}'),
  ('med-023', 'Limcee 500 Chewable Tablet', 'Vitamin C (Ascorbic Acid) 500 mg', 'Abbott India', 28.00, 33.04, 'Strip of 15 tablets', 'vitamins-supplements', false, 4.3, '{popular}'),
  ('med-024', 'Uprise D3 60K Capsule', 'Cholecalciferol 60000 IU', 'Alkem Labs', 96.00, 113.28, 'Strip of 4 capsules', 'vitamins-supplements', false, 4.5, '{refill}'),
  ('med-025', 'Ascoril LS Syrup', 'Ambroxol + Levosalbutamol + Guaifenesin', 'Glenmark Pharma', 138.00, 162.84, 'Bottle of 100 ml', 'cold-cough', true, 4.2, '{}'),
  ('med-026', 'Cetzine 10 Tablet', 'Cetirizine 10 mg', 'Dr. Reddy''s Labs', 24.50, 28.91, 'Strip of 10 tablets', 'cold-cough', false, 4.5, '{popular,frequently-purchased}'),
  ('med-027', 'Otrivin Nasal Spray', 'Xylometazoline 0.1% w/v', 'Haleon India', 128.00, 151.04, 'Bottle of 10 ml', 'cold-cough', false, 4.4, '{essential}'),
  ('med-028', 'Dettol Antiseptic Liquid', 'Chloroxylenol 4.8% w/v', 'Reckitt India', 165.00, 194.70, 'Bottle of 250 ml', 'first-aid', false, 4.7, '{essential,popular}'),
  ('med-029', 'Hansaplast Washproof Strips', 'Sterile adhesive bandages (20 count)', 'Beiersdorf India', 55.00, 64.90, 'Pack of 20 strips', 'first-aid', false, 4.6, '{essential}'),
  ('med-030', 'Betadine Ointment', 'Povidone Iodine 5% w/w', 'Win-Medicare', 142.00, 167.56, 'Tube of 20 g', 'first-aid', false, 4.5, '{essential}');

-- ============ Seed batches ============

insert into public.medicine_batches (medicine_id, batch_number, quantity, manufacturing_date, expiry_date, supplier, location) values
  ('med-001', 'DL650-A21', 240, '2025-09-01', '2027-08-31', 'MediSupply Distributors', 'Rack A1'),
  ('med-001', 'DL650-B04', 60, '2024-10-01', '2026-10-31', 'MediSupply Distributors', 'Rack A1'),
  ('med-004', 'MFS-330', 8, '2024-12-01', '2026-11-30', 'Blue Cross Depot', 'Rack B2'),
  ('med-007', 'AUG-4412', 88, '2025-03-01', '2027-02-28', 'GSK Regional Depot', 'Rack C1'),
  ('med-009', 'TXO-108', 9, '2024-10-01', '2026-09-30', 'Alkem Depot', 'Rack C2'),
  ('med-011', 'MTG-019', 0, '2024-09-01', '2026-08-31', 'JB Chem Depot', 'Rack C3'),
  ('med-012', 'GLY-881', 210, '2025-08-01', '2027-07-31', 'USV Regional Depot', 'Rack D1'),
  ('med-015', 'ZRY-441', 7, '2024-11-01', '2026-10-31', 'Intas Depot', 'Rack D2'),
  ('med-016', 'TLM-702', 164, '2025-11-01', '2027-11-30', 'Glenmark Depot', 'Rack E1'),
  ('med-019', 'AML-925', 10, '2024-12-01', '2026-12-31', 'Zydus Depot', 'Rack E2'),
  ('med-024', 'UPD-512', 6, '2024-09-01', '2026-09-30', 'Alkem Depot', 'Rack F1'),
  ('med-030', 'BTD-604', 9, '2024-10-01', '2026-10-31', 'Win-Medicare Depot', 'Rack F2'),
  ('med-026', 'CTZ-909', 275, '2025-06-01', '2027-06-30', 'Dr. Reddy''s Depot', 'Rack G1'),
  ('med-028', 'DTL-880', 120, '2026-04-01', '2028-04-30', 'Reckitt Distributor', 'Rack G2');

-- ============ Seed replenishment requests ============

insert into public.replenishment_requests (medicine_id, current_quantity, target_quantity, trigger_type, expiry_date, supplier, status, raised_on) values
  ('med-011', 0, 100, 'low-quantity', '2026-08-31', 'JB Chem Depot', 'pending', '2026-09-01'),
  ('med-024', 6, 100, 'low-quantity', '2026-09-30', 'Alkem Depot', 'approved', '2026-08-30'),
  ('med-009', 9, 100, 'expiry-risk', '2026-09-30', 'Alkem Depot', 'ordered', '2026-08-28'),
  ('med-015', 7, 100, 'low-quantity', '2026-10-31', 'Intas Depot', 'pending', '2026-09-01'),
  ('med-030', 9, 100, 'expiry-risk', '2026-10-31', 'Win-Medicare Depot', 'received', '2026-08-20');
