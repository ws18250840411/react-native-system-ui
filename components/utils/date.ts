export class DateUtils {
  static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  static formatDate(date: Date, format: string = "YYYY-MM-DD"): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());

    return format
      .replace("YYYY", String(year))
      .replace("MM", month)
      .replace("DD", day);
  }

  static padZero(num: number): string {
    return num < 10 ? `0${num}` : String(num);
  }

  static compareDate(date1: string | Date, date2: string | Date): number {
    const time1 = new Date(date1).getTime();
    const time2 = new Date(date2).getTime();
    return time1 - time2;
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
