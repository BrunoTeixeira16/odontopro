import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy";
import { Reminders } from "./_components/reminder/reminders";
import { Appointments } from "./_components/appointments/appointments";
import { checkSubscription } from "@/utils/permissions/checkSubscription";
import { LabelSubscription } from "@/components/ui/label-subscription";

export default async function Dashboard() {
    const session = await getSession();

    if (!session) {
        redirect("/");
    }

    const subscription = await checkSubscription(session?.user?.id!);

    return (
        <main>
            <div className="space-x-2 flex items-center justify-end">
                {subscription?.subscriptionStatus === "EXPIRED" ? (
                        <Button className="bg-emerald-500 hover:bg-emerald-400 flex-1 md:flex-[0]" disabled>
                            <Calendar className="w-5 h-5"/>
                            <span>Novo Agendamento</span>
                        </Button>
                ) : (
                    <Link href={`/clinic/${session.user?.id}`} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-emerald-500 hover:bg-emerald-400 flex-1 md:flex-[0]">
                            <Calendar className="w-5 h-5"/>
                            <span>Novo Agendamento</span>
                        </Button>
                    </Link>
                )}

                <ButtonCopyLink userId={session.user?.id!} isPermission={subscription?.subscriptionStatus === "EXPIRED"}/>
            </div>

            {subscription?.subscriptionStatus === "EXPIRED" && (
                <LabelSubscription expired={true} />
            )}

            {subscription?.subscriptionStatus === "TRIAL" && (
                <div className="bg-green-500 text-white text-sm md:text-base px-3 py-2 rounded-md flex flex-col md:flex-row md:items-center justify-between my-2">
                    <p className="font-semibold">{subscription?.message}</p>
                    <Link href="/dashboard/plans" className="bg-zinc-900 hover:bg-zinc-800 duration-300 text-white px-3 py-1 rounded-md w-fit">Atualizar Plano</Link>
                </div>
            )}

            {subscription?.subscriptionStatus !== "EXPIRED" && (
                <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">

                    <Appointments userId={session.user?.id!} />
                    
                    <Reminders userId={session.user?.id!} />

                </section>
            )}
        </main>
    )
}