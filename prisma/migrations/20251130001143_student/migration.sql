-- CreateEnum
CREATE TYPE "Ratings" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "hobbies" TEXT NOT NULL,
    "bioInfo" TEXT NOT NULL,
    "cleanliness" "Ratings" NOT NULL,
    "noiseLevels" "Ratings" NOT NULL,
    "major" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL DEFAULT 'https://img.icons8.com/?size=100&id=7820&format=png',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
