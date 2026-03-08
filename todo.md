
## Homepage SEO Fixes (Feb 26, 2026)
- [x] Set page title to 30-60 characters (57 chars)
- [x] Add meta description (160 chars)
- [x] Add meta keywords for the homepage
- [x] Remove maintenance banner from homepage (already removed in code, needs republish)

## SEO Refinements (Mar 6, 2026)
- [x] Reduce keywords from 10 to 6 focused keywords
- [x] Shorten meta description to 137 characters

## Page-Level SEO (Mar 6, 2026)
- [x] Add unique SEO keywords and meta description to Shop page
- [x] Add unique SEO keywords and meta description to Comics page
- [x] Add unique SEO keywords and meta description to About page

## Pricing Update (Mar 6, 2026)
- [x] Mirror product pricing to match gofastdontdie.com benchmarks (Cap $33, Hoodie $69, Tees $35, Tank $35, Rag $15, Stompers $9.95)

## HIVES GARAGE - Clearance Section (Mar 6, 2026)
- [x] Add salePrice, onSale, originalPrice, saleLabel fields to products schema
- [x] Run database migration for new sale fields
- [x] Add backend procedures for garage sale (list on-sale items, toggle sale)
- [x] Build HIVES GARAGE frontend page with sale styling (strikethrough, discount %, sale badges)
- [x] Add HIVES GARAGE navigation link to Home, Shop, Garage navs and Footer
- [x] Sale badges shown on Garage page for on-sale items
- [x] Write vitest tests for garage sale (14 tests passing)

## Admin Dashboard (Mar 6, 2026)
- [x] Add admin-only procedures for listing all products with sale info
- [x] Add admin procedure to update product sale status (toggle on/off, set sale price, sale label)
- [x] Add admin procedure to update product details (name, description, active status)
- [x] Build admin dashboard page with product management, orders, and subscribers tabs
- [x] Add admin route at /admin with role-based access (admin only)
- [x] Admin page accessible at /admin (no public nav link - admin-only URL)
- [x] All 61 tests passing (existing tests cover admin procedures)

## Pricing Fix (Mar 6, 2026)
- [x] Fix products showing $0.00 price (bigint column fix + Printful sync)
- [x] Sync all 15 products from Printful (variants, sizes, images)
- [x] Override synced prices to GFDD benchmarks (tees $35, hoodies $69, caps $33, etc.)

## Bug Fix (Mar 7, 2026)
- [x] Fix cartItems query error on homepage (transient DB connection - added retry logic)

## UI Fix (Mar 7, 2026)
- [x] Remove test mode active banner from Checkout page
- [x] Deactivate products without custom designs (generic Printful products showing on shop)
