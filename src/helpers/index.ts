export function formatCurrency(quantity: number) {
    return new Intl.NumberFormat('es-CR', {
        style: 'currency', currency: 'CRC'
    }).format(quantity);
}
