import { format, addSeconds } from "date-fns";

export function formatTime(totalSeconds: number, formatString = "H:mm:ss") {
  const helperDate = addSeconds(new Date(0), totalSeconds);

  return format(helperDate, formatString);
}

/**
 * Formats the total number of seconds into a human-readable time format.
 * @param totalSeconds - The total number of seconds to be formatted.
 * @returns A string representing the formatted time in the format "00h00" or "00m" if the total time is less than an hour.
 */
export function humanTimeFormat(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0 && minutes === 0) {
    return `${hours}h`;
  } else if (hours > 0) {
    return `${hours}h${minutes.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}m`;
  }
}

export function fromSecondsToTimeString(
  seconds: number,
  omitHoursWhenZero = true,
): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  const hoursString = hours > 0 ? String(hours).padStart(2, "0") : "00";
  const minutesString =
    minutes > 0 || hours > 0 ? String(minutes).padStart(2, "0") : "00";
  const secondsString = String(secondsLeft).padStart(2, "0");

  if (!hours && omitHoursWhenZero) {
    return `${minutesString}:${secondsString}`;
  }

  return `${hoursString}:${minutesString}:${secondsString}`;
}

export function fromSecondsToTimeStringWithoutSeconds(
  totalSeconds: number,
): string | null {
  if (totalSeconds == null) return null;
  const fullString = fromSecondsToTimeString(totalSeconds);
  const [hours, minutes, seconds] = fullString.split(":");

  // remove leading 0
  if (hours === "00") {
    return `${minutes}m${seconds}`;
  }

  //remove first 0
  if (hours.startsWith("0")) {
    return `${hours.slice(1)}h${minutes}`;
  }

  return `${hours}h${minutes}`;
}

export function getPublishedDateAndTime(
  dateString: string | undefined | null,
): [date: string | null, time: string | null] {
  if (!dateString) return [null, null];
  const date = new Date(dateString);
  const time =
    date.getHours() !== 0
      ? date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      : null;
  return [date.toLocaleDateString("pt-BR"), time];
}
