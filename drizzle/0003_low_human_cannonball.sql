ALTER TABLE "expenses" DROP CONSTRAINT "expenses_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "expenses_user_id_index" ON "expenses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "expenses_category_id_index" ON "expenses" USING btree ("category_id");