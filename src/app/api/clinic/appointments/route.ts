import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* 
    > Rota para buscar todos os agendamentos de uma clínica

    > Preciso ter a data
    > Preciso ter o id da clínica (NÃO POSSO RECEBER DA ROTA req.params)
*/

export const GET = auth(async function GET(req) {
    
    if (!req.auth) {
        return NextResponse.json({ error: "Acesso não autorizado!" }, { status: 401 })
    }    

    const searchParams = req.nextUrl.searchParams;

    const dateString = searchParams.get("date") as string;

    const clinicId = req.auth?.user.id

    if (!dateString) {
        return NextResponse.json({ error: "Data não informada!" }, { status: 400 })
    }

    if (!clinicId) {
        return NextResponse.json({ error: "Usuário não encontrada!" }, { status: 400 })
    }

    try {
        // Criar uma data formatada
        const [year, month, day] = dateString.split("-").map(Number);

        const startDate = new Date(Date.UTC(year, month -1, day, 0, 0, 0))
        const endDate = new Date(Date.UTC(year, month -1, day, 23, 59, 59, 999))

        const appointments = await prisma.appointment.findMany({
            where: {
                userId: clinicId,
                appointmentDate: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                service: true,
            }
        })

        return NextResponse.json(appointments)

    } catch(err) {
        return NextResponse.json({ error: "Falha ao buscar agendamento!" }, { status: 400 })
    }

}) as any;