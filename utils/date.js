export function DateFormated(date) {
  return date.toISOString().slice(0, 10);
}

export function getFilterDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
