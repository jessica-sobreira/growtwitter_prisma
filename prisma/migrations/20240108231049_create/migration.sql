-- CreateTable
CREATE TABLE "usuario" (
    "idUsuario" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,
    "dhr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dhr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "tweet" (
    "idTweet" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "dhr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dhr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("idTweet")
);

-- CreateTable
CREATE TABLE "like" (
    "idLike" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idTweet" INTEGER NOT NULL,
    "dhr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dhr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("idLike")
);

-- CreateTable
CREATE TABLE "seguidor" (
    "idSeguidor" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idSeguido" INTEGER NOT NULL,
    "dhr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dhr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seguidor_pkey" PRIMARY KEY ("idSeguidor")
);

-- CreateTable
CREATE TABLE "reply" (
    "idReply" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'R',
    "idTweetOriginal" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "dhr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dhr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reply_pkey" PRIMARY KEY ("idReply")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_idTweet_fkey" FOREIGN KEY ("idTweet") REFERENCES "tweet"("idTweet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seguidor" ADD CONSTRAINT "seguidor_idSeguido_fkey" FOREIGN KEY ("idSeguido") REFERENCES "usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_idTweetOriginal_fkey" FOREIGN KEY ("idTweetOriginal") REFERENCES "tweet"("idTweet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;
