-- DropForeignKey
ALTER TABLE "public"."Favorite" DROP CONSTRAINT "Favorite_catId_fkey";

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
