-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_commentId_fkey";

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "commentId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
