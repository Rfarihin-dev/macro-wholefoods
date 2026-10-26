-- ============================================================
-- SAMPLE DATA - for development only.
-- Only the two prices marked "from Shopee" were seen in screenshots.
-- Everything marked PLACEHOLDER is invented: replace with the client's real data.
-- ============================================================
USE macro_wholefoods;

INSERT INTO categories (name, slug, sort_order) VALUES
('Plant-Based Protein',    'plant-based-protein',  1),
('Grain & Seed Drinks',    'grain-seed-drinks',    2),
('Health & Beauty Drinks', 'health-beauty-drinks', 3),
('Whole Grains & Cooking', 'whole-grains-cooking', 4);

INSERT INTO products (category_id, name, slug, description, image, is_featured) VALUES
(1, 'Macro Wholefoods Organic Plant Based Protein',                   'organic-plant-based-protein', 'Pure vegetable protein powder.',          'plant-protein.jpg',       1),
(2, 'Macro Wholefoods Organic Millet Milk Powder',                    'organic-millet-milk-powder',  'Organic millet and oat milk powder.',     'millet-milk.jpg',         1),
(3, 'Macro Wholefoods Organic Red Yeast Rice & Beetroot Full Grain',  'red-yeast-rice-beetroot',     'Full grain drink powder.',                'red-yeast-beetroot.jpg',  0),
(3, 'Macro Wholefoods Ever 18 Natural Anti-aging Beauty Drink',       'ever-18-beauty-drink',        'Natural beauty drink powder.',            'ever-18.jpg',             1);

-- Variants (sizes). product_id follows the insert order above (1..4).
INSERT INTO product_variants (product_id, size_label, price, stock_qty, sort_order) VALUES
(1, '500g',  112.10, 20, 1),   -- price from Shopee; size is a PLACEHOLDER
(2, '650g',   84.00, 15, 2),   -- price + size from Shopee
(2, '350g',   49.00, 10, 1),   -- PLACEHOLDER size and price (shows a product with 2 sizes)
(3, '800g',   99.00, 10, 1),   -- PLACEHOLDER
(4, '300g',  120.00,  8, 1);   -- PLACEHOLDER

-- Admin: do NOT hand-write a hash. Generate one with PHP and paste it below:
--   php -r "echo password_hash('YourStrongPassword', PASSWORD_DEFAULT);"
INSERT INTO admins (username, password_hash) VALUES
('admin', 'PASTE_GENERATED_HASH_HERE');
