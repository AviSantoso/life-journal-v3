import { formatInTimeZone } from "date-fns-tz";

export function getDateStr(date: Date) {
  return formatInTimeZone(date, "Australia/Perth", "yyyy-MM-dd");
}
