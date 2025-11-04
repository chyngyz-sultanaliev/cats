-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
