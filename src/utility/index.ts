// 🔥 Utility per ottenere chiavi nidificate di un oggetto
export type NestedKeys<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object // 👈 Qui forziamo `K` a essere una `string`
        ? `${Prefix}${K}` | NestedKeys<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

// 🔥 Funzione per estrarre chiavi annidate da `value`
export const getNestedKeys = <T>(obj: T, prefix = ''): string[] => {
  if (typeof obj !== 'object' || obj === null) return [];
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${String(key)}` : String(key); // 👈 Convertiamo `key` in `string`
    return value && typeof value === 'object'
      ? [fullKey, ...getNestedKeys(value, fullKey)]
      : [fullKey];
  });
};
