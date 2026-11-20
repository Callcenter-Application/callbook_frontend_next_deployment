/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** "Maria Gómez" → "MG" */
export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** 252 → "04:12" */
export function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Count items in `list` whose `key` equals `value`. */
export function countBy<T, K extends keyof T>(list: readonly T[], key: K, value: T[K]) {
  return list.filter((item) => item[key] === value).length;
}
