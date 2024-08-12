export function formateEventName(str: string) {
  const regex = /^on([a-z0-9]+)/i;
  const replacer = (match: string, p1: string) => `on${p1.charAt(0).toUpperCase() + p1.slice(1)}`;
  return str.replace(regex, replacer);
}