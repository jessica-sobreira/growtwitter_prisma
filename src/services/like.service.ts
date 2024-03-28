import repository from "../database/prisma.repository";

export class LikeService {
    public async darLike(idTweet: string, idUsuario: string) {
        try {
            const tweet = await repository.tweet.findUnique({
                where: {
                    id: idTweet,
                },
            });

            if (!tweet) {
                throw new Error("Tweet não encontrado");
            }

            const existingLike = await repository.like.findFirst({
                where: {
                    idTweet,
                    idUsuario,
                },
            });

            if (existingLike) {
                throw new Error("Usuário já deu like neste tweet");
            }

            await repository.like.create({
                data: {
                    idTweet,
                    idUsuario,
                },
            });

            return "Like adicionado com sucesso!";
        } catch (error: any) {
            throw error;
        }
    }

    public async removerLike(idTweet: string, idUsuario: string) {
        try {
            const like = await repository.like.findFirst({
                where: {
                    idTweet,
                    idUsuario,
                },
            });

            if (!like) {
                throw new Error("Like não encontrado");
            }

            await repository.like.delete({
                where: {
                    id: like.id,
                },
            });

            return "Like removido com sucesso!";
        } catch (error: any) {
            throw error;
        }
    }
}