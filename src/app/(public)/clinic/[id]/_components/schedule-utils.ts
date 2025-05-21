
/**
 * - Verificar se a data selecionada é igual a data atual;
 * @param {Date} date // Data selecionada;
 * @returns {boolean} // Se a data passar ou não na comparação retorna (true / false);
 * 
 * @example
 * - Se a data selecionada for igual a data atual; Retorna: true;
 */
export function isToday(date: Date) {

    const now = new Date();

    return (
        date.getFullYear() === now.getFullYear()&&
        date.getMonth() === now.getMonth()&&
        date.getDate() === now.getDate()
    )

}


/**
 * - Verificar se determinado slot já passou.
 * @param {string} slotTime
 * @returns {boolean} // Se a hora passar ou não na comparação retorna (true / false);
 * 
 * @example
 * - Se a hora selecionada for menor que a hora atual retorna (true) querendizer que a hora já passou;
 * - Se as horas selecionadas e atual for igual, compara-se se os minutos selecionados é menor ou igual aos minutos atuais retornando (true);
 * - Caso não passe e nenhuma dessas verificações retorna (false);
 */
export function isSlotInThePast(slotTime: string) {

    const [slotHour, slotMinute] = slotTime.split(":").map(Number);

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (slotHour < currentHour) {
        return true;
    } else if (slotHour === currentHour && slotMinute <= currentMinute) {
        return true;
    }

    return false;

}

/**
 * - Verificar se a partir de um slot inicial existe uma sequência de "requiredSlots" disponíveis;
 * @param {string} startSlot - Primeiro horário disponível;
 * @param {number} requiredSlots - Quantidade de slots necessários;
 * @param {string[]} allSlots - Todos os horários da clínica;
 * @param {string[]} blockedSlots - Horários bloqueados;
 * @returns {boolean} // Se a sequência de slots disponíveis para agendamento estiver disponível retorna (true / false);
 * 
 * @example
 * - Se um serviço tem 2 requiredSlots e começa no time 15:00, precisa garantir que 15:00 e 15:30 não estejam no nosso blockedSlots;
 */
export function isSlotSequenceAvailable(startSlot: string, requiredSlots: number, allSlots: string[], blockedSlots: string[]) {

    const startIndex = allSlots.indexOf(startSlot);

    if (startIndex === -1 || startIndex + requiredSlots > allSlots.length) {
        return false;
    }

    for (let i = startIndex; i < startIndex + requiredSlots; i++) {
        const slotTime = allSlots[i];

        if (blockedSlots.includes(slotTime)) {
            return false;
        }
    }
    
    return true;

}