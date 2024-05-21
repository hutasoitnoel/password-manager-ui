export const formatToRupiah = (amount: number, locale: string = 'id-ID', currency: string = 'IDR'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
};