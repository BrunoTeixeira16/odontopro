
const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 0
})

/**
 * Formata um valor para moeda brasileira
 * @param {number} number // O valor a ser formatado
 * @returns {number} // O valor formatado em Reais
 * 
 * @example
 * formatCurrency(1000); // Retorna: R$ 1.000,00
 */
export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}