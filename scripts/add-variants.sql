-- Get product IDs first (assuming they are 1, 2, 3 based on insert order)
-- THE SIGNATURE variants (Product ID 1) - $34.99-$37.99 (3499-3799 cents)
INSERT INTO productVariants (productId, printfulVariantId, name, retailPrice, currency, imageUrl, size, color, inStock) VALUES
(1, 10001, 'THE SIGNATURE - Black / S', 3499, 'USD', '/images/products/signature-tee.png', 'S', 'Black', 1),
(1, 10002, 'THE SIGNATURE - Black / M', 3499, 'USD', '/images/products/signature-tee.png', 'M', 'Black', 1),
(1, 10003, 'THE SIGNATURE - Black / L', 3499, 'USD', '/images/products/signature-tee.png', 'L', 'Black', 1),
(1, 10004, 'THE SIGNATURE - Black / XL', 3599, 'USD', '/images/products/signature-tee.png', 'XL', 'Black', 1),
(1, 10005, 'THE SIGNATURE - Black / 2XL', 3699, 'USD', '/images/products/signature-tee.png', '2XL', 'Black', 1),
(1, 10006, 'THE SIGNATURE - Black / 3XL', 3799, 'USD', '/images/products/signature-tee.png', '3XL', 'Black', 1);

-- THE DAILY RIDER variants (Product ID 2) - $32.99-$35.99 (3299-3599 cents)
INSERT INTO productVariants (productId, printfulVariantId, name, retailPrice, currency, imageUrl, size, color, inStock) VALUES
(2, 10011, 'THE DAILY RIDER - Black / S', 3299, 'USD', '/images/products/daily-rider-tee.png', 'S', 'Black', 1),
(2, 10012, 'THE DAILY RIDER - Black / M', 3299, 'USD', '/images/products/daily-rider-tee.png', 'M', 'Black', 1),
(2, 10013, 'THE DAILY RIDER - Black / L', 3299, 'USD', '/images/products/daily-rider-tee.png', 'L', 'Black', 1),
(2, 10014, 'THE DAILY RIDER - Black / XL', 3399, 'USD', '/images/products/daily-rider-tee.png', 'XL', 'Black', 1),
(2, 10015, 'THE DAILY RIDER - Black / 2XL', 3499, 'USD', '/images/products/daily-rider-tee.png', '2XL', 'Black', 1),
(2, 10016, 'THE DAILY RIDER - Black / 3XL', 3599, 'USD', '/images/products/daily-rider-tee.png', '3XL', 'Black', 1);

-- THE FLAG BEARER variants (Product ID 3) - $33.99-$36.99 (3399-3699 cents)
INSERT INTO productVariants (productId, printfulVariantId, name, retailPrice, currency, imageUrl, size, color, inStock) VALUES
(3, 10021, 'THE FLAG BEARER - Black / S', 3399, 'USD', '/images/products/flag-bearer-tee.png', 'S', 'Black', 1),
(3, 10022, 'THE FLAG BEARER - Black / M', 3399, 'USD', '/images/products/flag-bearer-tee.png', 'M', 'Black', 1),
(3, 10023, 'THE FLAG BEARER - Black / L', 3399, 'USD', '/images/products/flag-bearer-tee.png', 'L', 'Black', 1),
(3, 10024, 'THE FLAG BEARER - Black / XL', 3499, 'USD', '/images/products/flag-bearer-tee.png', 'XL', 'Black', 1),
(3, 10025, 'THE FLAG BEARER - Black / 2XL', 3599, 'USD', '/images/products/flag-bearer-tee.png', '2XL', 'Black', 1),
(3, 10026, 'THE FLAG BEARER - Black / 3XL', 3699, 'USD', '/images/products/flag-bearer-tee.png', '3XL', 'Black', 1);
