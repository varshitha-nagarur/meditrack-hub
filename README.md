# MediTrack Hub

I am building an academic project called MediTrack.

IMPORTANT:

I do NOT want you to build the complete application.

I only want you to generate the FRONTEND PROJECT OUTLINE / SCAFFOLD and clean starter code.

I will continue development myself in VS Code.

Do not spend effort implementing backend logic, authentication, payment processing, database operations, APIs, real prescription verification, real QR/RFID scanning, or complex business logic.

The goal is to generate a clean, professional frontend foundation that I can download/sync to GitHub and continue coding locally.

==================================================

PROJECT

==================================================

Name:

MediTrack

Tagline:

"Medicines you need. Stock you can trust."

MediTrack is a secure pharmacy e-commerce and pharmacy-management portal.

The system contains:

1. Customer pharmacy store

2. Medicine catalogue

3. Medicine details

4. Cart

5. Wishlist

6. Prescription verification

7. Checkout

8. Mock payment UI

9. Orders

10. Customer profile / CRM

11. Refill suggestions

12. Pharmacy admin dashboard

13. Inventory management

14. Batch and expiry tracking

15. Supply-chain management

16. Prescription management

17. Customer management

18. Audit logs

19. Role-based UI

==================================================

TECH STACK

==================================================

Use:

- React

- TypeScript

- Vite

- Tailwind CSS

- React Router

- Lucide icons

Use reusable components.

Keep the code clean and beginner-friendly.

Avoid unnecessary libraries.

Use mock/static data for now.

Do not create a real backend.

Do not require a database.

Do not implement real payment processing.

Do not implement real authentication.

Do not implement real prescription verification.

==================================================

FOLDER STRUCTURE

==================================================

Create a clean structure similar to:

src/

  assets/

  components/

    common/

    customer/

    admin/

    inventory/

    prescription/

    checkout/

  layouts/

    CustomerLayout.tsx

    AdminLayout.tsx

  pages/

    customer/

    admin/

    auth/

  data/

    medicines.ts

    users.ts

    orders.ts

    prescriptions.ts

    inventory.ts

  types/

    medicine.ts

    user.ts

    order.ts

    prescription.ts

    inventory.ts

  services/

    api.ts

  hooks/

  utils/

  App.tsx

  main.tsx

  index.css

Create placeholder service functions where backend functionality will eventually go.

Example:

services/api.ts

with TODO comments such as:

// TODO: Replace mock data with backend API

// TODO: Connect authentication

// TODO: Connect database

// TODO: Connect payment gateway

==================================================

DESIGN SYSTEM

==================================================

Create a professional healthcare/health-tech design.

Visual direction:

- Clean white/light background

- Healthcare teal/blue primary color

- Green for success/verified/in-stock

- Amber for warnings

- Red for errors/rejected/critical expiry

- Neutral gray surfaces

- Modern typography

- Moderate rounded corners

- Subtle shadows

- Clean cards

- Good spacing

- Responsive design

- Desktop + tablet + mobile support

Do not make it look like a generic e-commerce template.

It should feel like:

Modern pharmacy + healthcare technology + professional dashboard.

==================================================

CUSTOMER ROUTES

==================================================

Create React Router routes for:

/

    Home

/medicines

    Medicine catalogue

/medicines/:id

    Medicine details

/cart

    Cart

/wishlist

    Wishlist

/prescriptions

    Customer prescriptions

/checkout

    Checkout

/orders

    Order history

/orders/:id

    Order details

/profile

    Customer profile

/login

    Login

/signup

    Signup

These pages should have polished UI layouts but only basic mock interactions.

==================================================

CUSTOMER HOME PAGE

==================================================

Create:

Header:

- MediTrack logo

- Search

- Medicines

- Orders

- Wishlist

- Cart

- Profile

Hero:

"MediTrack"

"Medicines you need. Stock you can trust."

Supporting text:

"Real-time availability, prescription-aware checkout, and secure pharmacy shopping."

Buttons:

"Shop Medicines"

"View Categories"

Sections:

Shop by Category

Popular Medicines

Frequently Purchased

Refill Again

Healthcare Essentials

Trust indicators:

Real-Time Inventory

Prescription Verification

Secure Checkout

Expiry Visibility

==================================================

MEDICINE CATALOGUE

==================================================

Create reusable MedicineCard component.

Medicine card should contain:

- image

- medicine name

- composition

- manufacturer

- price

- stock status

- expiry

- prescription-required badge

- Add to Cart button

- Wishlist button

Create filters:

- Category

- Price

- Availability

- Prescription Required

- Manufacturer

Create search UI.

Use realistic mock Indian pharmacy products and INR prices.

Do not provide medical advice.

==================================================

MEDICINE DETAILS

==================================================

Create:

Product image

Medicine name

Composition

Manufacturer

Price

Availability

Expiry

Batch information

Quantity selector

Add to Cart

Wishlist

Tabs/sections:

Product Information

Composition

Storage Information

Usage Information

Return Policy

If prescription is required, show:

"Prescription Required"

and:

"This medicine requires prescription verification before checkout."

==================================================

CART

==================================================

Create cart UI only.

Show:

Medicine

Quantity

Price

Subtotal

Remove

Wishlist

Include a visual placeholder for future stock-hold functionality:

"Stock reserved temporarily"

and:

"Stock hold timer"

But DO NOT implement the actual stock locking logic.

Add a TODO comment explaining:

// TODO: Implement TTL-based stock reservation

==================================================

WISHLIST

==================================================

Create wishlist page.

Each product should have:

Product

Price

Availability

Remove

Move to Cart

==================================================

PRESCRIPTIONS

==================================================

Create customer prescription page.

Sections:

Upload Prescription

Prescription History

Status badges:

Pending Review

Verified

Rejected

The upload UI can be visual/mock only.

Add:

// TODO: Connect prescription upload API

// TODO: Implement pharmacist verification workflow

==================================================

CHECKOUT

==================================================

Create a polished checkout layout.

Steps:

1. Delivery Address

2. Prescription Verification

3. Order Summary

4. Payment

Payment options:

UPI

Debit Card

Credit Card

Net Banking

Create payment UI only.

DO NOT process real payments.

Add TODO:

// TODO: Connect payment gateway

// TODO: Implement transactional inventory update

==================================================

ORDERS

==================================================

Create order history.

Order card:

Order ID

Date

Items

Amount

Payment Status

Order Status

Order details page should contain:

Order summary

Delivery address

Payment information

Prescription status

Order timeline

Timeline:

Order Placed

Payment Confirmed

Pharmacy Processing

Packed

Out for Delivery

Delivered

==================================================

PROFILE / CRM

==================================================

Create profile dashboard.

Sections:

Personal Information

Addresses

Orders

Prescriptions

Wishlist

Refill Suggestions

Security

Create:

"Refill Again"

section.

Example:

"You previously purchased Dolo 650."

Button:

"Buy Again"

Create:

"Frequently purchased together"

Use mock data.

Do not implement AI.

Add:

// TODO: Replace mock co-purchase rules with backend CRM logic

==================================================

ADMIN APPLICATION

==================================================

Create a completely separate AdminLayout.

Admin sidebar:

Dashboard

Inventory

Orders

Prescriptions

Customers

Supply Chain

Audit Logs

Users & Roles

Settings

Create admin routes:

/admin

/admin/inventory

/admin/inventory/scan

/admin/orders

/admin/prescriptions

/admin/customers

/admin/supply-chain

/admin/audit-logs

/admin/users

/admin/settings

==================================================

ADMIN DASHBOARD

==================================================

Create dashboard cards:

Total Medicines: 30

Item Varieties: 7

Low Stock: 6

Expiring Soon: 4

Pending Prescriptions: 5

Orders Today: 12

Add placeholder charts/visualizations for:

Orders

Inventory

Low Stock

Expiry

Create:

Recent Activity

section.

==================================================

INVENTORY

==================================================

Create professional inventory table.

Columns:

Medicine

Batch

Quantity

Reorder Level

Maximum Level

Expiry

Status

Actions

Use example business rules:

Reorder when:

Quantity <= 10

OR

Batch approaching expiry.

Maximum replenish level:

100 units.

Display statuses:

Healthy

Low Stock

Expiring Soon

Reorder Required

Do NOT implement automatic replenishment yet.

Add TODO comments:

// TODO: Implement reorder rule

// TODO: Connect inventory API

// TODO: Implement real-time stock synchronization

==================================================

BATCH / QR / RFID

==================================================

Create:

/admin/inventory/scan

Design a mock scanning interface.

Show:

Scan Batch

Then mock result:

Batch ID

Medicine

Quantity

Manufacturing Date

Expiry Date

Supplier

Buttons:

Confirm Stock Entry

Update Quantity

Do not implement actual camera/QR/RFID functionality.

Add:

// TODO: Integrate QR/RFID scanner

==================================================

SUPPLY CHAIN

==================================================

Create:

Replenishment Requests

Table:

Medicine

Current Quantity

Target Quantity

Trigger

Expiry

Status

Example triggers:

Low Quantity

Expiry Risk

Statuses:

Pending

Approved

Ordered

Received

Create buttons visually, but no backend logic.

Add:

// TODO: Implement replenishment workflow

==================================================

PRESCRIPTION ADMIN

==================================================

Create pharmacist/admin prescription dashboard.

Show:

Customer

Medicine

Uploaded Date

Status

Actions:

View

Approve

Reject

Create UI states but don't implement real verification.

Add:

// TODO: Connect prescription verification backend

==================================================

ADMIN ORDERS

==================================================

Create order management table.

Columns:

Order ID

Customer

Amount

Payment Status

Prescription Status

Order Status

Date

Filters:

All

Pending

Paid

Processing

Shipped

Delivered

Cancelled

==================================================

CUSTOMERS

==================================================

Create customer management page.

Columns:

Name

Email

Phone

Orders

Last Order

Status

Customer detail layout:

Personal information

Order history

Prescription history

Refill suggestions

==================================================

AUDIT LOGS

==================================================

Create audit log page.

Columns:

Timestamp

User

Role

Action

Resource

Result

Example records:

Pharmacist01

Approved prescription

Admin01

Updated inventory

Customer04

Created order

Admin01

Created replenishment request

Add filters:

User

Role

Action

Date

Add explanatory UI:

"Sensitive actions are recorded for accountability."

Do not implement immutable storage yet.

Add:

// TODO: Implement append-only audit logging backend

==================================================

USERS & ROLES

==================================================

Create role management UI.

Roles:

Customer

Pharmacist

Inventory Manager

Admin

Show permissions for each role.

Customer:

Browse

Cart

Wishlist

Orders

Prescriptions

Profile

Pharmacist:

Prescription review

Order management

Medicine-related records

Inventory Manager:

Inventory

Batches

Replenishment

Stock receiving

Admin:

Users

Inventory

Orders

Audit logs

System settings

This is UI only.

==================================================

AUTHENTICATION

==================================================

Create Login and Signup screens.

Create mock role selection for development:

Continue as Customer

Continue as Pharmacist

Continue as Inventory Manager

Continue as Admin

Do NOT implement real authentication.

Add:

// TODO: Connect authentication provider

// TODO: Implement secure sessions/JWT

// TODO: Implement API-level authorization

==================================================

MOCK DATA

==================================================

Create separate TypeScript mock-data files.

At minimum:

30 medicines

7 categories

multiple batches

several users

several orders

several prescriptions

several inventory records

several audit records

several replenishment requests

Keep mock data strongly typed.

==================================================

REUSABLE COMPONENTS

==================================================

Create reusable components such as:

Navbar

Footer

Sidebar

MedicineCard

StatusBadge

StockBadge

ExpiryBadge

SearchBar

CategoryCard

OrderCard

OrderTimeline

PrescriptionCard

InventoryTable

StatCard

DataTable

Modal

Toast

Button

Input

Select

Pagination

EmptyState

LoadingState

ConfirmationDialog

Do not duplicate UI unnecessarily.

==================================================

IMPORTANT CODE QUALITY

==================================================

Use TypeScript interfaces/types.

Avoid huge components.

Split UI into reusable components.

Keep business logic separate from UI.

Keep mock data separate from components.

Use clear naming.

Add TODO comments wherever future backend implementation is required.

Do not use hardcoded values throughout JSX when they could belong in mock data.

==================================================

WHAT I WANT YOU TO GENERATE

==================================================

Generate:

1. Project structure

2. React/Vite setup

3. Tailwind styling

4. React Router setup

5. Customer layout

6. Admin layout

7. All required routes

8. Reusable components

9. TypeScript interfaces

10. Mock data

11. Professional responsive UI

12. Basic navigation

13. Basic local UI interactions

14. TODO markers for backend/business logic

DO NOT generate:

- real database

- real backend

- real payment gateway

- real authentication

- real prescription verification

- real QR/RFID integration

- production security implementation

- complicated API integrations

The output should be a clean frontend foundation that I can continue developing in VS Code.

IMPORTANT:

Do not repeatedly regenerate the entire project if something is incomplete.

Keep the architecture modular so I can implement each feature independently.

At the end, give me a concise explanation of:

- project structure

- important files

- how to run it locally

- where I should implement backend logic

- where I should implement authentication

- where I should implement database access

- where I should implement payment

- where I should implement inventory logic

- where I should implement prescription verification

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/893b1931-bc14-4c26-9ccb-6f8e5e8f5b98).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
