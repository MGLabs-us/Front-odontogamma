type Dict = { [key: string]: unknown };

const isObject = (v: unknown): v is Dict =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** Mezcla profunda: los valores de `override` sustituyen a los de `base` (los arreglos se reemplazan enteros). */
export function deepMerge(base: Dict, override: Dict): Dict {
  const out: Dict = { ...base };
  for (const [key, value] of Object.entries(override)) {
    out[key] = isObject(value) && isObject(base[key]) ? deepMerge(base[key] as Dict, value) : value;
  }
  return out;
}
