export default function getYear(date: Date): string {
  const dateObject = new Date(date);
  return String(dateObject.getFullYear());
}
