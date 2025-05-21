import { Suspense } from "react";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServiceContent } from "./_components/service-content";

export default async function Services() {
    const session = await getSession();
    
    if (!session) {
        redirect("/");
    }
    
    return (
        <Suspense fallback={<div className="flex flex-col items-center mt-[45vh]"><div className="border-solid border-[4px] border-[#e5e5e5] border-t-[#51d4db] h-[25px] w-[25px] rounded-full animate-spin"></div><p className="text-lg font-semibold">Carregando...</p></div>}>
            <ServiceContent userId={session.user?.id!}/>
        </Suspense>
    )
}