/*
  Warnings:

  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_like` on the `like` table. All the data in the column will be lost.
  - The primary key for the `reply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_reply` on the `reply` table. All the data in the column will be lost.
  - The primary key for the `seguidor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_seguidor` on the `seguidor` table. All the data in the column will be lost.
  - The primary key for the `tweet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_tweet` on the `tweet` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_usuario` on the `usuario` table. All the data in the column will be lost.
  - The required column `id` was added to the `like` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `reply` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `seguidor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `tweet` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
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
DROP COLUMN "id_like",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "like_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reply" DROP CONSTRAINT "reply_pkey",
DROP COLUMN "id_reply",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "reply_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "seguidor" DROP CONSTRAINT "seguidor_pkey",
DROP COLUMN "id_seguidor",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "seguidor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_pkey",
DROP COLUMN "id_tweet",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "tweet_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "id_usuario",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidor" ADD CONSTRAINT "seguidor_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_id_tweet_original_fkey" FOREIGN KEY ("id_tweet_original") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
