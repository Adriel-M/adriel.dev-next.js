export const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0]
}
