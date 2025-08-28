/**
 * Displays how much time has passed since a given date in terms of years, months, and days.
 * Only includes years, months, or days in the output if they are at least 1.
 *
 * @param date - The reference date to calculate time since
 * @returns A formatted string describing the time elapsed
 */
export function displaySinceInfo(date: Date | string | number): string {
  const inputDate = new Date(date);
  const currentDate = new Date();

  // Make sure the input date is valid and in the past
  if (isNaN(inputDate.getTime())) {
    return "Invalid date";
  }

  if (inputDate > currentDate) {
    return "This date is in the future";
  }

  // Calculate years difference
  let years = currentDate.getFullYear() - inputDate.getFullYear();

  // Calculate months difference
  let months = currentDate.getMonth() - inputDate.getMonth();

  // Calculate days difference
  let days = currentDate.getDate() - inputDate.getDate();

  // Adjust if necessary
  if (days < 0) {
    // Get the number of days in the previous month
    const lastDayOfPrevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    days += lastDayOfPrevMonth;
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  // Build the display string
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  }

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  }

  // Handle the case where less than a day has passed
  if (parts.length === 0) {
    return "Less than a day";
  }

  return parts.join(", ");
}
