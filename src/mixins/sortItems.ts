import { ReadablePlanet } from '../components/models';

export default function useSortItems() {
    function sortByField(descending: boolean, sortBy: string) {
        const sortFn = (a: ReadablePlanet, b: ReadablePlanet) => {
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            //@ts-ignore
            const valueA = a[sortBy];
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            //@ts-ignore
            const valueB = b[sortBy];
            if (valueB < valueA) return descending ? -1 : 1;
            if (valueB > valueA) return descending ? 1 : -1;
            return 0;
        }
        return sortFn;
    }

    return {
        sortByField
    };
}
