export function getKeyByValue<T extends object, K extends keyof T>(
  object: T,
  value: T[K]
): K {
  const key = Object.keys(object).find(
    (key) => object[key as K] === value
  ) as K;

  if (key !== value && typeof key !== 'undefined') {
    return key;
  }

  return value as any;
}
