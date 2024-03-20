/*
  Warnings:

  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `seguidor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tweet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `reply` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `tipo` on the `tweet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('Normal', 'Reply');

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_id_tweet_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_id_tweet_original_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "seguidor" DROP CONSTRAINT "seguidor_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_id_usuario_fkey";

-- AlterTable
ALTER TABLE "like" DROP CONSTRAINT "like_pkey",
ALTER COLUMN "id_tweet" SET DATA TYPE TEXT,
ALTER COLUMN "id_usuario" SET DATA TYPE TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "like_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "seguidor" DROP CONSTRAINT "seguidor_pkey",
ALTER COLUMN "id_seguido" SET DATA TYPE TEXT,
ALTER COLUMN "id_usuario" SET DATA TYPE TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "seguidor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_pkey",
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "Tipo" NOT NULL,
ALTER COLUMN "id_usuario" SET DATA TYPE TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tweet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "reply";

-- AddForeignKey
ALTER TABLE "seguidor" ADD CONSTRAINT "seguidor_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidor" ADD CONSTRAINT "seguidor_id_seguido_fkey" FOREIGN KEY ("id_seguido") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
