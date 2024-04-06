import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function requestExchange(req, res) {
    try {
        const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
        const requestInfo = req.body;

        // Regarde si l'utilisateur qui fait la demande possède la carte qu'il veut échanger
        const checkUser = await prisma.user.findFirst({
            where: {
                username: requestInfo.card_user
            },
            select: {
                id: true
            }
        });

        if (!checkUser) {
            return res.status(400).json({ error: "L'utilisateur n'existe pas" });
        }

        const checkCardUser = await prisma.userCard.findFirst({
            where: {
                id_user: userId,
                id_card: requestInfo.card_name_give
            },
            select: {
                id_user: true
            }
        });

        if (!checkCardUser) {
            return res.status(400).json({ error: "Vous ne possédez pas cette carte" });
        }
        
        const checkCardUserWant = await prisma.userCard.findFirst({
            where: {
                id_user: checkUser.id,
                id_card: requestInfo.card_name_want
            },
            select: {
                id_user: true
            }

        });

        if (!checkCardUserWant) {
            return res.status(400).json({ error: "L'utilisateur ne possède pas cette carte" });
        }

        // Vérifie si la demande d'échange existe déjà
        const checkExchange = await prisma.exchange.findFirst({
            where : {
                AND: [
                    {
                        id_user_card: checkCardUser.id_user
                    },
                    {
                        id_user_card_want: checkCardUserWant.id_user
                    }, 
                    
                ]
            }
        });

        console.log(checkExchange);

        if (checkExchange) {
            return res.status(400).json({ error: "La demande d'échange existe déjà" });
        }

        // Crée la demande d'échange
        const exchangeRequest = await prisma.exchange.create({
            data: {
                id_user: userId,
                id_user_card: checkCardUser.id,
                id_user_card_want: checkCardUserWant.id,
                date: new Date(),
            }
        });

        console.log(exchangeRequest);

        

        res.status(200).json({ message: "Demande d'échange envoyée" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur dans la récupération des informations" });
    }
}
