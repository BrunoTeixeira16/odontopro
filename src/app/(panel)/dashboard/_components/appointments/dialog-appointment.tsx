
import { DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-list";
import { format } from "date-fns"
import { formatCurrency } from "@/utils/formatCurrency";
import { Users } from "lucide-react";

interface DialogAppointmentProps { 
    appointment: AppointmentWithService | null;
 }

export function DialogAppointment({ appointment }: DialogAppointmentProps) {    

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Detalhes do Agendamento</DialogTitle>
                <DialogDescription>Veja todos os detalhes do agendamento.</DialogDescription>
            </DialogHeader>

            <div className="py-4">
                
                {appointment && (
                    <article>
                        
                        <div className="flex flex-col justify-between mb-1 md:flex-row">
                            <p><span className="font-semibold">Data de Agendamento:</span> {new Intl.DateTimeFormat("pt-BR", {
                                timeZone: "UTC",
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                            }).format(new Date(appointment.appointmentDate))} </p>
                            <p><span className="font-semibold">Horário Agendado:</span> {appointment.time}</p>
                        </div>

                        <div className="outline p-2">
                            <div className="flex justify-between ">
                                <p className="font-semibold mb-2 text-gray-500 underline">DADOS PESSOAIS:</p>
                                <Users className="w-5 h-5 text-gray-500"/>
                            </div>
                            <p><span className="font-semibold">Nome:</span> {appointment.name}</p>
                            <p><span className="font-semibold">Telefone:</span> {appointment.phone}</p>
                            <p><span className="font-semibold">Email:</span> {appointment.email}</p>
                        </div>

                        <section className="flex justify-between bg-gray-100 mt-4 p-2 rounded-md">
                            <p><span className="font-semibold">Serviço:</span> {appointment.service.name}</p>
                            <p><span className="font-semibold">Preço do Serviço:</span> { formatCurrency((appointment.service.price) / 100) }</p>
                        </section>
                    </article>
                )}

            </div>
        </DialogContent>
    )
}