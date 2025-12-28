CREATE SCHEMA "app";
--> statement-breakpoint
CREATE TABLE "app"."passengers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"document" varchar(50),
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."planned_paths" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"route_version_id" uuid NOT NULL,
	"geometry" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"lat" varchar(50) NOT NULL,
	"lon" varchar(50) NOT NULL,
	"speed_kmh" integer,
	"recorded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."route_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"route_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"effective_from" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."routes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "app"."trip_waypoint_passengers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"waypoint_id" uuid NOT NULL,
	"passenger_id" uuid NOT NULL,
	"boarded" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"route_version_id" uuid NOT NULL,
	"planned_start" timestamp,
	"planned_end" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(50) DEFAULT 'planned'
);
--> statement-breakpoint
CREATE TABLE "app"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "app"."waypoints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"route_version_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"order" integer NOT NULL,
	"lat" varchar(50) NOT NULL,
	"lon" varchar(50) NOT NULL
);
--> statement-breakpoint
DROP TABLE "passengers" CASCADE;--> statement-breakpoint
DROP TABLE "planned_paths" CASCADE;--> statement-breakpoint
DROP TABLE "positions" CASCADE;--> statement-breakpoint
DROP TABLE "route_versions" CASCADE;--> statement-breakpoint
DROP TABLE "routes" CASCADE;--> statement-breakpoint
DROP TABLE "trip_waypoint_passengers" CASCADE;--> statement-breakpoint
DROP TABLE "trips" CASCADE;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
DROP TABLE "waypoints" CASCADE;--> statement-breakpoint
ALTER TABLE "app"."planned_paths" ADD CONSTRAINT "planned_paths_route_version_id_route_versions_id_fk" FOREIGN KEY ("route_version_id") REFERENCES "app"."route_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."positions" ADD CONSTRAINT "positions_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "app"."trips"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."route_versions" ADD CONSTRAINT "route_versions_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "app"."routes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."routes" ADD CONSTRAINT "routes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "app"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "app"."trips"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_waypoint_id_waypoints_id_fk" FOREIGN KEY ("waypoint_id") REFERENCES "app"."waypoints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_passenger_id_passengers_id_fk" FOREIGN KEY ("passenger_id") REFERENCES "app"."passengers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."trips" ADD CONSTRAINT "trips_route_version_id_route_versions_id_fk" FOREIGN KEY ("route_version_id") REFERENCES "app"."route_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."waypoints" ADD CONSTRAINT "waypoints_route_version_id_route_versions_id_fk" FOREIGN KEY ("route_version_id") REFERENCES "app"."route_versions"("id") ON DELETE no action ON UPDATE no action;