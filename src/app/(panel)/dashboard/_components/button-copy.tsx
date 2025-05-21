"use client"

import { Button } from "@/components/ui/button"
import { Check, LinkIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
export function ButtonCopyLink({ userId, isPermission }: { userId: string, isPermission: boolean }) {
    const [isCopied, setIsCopied] = useState(false);

    async function handleCopyLink() {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/clinic/${userId}`)

        toast.success("Link de agendamento copiado com sucesso!", { position: "bottom-right" })

        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false)
        }, 2500)
    }

    return (
        <Button onClick={handleCopyLink} className="transition" disabled={isPermission}>
            <AnimatePresence mode="popLayout">
                {isCopied ? <motion.div key="check" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}><Check className="w-5 h-5"/></motion.div> : <motion.div key="copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}><LinkIcon className="w-5 h-5"/></motion.div>}
            </AnimatePresence>
        </Button>
    )
}