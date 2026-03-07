ALTER TABLE `products` ADD `onSale` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `salePrice` int;--> statement-breakpoint
ALTER TABLE `products` ADD `originalPrice` int;--> statement-breakpoint
ALTER TABLE `products` ADD `saleLabel` varchar(100);