"use server"

import { Plan } from "@prisma/client"
import { PlanProps } from "../plans/index"

export interface PlanDetailInfo {
    maxServices: number;
}

const PLANS_LIMITS: PlanProps = {
    BASIC: {
        maxServices: 3,
    },
    INTERMEDIARY: {
        maxServices: 10
    },
    PROFESSIONAL: {
        maxServices: 50
    }
}

export async function getPlan(planId: Plan) {

    return PLANS_LIMITS[planId];

}