ALTER TABLE "positions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "route_versions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "trip_waypoint_passengers" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "trips" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "waypoints" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "positions" CASCADE;--> statement-breakpoint
DROP TABLE "route_versions" CASCADE;--> statement-breakpoint
DROP TABLE "trip_waypoint_passengers" CASCADE;--> statement-breakpoint
DROP TABLE "trips" CASCADE;--> statement-breakpoint
DROP TABLE "waypoints" CASCADE;--> statement-breakpoint
ALTER TABLE "routes" DROP CONSTRAINT "routes_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "routes" ALTER COLUMN "active" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "routes" ALTER COLUMN "active" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "routes" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "reset_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "reset_token_expires" timestamp;--> statement-breakpoint
ALTER TABLE "routes" DROP COLUMN "created_by";