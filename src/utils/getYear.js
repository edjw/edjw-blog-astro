export default function getYear(date) {
  const dateObject = new Date(date);
  return dateObject.getFullYear();
}
