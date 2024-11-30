export class DateUtils {

    static mdxOld(date: string): string {
        return `[Time].[Time].[Day].&[${date}]`;
    }

    public static mdx(date: string): string {
        return `[Time].[Time].[Day].lookupByKey(${date})`;
    }

    static dateEvent(date: Date): string {

        const y = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
        const m = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
        const d = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);

        return `${d} ${m} ${y}`;

    }

    static dateMdx(date: Date): string {


        const y = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
        const m = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(date);
        const d = new Intl.DateTimeFormat('en', {day: 'numeric'}).format(date);

        return `DateTime(${y},${m},${d})`;

    }

    static rangeMdx(to: Date, from: Date) {
        return "filter([Time].[Time].[Day] as b, b.currentMember.key >>= " + DateUtils.dateMdx(to) + " and b.currentMember.key <<= " + DateUtils.dateMdx(from) + ")";
    }

    static mdxFromDate(date: Date) {
        return DateUtils.mdx(DateUtils.dateMdx(date));
    }
}