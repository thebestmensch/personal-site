import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { SITE } from "@/config";

dayjs.extend(utc);
dayjs.extend(timezone);

// Format a post's pub/mod date as "MM / YYYY" in the post's configured
// timezone (falling back to SITE.timezone), matching Datetime.astro's policy.
// Without this, build-time Date.getMonth() on Cloudflare's UTC runner can
// render a post timestamped late-evening Central as the next month.
export function formatMonthYear(
  d: string | Date,
  postTimezone?: string
): string {
  return dayjs(d)
    .tz(postTimezone || SITE.timezone)
    .format("MM / YYYY");
}
