/*
  Warnings:

  - You are about to drop the column `accessToken` on the `UserTokens` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `UserTokens` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserTokens_accessToken_key";

-- DropIndex
DROP INDEX "UserTokens_login_key";

-- AlterTable
ALTER TABLE "UserTokens" DROP COLUMN "accessToken",
DROP COLUMN "login";
