const format = (date: Date, locale: string | string[], options: any) =>
  new Intl.DateTimeFormat(locale, options).format(date);
