# HANDOFF: Macro Wholefoods ecommerce website

You are taking over a project mid-way from another AI assistant. Read this whole file, then read the code in this zip before replying. Do not assume anything here was tested in a browser (see "Unverified").

## 1. Your role and how to behave
- You are a senior web developer and UI/UX designer mentoring a second-year Diploma in Computer Science student (the user). Be direct. If an idea is weak, say so and explain why. Do not just agree. The user asked for a "ruthless mentor": no sugarcoating, stress-test everything.
- Reply in English, or Malay if the user writes in Malay. Only English and Malay.
- Workflow is 5 phases. **STOP after each phase and wait for the user's approval.**
- Rules: give the folder structure before writing code; comment code so the user can explain it to their lecturer; do NOT add features the user didn't ask for; if information is missing, list questions at the start instead of guessing.
- Output limits were the reason for the handoff. Work in small, complete steps; write files with tools rather than pasting long code in chat.

## 2. The project
A real client's ecommerce website, built from scratch. The client currently sells only on Shopee and has no website.
Goals: build trust and brand identity outside Shopee; show shop info and products; make contacting the shop easy; let customers buy on the website.
- Business: Macro Organic Sdn. Bhd. (brand: Macro Wholefoods). Sells organic products (mostly packaged powders/drinks in tins) and runs a vegetarian restaurant. Target customers: vegetarians. Brand colour: green.
- Shopee store display name is "Ant Groceries Shop" (the Macro Wholefoods Shopee store, https://shopee.com.my/macrowholefoods). Client said they were happy with what they had; the user chose to build the site anyway (the user should confirm the client really wants direct sales, and who handles orders/packing).
- Contact: phone +60 6-231 1325; WhatsApp +60 17-943 8328; Facebook page "Macro Wholefoods"; email macroorganiclife33@gmail.com (from the Facebook page, client must confirm it is monitored).
- Address: 659E & 659E-1, Jalan Delima, Taman Bukit Melaka, Bukit Beruang, 75450 Melaka, Malaysia. Hours: 8:30am to 6:30pm (days unknown).
- Website language: English (risk: many customers may read Chinese; signage reads 健康人生有机坊; the user's brief said 健康人生有限公司, verify against SSM registration).

## 3. Fixed tech stack (no frameworks)
HTML5, CSS3, vanilla JavaScript; plain PHP with PDO prepared statements; MySQL; local environment XAMPP.

## 4. Decisions already made
- Guest checkout only. No customer accounts, wishlists, reviews, blog, coupons (not requested).
- Products are sold by product AND size (grams/ml): separate price and stock per size (variants).
- Delivery: flat RM5.00 ("Shopee standard"); pickup at shop is free (RM0.00). Confirm with client whether RM5 flat applies nationwide; real courier cost to East Malaysia will exceed it and the client would absorb the loss.
- **Payment is a MOCK only**: the flow shows FPX / card / e-wallet options, a "DEMO ONLY, no real payment" banner, a 2-second processing screen, then "Order received". No real money, no gateway. This means the site cannot take real orders yet; going live needs a real Malaysian gateway (e.g. ToyyibPay or Billplz) and a merchant account. The user must tell the client it is a prototype.
- Cart is session/browser-based, not stored in the database.
- Admin panel (login, add/edit/delete products) only if the user approves it in Phase 4. Orders management would be needed for it to be useful.
- Stock sync between Shopee and the website is unsolved; the client needs a rule for who updates what.

## 5. Phase status
- Phase 1 UI/UX: done in text (personas, sitemap, wireframes, design system, accessibility). The user is building the Figma mockup themselves; four starter SVG screens were supplied (home, product, checkout, mock payment) but are NOT in this zip. The user has not yet shown Figma screenshots. If Figma differs from the code, ask the user which wins (Phase 1 said follow the approved design).
- Phase 2 Database: done and approved with revisions (see section 7). SQL files are in `database/`.
- Phase 3 Frontend: built (static HTML/CSS/JS prototype), then redesigned once (v2). Awaiting the user's review. Not formally approved.
- Phase 4 Backend (PHP): NOT started. Phase 5 testing/delivery: not started.

## 6. What is in this zip
```
macro-wholefoods/
├── index.html shop.html product.html cart.html checkout.html info.html contact.html
├── HANDOFF.md
├── database/ schema.sql  sample-data.sql
└── assets/
    ├── css/style.css
    ├── img/ p1-p4.jpg      # product photos CROPPED FROM A SHOPEE SCREENSHOT: low resolution, placeholders
    └── js/ data.js main.js
```
How the front end works now (prototype, all client-side):
- `data.js`: SHOP info, DELIVERY_FEE (5.00), PRODUCTS array with sizes. Sample data. Sizes marked with `*` (e.g. "500g*") and several prices are PLACEHOLDERS. Only Millet Milk 650g RM84.00 and Plant Based Protein RM112.10 prices were seen on Shopee. `mapQuery` drives the embedded Google Map.
- `main.js`: each page sets `<body data-page="...">` and the matching function runs (home, shop, product, cart, checkout, contact). Header, footer, announcement bar and mobile contact bar are injected by JS (`layout()`), to become PHP includes in Phase 4. Cart is in localStorage (`mw_cart`). Checkout runs details form, then mock payment, then wait, then done; order number format MW-YYYYMMDD-#### is generated client-side for now.
- Pages: Home (hero, perks, categories, products, visit + map), Shop (search `?q=`, category `?cat=`), Product (size chips change price, quantity capped at stock), Cart, Checkout (Pickup/Delivery toggle, validation, mock payment), Info (about + map), Contact (cards + form + map).
- Design system: colours green #2E7D32, dark green #1B5E20, ink #14231A, light green #E8F5E9, cream #FAFAF5, text #1F2A24, muted #5F6B64, border #D5DDD7, alert #B3261E, accent #F2B705 (decorative only). Fonts: Fraunces (headings) + Inter (body); this replaced Poppins from Phase 1. 16px body, touch targets at least 44px, mobile first with one breakpoint at 768px.

## 7. Database (MySQL, utf8mb4), 7 tables
`categories`; `products` (name, slug, description, image, is_featured, is_active); `product_variants` (size_label, price DECIMAL, stock_qty UNSIGNED, unique per product+size); `orders` (guest customer fields, delivery_method pickup/delivery, address fields, subtotal, delivery_fee, total, payment_status pending/paid/failed, payment_channel, payment_ref, order_status, order_number UNIQUE, index on order_number+phone for tracking); `order_items` (copies product_name, size_label, unit_price at purchase time); `contact_messages`; `admins` (password_hash only). Deliberately NOT created: customers, cart, payments, shipping_rates (flat fee lives in config), shop_settings (shop info lives in config). The admin sample hash is a placeholder: generate with `password_hash()`. The SQL was never run on a real MySQL; test it in phpMyAdmin first.

## 8. Unverified / known issues (be honest about these)
- None of the code has been opened in a browser by the previous assistant (only JS syntax and HTML well-formedness were checked). Test every flow, especially the mobile menu (toggle at 390px), checkout validation, and the embedded map.
- The Google Map pin is built from the address string and is unconfirmed. The user should search the shop in Google Maps, use Share then Embed a map, and replace it with the exact embed `src`.
- Keyboard focus is lost when the product page redraws after choosing a size or quantity (accessibility bug).
- Product/cart pages redraw via innerHTML; all dynamic text is escaped with `esc()`; keep that discipline.
- No failed-payment path in the mock. No Track Order, Order Confirmation as separate page, or Policies (shipping, returns, privacy) pages yet. Policies matter before real orders.
- Info page copy is thin on purpose: client story, certifications and restaurant details were not provided. Do not invent claims (organic, certified, etc.) the client can't prove.
- Contact form does not send anything yet (it says so on screen).

## 9. Open questions for the client / user
1. Is "Ant Groceries Shop" on Shopee the client's own store? (user said yes: it is the Shopee account Macro Wholefoods sells through)
2. Real product list: names, sizes, prices, stock, original photos, logo file, certifications.
3. Is RM5 flat delivery acceptable for all of Malaysia, and who pays the difference?
4. Does the shop want pickup? Which payment gateway when going live?
5. Who updates stock on Shopee and the website?
6. Customer reviews: may the Shopee rating/reviews be reused (4.9 stars, 42.6k followers was seen)?

## 10. Next step: Phase 4 backend (only when the user approves)
Convert pages to `.php` with `includes/` (config.php, db.php PDO, functions.php, header.php, footer.php); move products, sizes and shop info from `data.js` to MySQL; server-side cart in `$_SESSION`; checkout creates `orders` + `order_items` in a transaction and decrements stock with `SELECT ... FOR UPDATE` (prevents overselling); mock payment sets `payment_status = paid` (no gateway); order tracking by order number + phone; contact form saves to `contact_messages`; optional admin panel. Security required: prepared statements, validation, output escaping (`htmlspecialchars`), `password_hash`/`password_verify`, session handling (regenerate id on login), CSRF tokens on every POST. Show the folder structure first. Comment the code. Stop and wait for approval after the phase.
