"use server"

import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";
import { Session } from "next-auth";
import { getPlan } from "./get-plans";
import { PLANS } from "@/utils/plans/index";
import { checkSubscriptionExpired } from "./checkSubscriptionExpired";
import { ResultPermissionProp } from "./canPermission";

export async function canCreateService(subscription: Subscription | null, session: Session): Promise<ResultPermissionProp> {

    try {

        const serviceCount = await prisma.service.count({
            where: {
                userId: session.user.id,
                status: true,
            }
        })

        if (subscription && subscription.status === "active") {

            const plan = subscription.plan;

            const planLimits = await getPlan(plan);

            return {
                hasPermission: planLimits.maxServices === null || serviceCount < planLimits.maxServices,
                planId: subscription.plan,
                expired: false,
                plan: PLANS[subscription.plan],
            }

        }

        // PERIODO TRIAL

        const checkUserLimit = await checkSubscriptionExpired(session);

        return checkUserLimit;

    } catch(err) {

        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: false,
            plan: null,
        }

    }

}