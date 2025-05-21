import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";
import { Plan } from "@prisma/client";

/**
 * - Salvar, atualizar ou deletar informações das assinaturas (subscription) no banco de dados, sincronizando com Stripe.
 * 
 * @async
 * @function manageSubscription
 * @param {string} subscriptionId - ID da assinatura a ser gerenciada;
 * @param {string} customerId - ID do cliente a ser gerenciado;
 * @param {boolean} createAction - Se for true, cria uma assinatura no Stripe;
 * @param {boolean} deletedAction - Se for true, deleta uma assinatura no Stripe;
 * @param {Plan} [type] - Tipo da assinatura;
 * 
 * @returns {Promise<Response|void>}
 */
export async function manageSubscription(subscriptionId: string, customerId: string, createAction = false, deletedAction = false, type?: Plan) {

    //Buscar do banco usuário com esse customerId
    //Salvar os dados da assinatura feita no banco de dados

    const findUser = await prisma.user.findFirst({
        where: {
            stripe_customer_id: customerId,
        }
    })

    if (!findUser) {
        return Response.json({ error: "Falha ao realizar assinatura" }, { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: findUser.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        plan: type ?? "BASIC"
    }

    if (subscriptionId && deletedAction) {
        await prisma.subscription.delete({
            where: {
                id: subscriptionId
            }
        })

        return;
    }

    if (createAction) {
        try {

            await prisma.subscription.create({
                data: subscriptionData
            })

        } catch(err) {
            return Response.json({ error: "Falha ao realizar assinatura" }, { status: 400 });
        }        
    } else {
        
        try {

            const findSubscription = await prisma.subscription.findFirst({
                where: {
                    id: subscriptionId,
                }
            })

            if (!findSubscription) return;

            await prisma.subscription.update({
                where: {
                    id: findSubscription.id,
                },
                data: {
                    status: subscription.status,
                    priceId: subscription.items.data[0].price.id,
                }
            })

        } catch(err) {
            return Response.json({ error: "Falha ao realizar assinatura" }, { status: 400 });
        }

    }
}