-- CreateTable
CREATE TABLE "UserTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTokens_userId_key" ON "UserTokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTokens_login_key" ON "UserTokens"("login");

-- CreateIndex
CREATE UNIQUE INDEX "UserTokens_refreshToken_key" ON "UserTokens"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "UserTokens_accessToken_key" ON "UserTokens"("accessToken");

-- AddForeignKey
ALTER TABLE "UserTokens" ADD CONSTRAINT "UserTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
