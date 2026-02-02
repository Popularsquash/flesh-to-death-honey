ALTER TABLE `orders` MODIFY COLUMN `status` enum('pending','paid','processing','shipped','delivered','cancelled','refunded','pending_manual') NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `orders` ADD `printfulError` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `requiresManualProcessing` int DEFAULT 0 NOT NULL;