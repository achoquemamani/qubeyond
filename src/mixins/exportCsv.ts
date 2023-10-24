export default function useExportCsv() {
    const wrapCsvValue = (val: string) => {
        let formatted = val.toString();

        formatted = formatted.split('"').join('');
        formatted = formatted.split(',').join(' -');
        return `${formatted}`;
    };

    const getContent = (
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        columns: any[],
        items: any[]) => {
        const content = [columns.map((col) => wrapCsvValue(col.label))]
            .concat(
                items.map((row) =>
                    columns
                        .map((col) => wrapCsvValue(row[col.field]))
                        .join(',')
                )
            )
            .join('\r\n');
        return content;
    };

    return {
        getContent, wrapCsvValue
    };
}
