export function getShortName(name: string, maxLength: number) {
  if (name.length <= maxLength) return name;

  const dots = Array(3).fill(".");

  const stringDesiredLength = maxLength - dots.length;

  const shortname = name.split("").slice(0, stringDesiredLength).join("");

  return shortname + dots.join("");
}
