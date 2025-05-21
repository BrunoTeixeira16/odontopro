import { redirect } from "next/navigation";
import { getPermissionUserToReports } from "./_data-access/get-permissions-reports"
import getSession from "@/lib/getSession";
import Link from "next/link";
import { BadgeAlert } from "lucide-react";

export default async function Reports() {

    const session = await getSession();
    
    if (!session) {
        redirect("/");
    }

    const user = await getPermissionUserToReports({ userId: session?.user?.id! });

    if (!user) {
        return (
            <main className="mx-auto flex flex-col items-center mt-[25vh] md:mt-[38vh] gap-2 select-none">
                <BadgeAlert className="w-15 h-15 text-red-500"/>
                <h1 className="font-medium text-lg md:text-3xl">Você não tem permissão para acessar essa página.</h1>
                <p className="font-normal text-lg md:text-2xl">Assine o plano <strong>PROFESSIONAL</strong> para ter acesso completo.</p>
                <Link href="/dashboard/plans" className="bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-2 rounded-md w-fit hover:scale-105 duration-300">
                    Dê um upgrade no seu plano.
                </Link>
            </main>
        )
    }

    return (
        <main>
            <h1>Página de Relatórios</h1>
        </main>
    )
}