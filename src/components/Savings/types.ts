export interface Saving {
    ID: number,
    name: string,
    amount: number,
    description: string
}

export type SavingFormType = Omit<Saving, 'ID'>;
