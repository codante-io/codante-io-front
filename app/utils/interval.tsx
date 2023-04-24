export function fromSecondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = seconds - hours * 3600 - minutes * 60;

  return `${hours ? String(hours).padStart(2, "0") + ":" : ""}${
    minutes ? String(minutes).padStart(2, "0") + ":" : ""
  }${String(secondsLeft).padStart(2, "0")}`;
}
