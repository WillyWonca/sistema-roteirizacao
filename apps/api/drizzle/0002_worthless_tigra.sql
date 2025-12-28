CREATE TABLE "passengers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"document" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"lat" numeric(9, 6) NOT NULL,
	"lng" numeric(9, 6) NOT NULL,
	"speed" numeric,
	"captured_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "route_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"route_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "routes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"active" boolean DEFAULT true,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "trip_waypoint_passengers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"waypoint_id" uuid NOT NULL,
	"passenger_id" uuid NOT NULL,
	"boarded" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"route_version_id" uuid NOT NULL,
	"planned_date" timestamp NOT NULL,
	"started_at" timestamp,
	"finished_at" timestamp,
	"driver_name" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "waypoints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"route_version_id" uuid NOT NULL,
	"name" text NOT NULL,
	"order_index" integer NOT NULL,
	"lat" numeric(9, 6) NOT NULL,
	"lng" numeric(9, 6) NOT NULL
);
--> statement-breakpoint
DROP TABLE "app"."passengers" CASCADE;--> statement-breakpoint
DROP TABLE "app"."planned_paths" CASCADE;--> statement-breakpoint
DROP TABLE "app"."positions" CASCADE;--> statement-breakpoint
DROP TABLE "app"."route_versions" CASCADE;--> statement-breakpoint
DROP TABLE "app"."routes" CASCADE;--> statement-breakpoint
DROP TABLE "app"."trip_waypoint_passengers" CASCADE;--> statement-breakpoint
DROP TABLE "app"."trips" CASCADE;--> statement-breakpoint
DROP TABLE "app"."users" CASCADE;--> statement-breakpoint
DROP TABLE "app"."waypoints" CASCADE;--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route_versions" ADD CONSTRAINT "route_versions_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes" ADD CONSTRAINT "routes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_waypoint_id_waypoints_id_fk" FOREIGN KEY ("waypoint_id") REFERENCES "public"."waypoints"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_passenger_id_passengers_id_fk" FOREIGN KEY ("passenger_id") REFERENCES "public"."passengers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_route_version_id_route_versions_id_fk" FOREIGN KEY ("route_version_id") REFERENCES "public"."route_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waypoints" ADD CONSTRAINT "waypoints_route_version_id_route_versions_id_fk" FOREIGN KEY ("route_version_id") REFERENCES "public"."route_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
DROP SCHEMA "app";
