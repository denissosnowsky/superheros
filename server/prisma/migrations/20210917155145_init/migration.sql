-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "origin_description" TEXT NOT NULL,
    "superpowers" TEXT NOT NULL,
    "catch_phrase" TEXT NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "heroId" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hero_nickname_key" ON "Hero"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Images_name_key" ON "Images"("name");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
