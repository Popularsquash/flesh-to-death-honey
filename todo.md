# Project TODO

## E-commerce Integration
- [x] Upgrade to full-stack with database and user management
- [x] Add Stripe integration for payment processing
- [x] Store Printful API key securely
- [x] Create database schema for products, cart, and orders
- [x] Build Printful API service
- [x] Create product sync functionality
- [x] Build product listing page (Shop)
- [x] Implement shopping cart with context
- [x] Create cart page with quantity controls
- [x] Build checkout page with Stripe redirect
- [x] Add Stripe webhook handler
- [x] Create order success page
- [x] Update navigation with cart count
- [ ] Sync products from Printful (admin action)
- [x] Test end-to-end checkout flow
- [x] Write vitest tests for checkout flow

## Previous Features
- [x] Basic homepage layout
- [x] Navigation menu
- [x] Maintenance banner
- [x] Join the Swarm email signup modal
- [x] BuzzKill app link integration

## Manual Product Setup
- [x] Add American Football Jersey product
- [x] Add All-Over Men's Rashguard product
- [x] Add Men's Premium Tank Top product
- [x] Add Men's Premium Heavyweight Tee product
- [x] Test shop display with new products
- [x] Test checkout flow with new products

## Product Image Update
- [ ] Fetch products from Personal orders Printful store
- [ ] Replace mockup products with actual Printful products and images
- [ ] Test shop display with real product images

## T-Shirt Mockup Designs (from artifact)
- [x] Add "THE SIGNATURE" T-Shirt design ($34.99-$37.99) - F2D bee front, full back print
- [x] Add "THE DAILY RIDER" T-Shirt design ($32.99-$35.99) - Circle badge front, text back
- [x] Add "THE FLAG BEARER" T-Shirt design ($33.99-$36.99) - Bee with flag banner front, skull back
- [x] Update shop page to display new T-shirt designs
- [x] Verify all products display correctly with proper images

## Replace AI Mockups with Actual Design Files
- [x] Copy user's design files to project images folder
- [x] Use standing bee illustration for THE SIGNATURE product
- [x] Use Vegas motorcycle design for THE DAILY RIDER product  
- [x] Use circle badge logo for THE FLAG BEARER product
- [x] Update hero section with standing bee illustration
- [x] Update database with new image paths
- [x] Verify all images display correctly on shop page

## Sticker and Patch Products
- [ ] Create sticker products from design elements (skull, flag, honey jar, poker chip)
- [ ] Create embroidered patch products
- [ ] Add sticker pack bundle product
- [ ] Update database with new products and variants

## Product Detail Pages
- [ ] Create product detail page component with front/back image gallery
- [ ] Add size chart component for T-shirts
- [ ] Implement product routing (/product/:id)
- [ ] Add related products section
- [ ] Test product detail page navigation

## Printful Integration
- [ ] Set up Printful API client
- [ ] Create product sync functionality
- [ ] Map local products to Printful catalog
- [ ] Test order creation flow

## Comic Blog Section
- [x] Create comic blog database schema (posts, pages, episodes)
- [x] Add Comic Blog navigation tab to header
- [x] Create Comic Blog listing page
- [x] Create individual comic page/episode viewer
- [ ] Add admin interface for uploading comics (future enhancement)
- [x] Style comic viewer with dark theme matching site

## Product Detail Pages
- [x] Create product detail page component
- [x] Add front/back image views
- [x] Add size chart modal
- [x] Add size selector with pricing
- [x] Add to cart functionality
- [x] Link from shop page to detail page

## Suggested Next Steps Implementation
- [x] Add pricing to sticker product variants ($5-8 each)
- [x] Add pricing to patch product variants ($10-12 each)
- [x] Add pricing to sticker pack bundle ($20)
- [x] Add Issue #2 "The Yellowjacket Gang" comic placeholder
- [x] Generate sticker mockup images (on laptop/helmet)
- [x] Generate patch mockup images (on jacket)
- [x] Update product images in database

## Trust Badges
- [x] Add secure payment badges (Stripe, SSL, etc.) to footer
- [x] Add trust indicators for customer confidence

## Beeswax Products Coming Soon
- [x] Update beeswax products section with "Coming Soon" status
- [x] Add clever anarchic copy about road rage genome and wasp testing

## Email Capture & Reviews
- [x] Add email capture functionality for beeswax launch notifications
- [x] Create database table for email subscribers
- [x] Build email signup form component
- [x] Create customer reviews section for products
- [x] Add reviews database schema
- [x] Remove Gen Alpha/Z description from footer

## Branding Updates
- [x] Remove black background from bee illustration (make transparent)
- [x] Make "Flesh to Death Honey" branding larger on main page
- [x] Update hero section with transparent bee image

## Mobile Comic Reader
- [x] Make comic panels larger and readable on mobile
- [x] Add tap-to-zoom or swipe navigation for panels
- [x] Improve tablet layout for comic pages

## Suggested Next Steps
- [x] Update nav logo to include "HONEY CO." for brand consistency
- [x] Create About page with beekeeping, tattoos, motorcycle lifestyle story
- [x] Update social media links to real accounts (@fleshtodeathhoney on Instagram)

## Text Visibility Fixes
- [x] Fix text visibility on No Snitches Policy page
- [x] Fix text visibility on Terms of Service page
- [x] Ensure all legal pages have readable text contrast

## New Printful Products (Feb 2026)
- [x] Add "Road Warrior Tee" - Comfort Colors 1717 heavyweight t-shirt
- [x] Add "Beekeeper Tank" - Cotton Heritage MC1790 premium tank top
- [x] Add "Hive Mind Cap" - Yupoong 7005 5-panel cap
- [x] Add "Swarm Hoodie" - Cotton Heritage M2580 premium pullover hoodie
- [x] Add "The Flag Bearer Tee" - Unisex staple t-shirt
- [x] Add "The Daily Rider Tee" - All-over print cotton crew neck
- [x] Upload actual Printful mockup images to CDN
- [x] Add product variants with pricing
- [ ] Connect products to Printful sync

## Themed Product Detail Pages
- [x] Create garage-style background for product detail pages
- [x] Create alley/urban background for product detail pages
- [x] Create tattoo shop background for product detail pages
- [x] Update ProductDetail component with themed backgrounds
- [x] Assign different themes to different product categories
- [x] Add front/back image toggle for products

## Store Cleanup
- [x] Remove old placeholder products (keep only new Printful products)
- [x] Verify shop displays correctly after cleanup

## Color Variants
- [x] Add cardinal color variant for The Flag Bearer Tee
- [x] Add white color variant for The Flag Bearer Tee
- [x] Upload color variant mockups to CDN
- [x] Update product variants in database

## Printful API Order Sync
- [x] Create Printful order creation endpoint (already exists)
- [x] Integrate order sync with checkout flow (already exists)
- [x] Add fallback mechanism for failed Printful orders
- [x] Test checkout flow end-to-end
- [ ] Handle order status webhooks from Printful

## Comic Page Fix
- [ ] Download comic page images from Canva
- [ ] Replace squished comic layout with proper full-page images
- [ ] Test comic page displays correctly on mobile and desktop
