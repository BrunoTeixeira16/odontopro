
export function formatPhone(value: string) {
    // Remover todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Verificar se o valor possui 11 dígitos
    if (cleanedValue.length > 11) {
        return value.slice(0, 15)
    }

    // Aplicar a máscara
    const formattedValue = cleanedValue.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{4,5})(\d{4})$/, '$1-$2')

    return formattedValue;
}

export function extractPhoneNumber(phone: string) {
    const phoneValue = phone.replace(/[\(\)\s-]/g, '')

    return phoneValue;
}