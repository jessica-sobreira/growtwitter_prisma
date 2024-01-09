/*
  Warnings:

  - The primary key for the `like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idLike` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `idTweet` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `like` table. All the data in the column will be lost.
  - The primary key for the `reply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idReply` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `idTweetOriginal` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `reply` table. All the data in the column will be lost.
  - The primary key for the `seguidor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idSeguido` on the `seguidor` table. All the data in the column will be lost.
  - You are about to drop the column `idSeguidor` on the `seguidor` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `seguidor` table. All the data in the column will be lost.
  - The primary key for the `tweet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idTweet` on the `tweet` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `tweet` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUsuario` on the `usuario` table. All the data in the column will be lost.
  - The required column `id_like` was added to the `like` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_tweet` to the `like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `like` table without a default value. This is not possible if the table is not empty.
  - The required column `id_reply` was added to the `reply` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_tweet_original` to the `reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_seguido` to the `seguidor` table without a default value. This is not possible if the table is not empty.
  - The required column `id_seguidor` was added to the `seguidor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_usuario` to the `seguidor` table without a default value. This is not possible if the table is not empty.
  - The required column `id_tweet` was added to the `tweet` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_usuario` to the `tweet` table without a default value. This is not possible if the table is not empty.
  - The required column `id_usuario` was added to the `usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_idTweet_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_idTweetOriginal_fkey";

-- DropForeignKey
ALTER TABLE "reply" DROP CONSTRAINT "reply_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "seguidor" DROP CONSTRAINT "seguidor_idSeguido_fkey";

-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_idUsuario_fkey";

-- AlterTable
ALTER TABLE "like" DROP CONSTRAINT "like_pkey",
DROP COLUMN "idLike",
DROP COLUMN "idTweet",
DROP COLUMN "idUsuario",
ADD COLUMN     "id_like" UUID NOT NULL,
ADD COLUMN     "id_tweet" UUID NOT NULL,
ADD COLUMN     "id_usuario" UUID NOT NULL,
ADD CONSTRAINT "like_pkey" PRIMARY KEY ("id_like");

-- AlterTable
ALTER TABLE "reply" DROP CONSTRAINT "reply_pkey",
DROP COLUMN "idReply",
DROP COLUMN "idTweetOriginal",
DROP COLUMN "idUsuario",
ADD COLUMN     "id_reply" UUID NOT NULL,
ADD COLUMN     "id_tweet_original" UUID NOT NULL,
ADD COLUMN     "id_usuario" UUID NOT NULL,
ADD CONSTRAINT "reply_pkey" PRIMARY KEY ("id_reply");

-- AlterTable
ALTER TABLE "seguidor" DROP CONSTRAINT "seguidor_pkey",
DROP COLUMN "idSeguido",
DROP COLUMN "idSeguidor",
DROP COLUMN "idUsuario",
ADD COLUMN     "id_seguido" UUID NOT NULL,
ADD COLUMN     "id_seguidor" UUID NOT NULL,
ADD COLUMN     "id_usuario" UUID NOT NULL,
ADD CONSTRAINT "seguidor_pkey" PRIMARY KEY ("id_seguidor");

-- AlterTable
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_pkey",
DROP COLUMN "idTweet",
DROP COLUMN "idUsuario",
ADD COLUMN     "id_tweet" UUID NOT NULL,
ADD COLUMN     "id_usuario" UUID NOT NULL,
ADD CONSTRAINT "tweet_pkey" PRIMARY KEY ("id_tweet");

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "idUsuario",
ADD COLUMN     "id_usuario" UUID NOT NULL,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweet"("id_tweet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidor" ADD CONSTRAINT "seguidor_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_id_tweet_original_fkey" FOREIGN KEY ("id_tweet_original") REFERENCES "tweet"("id_tweet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
