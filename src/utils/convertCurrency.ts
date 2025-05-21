// - Valor em Centavos = valor em reais * 100
// - Valor em Reais = valor em centavos / 100

/**
 * Converte um valor monetário em reais (BRL) para centavos.
 * @param {string} amount - O valor monetário em reais (BRL) a ser convertido."
 * @returns {number} O valor convertido em centavos.
 * 
 * @example
 * convertRealToCents("1.300,50"); // Retorna: 130050 centavos
 */
export function convertRealToCents(amount: string) {
    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
    const priceInCents = Math.round(numericPrice * 100)

    return priceInCents;
}