-- ============================================================
-- Macro Wholefoods - database schema (revised after Phase 2 review)
-- Engine: MySQL / MariaDB (XAMPP). utf8mb4 is required for Chinese text.
-- ============================================================
CREATE DATABASE IF NOT EXISTS macro_wholefoods
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE macro_wholefoods;

-- 1. categories: groups products (e.g. Plant-Based Protein)
CREATE TABLE categories (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(120) NOT NULL UNIQUE,      -- used in URLs
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. products: the product itself (name, photo, description).
--    Price and stock live on the VARIANT (size), not here.
CREATE TABLE products (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id  INT UNSIGNED NOT NULL,
  name         VARCHAR(200) NOT NULL,
  slug         VARCHAR(220) NOT NULL UNIQUE,
  description  TEXT,
  image        VARCHAR(255) DEFAULT NULL,        -- file name in assets/img/products
  is_featured  TINYINT(1) NOT NULL DEFAULT 0,    -- show on home page
  is_active    TINYINT(1) NOT NULL DEFAULT 1,    -- hide without deleting
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE RESTRICT,                          -- cannot delete a category that still has products
  INDEX idx_products_active (is_active, category_id)
) ENGINE=InnoDB;

-- 3. product_variants: one row per size/option the customer can buy.
--    EVERY product has at least one variant (even single-size ones),
--    so the cart always works with variants and needs no special case.
CREATE TABLE product_variants (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id  INT UNSIGNED NOT NULL,
  size_label  VARCHAR(30) NOT NULL,              -- free text: "650g", "1kg", "500ml"
  price       DECIMAL(10,2) NOT NULL,            -- money: never FLOAT
  stock_qty   INT UNSIGNED NOT NULL DEFAULT 0,   -- unsigned: cannot go negative
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  CONSTRAINT fk_variants_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE,                           -- deleting a product removes its sizes
  UNIQUE KEY uq_product_size (product_id, size_label)  -- no duplicate "650g" on one product
) ENGINE=InnoDB;

-- 4. orders: one row per checkout (guest customers, no account).
--    Delivery fee is a flat amount set in includes/config.php (RM 5.00), 0 for pickup.
CREATE TABLE orders (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_number     VARCHAR(30) NOT NULL UNIQUE,  -- shown to customer, e.g. MW-20261026-0001
  customer_name    VARCHAR(120) NOT NULL,
  phone            VARCHAR(20)  NOT NULL,
  email            VARCHAR(150) NOT NULL,
  delivery_method  ENUM('pickup','delivery') NOT NULL,
  address_line     VARCHAR(255) DEFAULT NULL,    -- NULL for pickup
  postcode         VARCHAR(10)  DEFAULT NULL,
  city             VARCHAR(100) DEFAULT NULL,
  state            VARCHAR(100) DEFAULT NULL,
  subtotal         DECIMAL(10,2) NOT NULL,
  delivery_fee     DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total            DECIMAL(10,2) NOT NULL,
  payment_status   ENUM('pending','paid','failed') NOT NULL DEFAULT 'pending',
  payment_channel  VARCHAR(50)  DEFAULT NULL,    -- filled from the gateway callback (FPX, card, e-wallet...)
  payment_ref      VARCHAR(100) DEFAULT NULL,    -- gateway transaction/bill id
  order_status     ENUM('new','processing','ready_for_pickup','shipped','completed','cancelled')
                   NOT NULL DEFAULT 'new',
  notes            VARCHAR(500) DEFAULT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_orders_lookup (order_number, phone)  -- fast "track my order" lookup
) ENGINE=InnoDB;

-- 5. order_items: lines inside an order.
--    Name, size and price are COPIED at purchase time, so later catalogue
--    changes never rewrite old orders.
CREATE TABLE order_items (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id      INT UNSIGNED NOT NULL,
  variant_id    INT UNSIGNED DEFAULT NULL,
  product_name  VARCHAR(200) NOT NULL,
  size_label    VARCHAR(30)  NOT NULL,
  unit_price    DECIMAL(10,2) NOT NULL,
  quantity      INT UNSIGNED NOT NULL,
  line_total    DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_variant
    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 6. contact_messages: submissions from the contact form
CREATE TABLE contact_messages (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(150) NOT NULL,
  phone       VARCHAR(20)  DEFAULT NULL,
  message     TEXT NOT NULL,
  is_read     TINYINT(1) NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 7. admins: store ONLY password hashes (from PHP password_hash), never plain text
CREATE TABLE admins (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username       VARCHAR(50)  NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
