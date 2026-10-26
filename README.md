# Macro Wholefoods E-Commerce Website

An e-commerce website for Macro Wholefoods (Macro Organic Sdn. Bhd.), Bukit Beruang, Melaka. Customers can browse organic products, choose a size, and order directly from the shop's own website. Shop staff manage products, stock and orders through an admin area.

Built with plain HTML, CSS, JavaScript, PHP and MySQL, with no frameworks. Developed for **Web Programming (DITM 2123)** and **System Development Workshop (DITU 3934)** at Universiti Teknikal Malaysia Melaka.

> **Status:** front end completed as a working prototype. The PHP backend, database integration and admin area are in progress. See [Project Status](#6-project-status).

## Table of Contents

1. [Course Information](#1-course-information)
2. [Project Overview](#2-project-overview)
3. [Objectives](#3-objectives)
4. [Features and Scope](#4-features-and-scope)
5. [Technology Stack](#5-technology-stack)
6. [Project Status](#6-project-status)
7. [Folder Structure](#7-folder-structure)
8. [Pages and User Flow](#8-pages-and-user-flow)
9. [Business Rules](#9-business-rules)
10. [Database Design](#10-database-design)
11. [Design System](#11-design-system)
12. [Installation and Setup](#12-installation-and-setup)
13. [Security](#13-security)
14. [Testing](#14-testing)
15. [Known Limitations](#15-known-limitations)
16. [Future Work](#16-future-work)
17. [Project History](#17-project-history)
18. [Team](#18-team)
19. [Licence and Credits](#19-licence-and-credits)

---

## 1. Course Information

| Item | Details |
|---|---|
| Institution | Universiti Teknikal Malaysia Melaka (UTeM) |
| Faculty | Fakulti Teknologi Maklumat dan Komunikasi (FTMK) |
| Programme | Diploma in Computer Science |
| Subjects | Web Programming (DITM 2123); System Development Workshop (DITU 3934) |
| Semester / Session | Semester 1, Session 2026/2027 |
| Lecturers | Ts. Norazlin Mohammed, Ts. Azlianor Abdul Aziz |
| Group | B1-6 |
| Client | Macro Organic Sdn. Bhd. (Macro Wholefoods) |

**Client details**
- Address: 659E & 659E-1, Jalan Delima, Taman Bukit Melaka, Bukit Beruang, 75450 Melaka
- Phone: +60 6-231 1325 | WhatsApp: +60 17-943 8328
- Hours: 8:30am to 6:30pm
- Current online store: Shopee (https://shopee.com.my/macrowholefoods)

## 2. Project Overview

Macro Wholefoods sells organic products, mostly packaged plant-based powders and drinks, and runs a vegetarian restaurant. Its online sales currently go through one Shopee store, and the business has no website of its own.

### Problem statement
1. **Dependence on one marketplace.** The client does not control how its brand is shown or how customers are reached.
2. **Limited trust outside Shopee.** A new customer has no website to confirm the business is real or to see its physical shop.
3. **Scattered contact channels.** Phone, WhatsApp, Facebook and Shopee are separate, with no single page that brings them together.
4. **No owned ordering system.** Orders and stock are handled only through the marketplace's tools.

### Proposed solution
A website owned by the client that presents the brand and the shop's location, lists the products with size-based pricing and stock, takes orders directly, and gives staff a back office to manage them.

## 3. Objectives

1. Build a responsive online catalogue with search, category filtering, and size-based pricing and stock.
2. Implement a cart and checkout process with input validation, order recording and automatic stock deduction.
3. Present shop information, location and contact options that help customers trust and reach the business.
4. Develop an admin area for product management (add, edit, delete) and order review.

## 4. Features and Scope

### Customer side
- Browse all products, filter by category, and search by name.
- Product page with size selection. Price and stock follow the selected size.
- Cart with quantity changes (limited by stock) and item removal.
- Guest checkout with delivery (flat RM5.00) or free pickup at the shop.
- Order number, and order tracking by order number and phone number.
- Info page (about the shop, address, hours, embedded map) and a contact page (phone, WhatsApp, email, message form, map).
- Responsive layout for mobile, tablet and desktop, with a sticky call and WhatsApp bar on mobile.

### Admin side (backend phase)
- Secure login.
- Add, view, update and delete products, including sizes, prices, stock and images.
- View orders and update order status.
- View messages submitted through the contact form.

### Out of scope
- Customer accounts, wishlists, product reviews, coupons and a blog.
- Real online payment (the payment step is a demonstration, see [Business Rules](#9-business-rules)).
- Automatic stock synchronisation with Shopee.

## 5. Technology Stack

No frameworks or third-party libraries are used.

| Layer | Technology |
|---|---|
| Front end | HTML5, CSS3, vanilla JavaScript |
| Back end | PHP (plain PHP, PDO with prepared statements) |
| Database | MySQL |
| Local environment | XAMPP (Apache, MySQL, phpMyAdmin) |
| Fonts | Fraunces (headings), Inter (body), via Google Fonts |
| Map | Google Maps embed |
| Design | Figma |

## 6. Project Status

| Phase | Description | Status |
|---|---|---|
| 1 | UI/UX design: personas, sitemap, wireframes, design system, accessibility check | Completed |
| 2 | Database design: ERD, `CREATE TABLE` statements, sample data | Completed, still to be tested on MySQL |
| 3 | Front end: semantic HTML, responsive CSS, JavaScript | Completed as a prototype, awaiting review |
| 4 | Backend: PHP, database integration, orders, stock, contact form, admin area | Not started |
| 5 | Testing, deployment and client handover guide | Not started |

The current front end is a working prototype. Product data is stored in `assets/js/data.js` and the cart is stored in the browser (`localStorage`). Nothing is saved to the database until Phase 4 is completed.

## 7. Folder Structure

Current structure:

```
macro-wholefoods/
├── index.html           Home
├── shop.html            Product listing, search and category filter
├── product.html         Product detail with size selection
├── cart.html            Shopping cart
├── checkout.html        Checkout and demonstration payment
├── info.html            About the shop and location
├── contact.html         Contact details and message form
├── README.md
├── database/
│   ├── schema.sql       Table definitions
│   └── sample-data.sql  Sample records (placeholder values)
└── assets/
    ├── css/style.css    All styles (mobile first)
    ├── js/data.js       Shop details, delivery fee and sample products
    ├── js/main.js       Header and footer, cart, page logic, checkout
    └── img/             Product images
```

Planned structure after Phase 4:

```
macro-wholefoods/
├── *.php                Public pages (converted from .html)
├── admin/               Login, product management, orders, messages
├── includes/            config.php, db.php, functions.php, header.php, footer.php
├── database/
└── assets/
```

`includes/config.php` holds database credentials and must not be committed. A `config.example.php` with blank values will be provided instead, and `config.php` will be listed in `.gitignore`.

## 8. Pages and User Flow

| Page | Purpose and behaviour |
|---|---|
| Home | Hero section, three service points, category tiles, product grid, visit section with map |
| Shop | Search box and category filter (`?q=` and `?cat=` in the URL), product grid |
| Product | Image, price, stock status, size chips, quantity stepper, add to cart |
| Cart | Line items with quantity steppers, subtotal, link to checkout |
| Checkout | Details form with validation, delivery or pickup, order summary, then the demonstration payment steps |
| Info | About the shop, address, hours, phone, embedded map |
| Contact | Phone, WhatsApp, email, message form, embedded map |

**Purchase flow:** Home or Shop, then Product (choose size), Cart, Checkout (details and delivery), Payment (demonstration), Processing, Order Received (order number).

## 9. Business Rules

- Products are sold by size (for example 350g or 650g). Each size has its own price and stock.
- Quantity in the cart cannot exceed the stock of that size.
- Delivery fee is a flat RM5.00. Pickup at the shop is RM0.00.
- Delivery requires an address and a five-digit postcode.
- Order numbers use the format `MW-YYYYMMDD-####`.
- Order totals: subtotal plus delivery fee.
- **Payment is a demonstration only.** The page shows online banking (FPX), card and e-wallet options, a processing screen and an order confirmation. No real payment is made and no payment data is collected, and a banner on the page says so. Accepting real payments would need a payment gateway and a merchant account, which is outside this project.

## 10. Database Design

Database name: `macro_wholefoods` (character set `utf8mb4`). Seven tables:

| Table | Purpose | Main columns |
|---|---|---|
| `categories` | Product categories | name, slug, sort_order |
| `products` | Product details | category_id, name, slug, description, image, is_featured, is_active |
| `product_variants` | Sizes of each product | product_id, size_label, price, stock_qty, is_active (unique per product and size) |
| `orders` | One row per checkout | order_number, customer name, phone, email, delivery_method, address fields, subtotal, delivery_fee, total, payment_status, payment_channel, payment_ref, order_status |
| `order_items` | Items in each order | order_id, variant_id, product_name, size_label, unit_price, quantity, line_total |
| `contact_messages` | Contact form submissions | name, email, phone, message, is_read |
| `admins` | Administrator accounts | username, password_hash |

**Relationships:** one category has many products; one product has many variants; one order has many order items; each order item refers to a variant.

**Design decisions**
- Prices use `DECIMAL(10,2)`, never floating point.
- Stock is `UNSIGNED` so it cannot go below zero.
- Order items store a copy of the product name, size and price at purchase time, so later catalogue changes do not alter past orders.
- Products are hidden with `is_active` instead of being deleted, which keeps order history intact.
- Deleting a category that still has products is blocked (`ON DELETE RESTRICT`).
- Not created on purpose: a customers table (guest checkout), a cart table (the cart is held in the session), a payments table, and a shipping rates table (the flat fee is a configuration value).

## 11. Design System

**Colours**

| Role | Hex |
|---|---|
| Primary green | `#2E7D32` |
| Dark green | `#1B5E20` |
| Ink (main text and buttons) | `#14231A` |
| Light green | `#E8F5E9` |
| Cream (page background) | `#FAFAF5` |
| Muted text | `#5F6B64` |
| Border | `#D5DDD7` |
| Error | `#B3261E` |

**Typography:** Fraunces for headings, Inter for body text. Body text is 16px.

**Layout:** mobile first with one breakpoint at 768px. Spacing follows a 4px base.

**Accessibility:** touch targets and form fields are at least 44px high, form fields have visible labels, focus outlines are visible, images have alt text, and stock and error states do not rely on colour alone.

## 12. Installation and Setup

### Requirements
- XAMPP with Apache, PHP 8.x and MySQL
- A modern web browser
- Internet access (for Google Fonts and the embedded map)

### Run the prototype
1. Copy the `macro-wholefoods` folder into `C:\xampp\htdocs\`.
2. Start **Apache** in the XAMPP Control Panel.
3. Open `http://localhost/macro-wholefoods/` in the browser.

The prototype also opens by double-clicking `index.html`, but use Apache so the behaviour matches the final system.

### Set up the database (required from Phase 4)
1. Start **MySQL** in the XAMPP Control Panel.
2. Open phpMyAdmin at `http://localhost/phpmyadmin`.
3. Generate a password hash for the admin account:
   ```
   php -r "echo password_hash('YourStrongPassword', PASSWORD_DEFAULT);"
   ```
4. In `database/sample-data.sql`, replace `PASTE_GENERATED_HASH_HERE` with that hash.
5. Import `database/schema.sql`, then `database/sample-data.sql`.
6. Copy `includes/config.example.php` to `includes/config.php` and enter the database details (Phase 4).

### Change shop details
Shop name, phone, WhatsApp, hours, address, delivery fee and the map address are in `assets/js/data.js`. To fix the map pin, search the shop on Google Maps, choose Share, then Embed a map, and use the address or link in `mapQuery`.

## 13. Security

Required in the PHP backend (Phase 4):

- Prepared statements (PDO) for every database query.
- Server-side validation of all input, in addition to JavaScript validation.
- Output escaping with `htmlspecialchars`.
- Password hashing with `password_hash` and `password_verify`.
- Secure session handling, with the session ID regenerated on login.
- CSRF tokens on every form.
- Stock deduction inside a database transaction using `SELECT ... FOR UPDATE`, so two customers cannot buy the last item at the same time.
- Admin pages reachable only after login.

Already in the front end: all dynamic text is escaped before being placed in the page.

## 14. Testing

Planned for Phase 5:

- **Functional:** search and filtering; size selection changes price and stock; cart quantity limits; delivery and pickup totals; order creation; stock deduction; order tracking; contact form storage; admin add, edit and delete.
- **Validation:** empty fields, invalid phone number, invalid email, invalid postcode, quantity above stock.
- **Security:** SQL injection attempts, script injection in text fields, access to admin pages without logging in, missing CSRF token.
- **Responsive and accessibility:** screen widths of 360px, 768px and 1280px; keyboard-only checkout; text contrast.
- **Browsers:** current Chrome, Edge and Firefox.

## 15. Known Limitations

- Product sizes marked with an asterisk (for example `500g*`) and some prices in the sample data are placeholders. The client has not yet supplied real product data.
- Product images were cropped from screenshots of the client's Shopee store and are low resolution. They should be replaced with original photographs.
- The map location is generated from the shop address and should be checked against Google Maps.
- The contact form sends nothing until the backend is built.
- The About page contains only confirmed facts. The shop's own story and any product certifications are to be supplied by the client.
- The product page redraws after choosing a size or quantity, which resets keyboard focus. This is an accessibility issue to fix.
- Header and footer are added by JavaScript in the prototype. They become PHP includes in Phase 4.
- The demonstration payment always succeeds. There is no failed-payment path.

## 16. Future Work

Not part of this project, but possible later:
- Real payment through a Malaysian payment gateway.
- Policy pages (shipping, returns, privacy) before real orders are taken.
- Customer accounts and order history.
- A Chinese language option for the site.
- Stock synchronisation with Shopee.

## 17. Project History

| Stage | Description |
|---|---|
| Proposal, 2 October 2026 | *Pasar Saujana*, a sustainable e-commerce platform with carbon footprint tracking, for Zero Waste Earth Store Melaka |
| Current | *Macro Wholefoods*, an e-commerce website for Macro Organic Sdn. Bhd., Melaka |

The carbon tracking, customer accounts and PDF receipt features from the original proposal are not part of the current scope. [Group to confirm that the lecturers have approved the change of client and scope.]

## 18. Team

| Matric No | Name | Role |
|---|---|---|
| D032510203 | R. Farihin Ikhsan bin R. Rusli | UI UX Designer |
| D032510471 | Danish Hafiy bin Rajbullah | [to fill] |
| D032510159 | Nik Myra Maisarah binti Nik Mohd Rosdi | [to fill] |
| D032510169 | Rishwita a/p Siva | [to fill] |
| D032510565 | Deo Cheng Yu Hong | [to fill] |

## 19. Licence and Credits

Developed for academic purposes under Web Programming (DITM 2123) and System Development Workshop (DITU 3934). The Macro Wholefoods name, logo, product names and product images belong to Macro Organic Sdn. Bhd. and are used for this project with the client's knowledge. [Group to confirm that written permission from the client has been obtained.]

Code licence: [Group to choose, or state "All rights reserved, academic submission"].
