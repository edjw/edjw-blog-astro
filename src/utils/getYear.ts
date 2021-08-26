import { DateTime } from "luxon";

export default function getYear(date) {
    return DateTime.fromFormat(date, 'dd MMMM yyyy').toFormat("yyyy")
}