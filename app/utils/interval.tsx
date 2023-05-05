export function fromSecondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = seconds - hours * 3600 - minutes * 60;

  return `${hours ? String(hours).padStart(2, "0") + ":" : ""}${
    minutes ? String(minutes).padStart(2, "0") + ":" : ""
  }${String(secondsLeft).padStart(2, "0")}`;
}

export function fromSecondsToTimeStringWithoutSeconds(
  seconds: number
): string | null {
  if (!seconds) return null;
  const fullString = fromSecondsToTimeString(seconds);
  const [hours, minutes] = fullString.split(":");

  // remove leading 0
  if (hours === "00") {
    return `${minutes}m`;
  }

  //remove first 0
  if (hours.startsWith("0")) {
    return `${hours.slice(1)}h${minutes}`;
  }

  return `${hours}h${minutes}`;
}
