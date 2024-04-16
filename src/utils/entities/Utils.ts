export class Utils {
  static getFormattedTimestamp(date?: Date): string {
    const timestamp = date || new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return timestamp.toLocaleString('ru-RU', options).replace(',', '');
  }
}
