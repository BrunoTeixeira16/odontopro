export type PlanDetailsProps = {
    maxServices: number;
}

export type PlanProps = {
    BASIC: PlanDetailsProps;
    INTERMEDIARY: PlanDetailsProps;
    PROFESSIONAL: PlanDetailsProps;
}

export const PLANS: PlanProps = {
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

export const subscriptionPlans = [
    {
        id: "BASIC",
        name: "Basic",
        description: "Perfeito para clínicas menores",
        oldPrice: "R$97,90",
        price: "R$49,90",
        features: [
            `Até ${PLANS["BASIC"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte',
            'Relatórios',
        ]
    },
    {
        id: "INTERMEDIARY",
        name: "Intermediary",
        description: "Perfeito para clínicas de tamanho médio",
        oldPrice: "R$147,90",
        price: "R$89,90",
        features: [
            `Até ${PLANS["INTERMEDIARY"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte 1x1',
            'Relatórios Intermediários',
        ]
    },
    {
        id: "PROFESSIONAL",
        name: "Professional",
        description: "Perfeito para clínicas grandes",
        oldPrice: "R$197,90",
        price: "R$139,90",
        features: [
            `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
            'Agendamentos ilimitados',
            'Suporte Prioritário',
            'Relatórios Avançados',
        ]
    }
]