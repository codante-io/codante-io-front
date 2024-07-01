type FormatTimeOptions = {
  removeSeconds?: boolean;
  hourSuffix?: "h" | ":";
  minuteSuffix?: "m" | ":" | "";
  secondsSuffix?: "s" | "";
};

export function formatTime(
  seconds: number,
  options = {
    removeSeconds: true,
    hourSuffix: "h",
    minuteSuffix: "m",
    secondsSuffix: "s",
  } as FormatTimeOptions,
) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  const hoursString = hours > 0 ? `${hours}${options.hourSuffix}` : "";
  const minutesString =
    minutes > 0 || hours > 0 ? `${minutes}${options.minuteSuffix}` : "";
  const secondsString =
    secondsLeft > 0 && !options.removeSeconds
      ? `${secondsLeft}${options.secondsSuffix}`
      : "";

  return `${hoursString}${minutesString}${secondsString}`;
}

export function fromSecondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  const hoursString = hours > 0 ? String(hours).padStart(2, "0") : "00";
  const minutesString =
    minutes > 0 || hours > 0 ? String(minutes).padStart(2, "0") : "00";
  const secondsString = String(secondsLeft).padStart(2, "0");

  return `${hoursString}:${minutesString}:${secondsString}`;
}

export function fromSecondsToTimeStringWithoutSeconds(
  totalSeconds: number,
): string | null {
  if (totalSeconds == null) return null;
  const fullString = fromSecondsToTimeString(totalSeconds);
  const [hours, minutes, seconds] = fullString.split(":");

  console.log("hours", hours);
  console.log("fullString", fullString);

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
