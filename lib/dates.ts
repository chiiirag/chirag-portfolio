const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-09-01" → "Sep 2024" */
export function formatMonth(isoDate: string): string {
  const [year, month] = isoDate.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "2024-09-01" → "2024-09", for <input type="month">. */
export function toMonthInput(isoDate: string | null | undefined): string {
  return isoDate ? isoDate.slice(0, 7) : "";
}

/** LinkedIn-style duration, counting both the start and end month: "1 yr 8 mos". */
export function formatDuration(startDate: string, endDate: string | null, now = new Date()): string {
  const [sy, sm] = startDate.split("-").map(Number);
  const [ey, em] = endDate ? endDate.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const total = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years && `${years} yr${years > 1 ? "s" : ""}`, months && `${months} mo${months > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}

/** Whole years since the earliest start date, e.g. for "5+ Years Experience". */
export function yearsSince(startDate: string, now = new Date()): number {
  const [sy, sm] = startDate.split("-").map(Number);
  return Math.floor(((now.getFullYear() - sy) * 12 + (now.getMonth() + 1 - sm)) / 12);
}
