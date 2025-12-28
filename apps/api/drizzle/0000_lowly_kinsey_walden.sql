CREATE TABLE "passengers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"document" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "planned_paths" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_version_id" integer NOT NULL,
	"geometry" geometry(LineString,4326),
	"distance_meters" integer
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" integer NOT NULL,
	"location" geometry(Point,4326),
	"speed" integer,
	"heading" integer,
	"recorded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "route_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_id" integer NOT NULL,
	"version" integer NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "routes" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trip_waypoint_passengers" (
	"id" serial PRIMARY KEY NOT NULL,
	"trip_id" integer NOT NULL,
	"waypoint_id" integer NOT NULL,
	"passenger_id" integer NOT NULL,
	"type" text NOT NULL,
	"event_time" timestamp
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_version_id" integer NOT NULL,
	"service_date" timestamp NOT NULL,
	"planned_start" timestamp,
	"actual_start" timestamp,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "waypoints" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_version_id" integer NOT NULL,
	"name" text,
	"sequence" integer NOT NULL,
	"location" geometry(Point,4326)
);
--> statement-breakpoint
ALTER TABLE "planned_paths" ADD CONSTRAINT "planned_paths_route_version_id_route_versions_id_fk" FOREIGN KEY ("route_version_id") REFERENCES "public"."route_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "positions" ADD CONSTRAINT "positions_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "route_versions" ADD CONSTRAINT "route_versions_route_id_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_waypoint_id_waypoints_id_fk" FOREIGN KEY ("waypoint_id") REFERENCES "public"."waypoints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trip_waypoint_passengers" ADD CONSTRAINT "trip_waypoint_passengers_passenger_id_passengers_id_fk" FOREIGN KEY ("passenger_id") REFERENCES "public"."passengers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" ADD CONSTRAINT "trips_route_version_id_route_versions_id_fk" FOREIGN KEY ("route_version_id") REFERENCES "public"."route_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "waypoints" ADD CONSTRAINT "waypoints_route_version_id_route_versions_id_fk" FOREIGN KEY ("route_version_id") REFERENCES "public"."route_versions"("id") ON DELETE no action ON UPDATE no action;