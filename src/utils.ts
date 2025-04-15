export function toBoolean(value?: boolean | string) {
   if (typeof value === 'boolean') return value;
   if (typeof value === 'string') return value.toLowerCase() === 'true';
   return false;
}
