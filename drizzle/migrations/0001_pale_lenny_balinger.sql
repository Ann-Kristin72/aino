CREATE TABLE "user_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"course_id" varchar(255),
	"nano_id" varchar(255),
	"unit_id" varchar(255) NOT NULL,
	"completed_at" timestamp DEFAULT now()
);
