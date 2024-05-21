import { SAVING_COLOR_MAPPER } from "../config";

type SavingName = keyof typeof SAVING_COLOR_MAPPER;

export const generateChartData = (data: { name: SavingName; amount: number }[]) => {
    const result = {
        names: [] as string[],
        amounts: [] as number[],
        colors: [] as string[]
    };

    const nameToIndex: { [key: string]: number } = {};

    data.forEach(saving => {
        if (nameToIndex.hasOwnProperty(saving.name)) {
            // If the name exists, add to the corresponding amount
            const index = nameToIndex[saving.name];
            result.amounts[index] += saving.amount;
        } else {
            // If the name does not exist, add a new entry
            nameToIndex[saving.name] = result.names.length;
            result.names.push(saving.name);
            result.amounts.push(saving.amount);

            // TODO: handle this better
            result.colors.push(SAVING_COLOR_MAPPER[saving.name])
        }
    });

    return result;
};
