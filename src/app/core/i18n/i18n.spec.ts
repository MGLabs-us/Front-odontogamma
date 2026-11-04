import { AppTranslocoLoader } from './transloco-loader';
import { LANGS } from './languages';
import { PARENT_REDIRECTS, ROUTE_PATHS, SERVICE_SLUGS, buildPath, serviceIdFromSlug } from './route-map';
import { deepMerge } from './merge';

type Dict = Record<string, unknown>;

/** Aplana un diccionario a `ruta.clave -> valor` (las listas usan el índice como clave). */
function flat(node: unknown, prefix = ''): Map<string, unknown> {
  const out = new Map<string, unknown>();
  const walk = (n: unknown, p: string) => {
    if (Array.isArray(n)) n.forEach((v, i) => walk(v, `${p}${i}.`));
    else if (n && typeof n === 'object') Object.entries(n).forEach(([k, v]) => walk(v, `${p}${k}.`));
    else out.set(p.slice(0, -1), n);
  };
  walk(node, prefix);
  return out;
}

const params = (s: string) => (s.match(/\{\{\s*\w+\s*\}\}/g) ?? []).map(x => x.replace(/\s/g, '')).sort().join('|');

describe('diccionarios de idiomas', () => {
  const loader = new AppTranslocoLoader();
  let es: Map<string, unknown>;
  let enUs: Map<string, unknown>;
  let enGb: Map<string, unknown>;

  beforeAll(async () => {
    es = flat(await loader.getTranslation('es'));
    enUs = flat(await loader.getTranslation('en-us'));
    enGb = flat(await loader.getTranslation('en-gb'));
  });

  it('en-us tiene exactamente las mismas claves que es', () => {
    expect([...enUs.keys()].sort()).toEqual([...es.keys()].sort());
  });

  it('en-gb (ya mezclado con en-us) tiene las mismas claves', () => {
    expect([...enGb.keys()].sort()).toEqual([...enUs.keys()].sort());
  });

  it('no hay textos vacíos', () => {
    for (const [lang, map] of [['es', es], ['en-us', enUs], ['en-gb', enGb]] as const) {
      const empty = [...map].filter(([k, v]) => typeof v === 'string' && v.trim() === '').map(([k]) => k);
      expect({ lang, empty }).toEqual({ lang, empty: [] });
    }
  });

  it('los parámetros {{ x }} coinciden en todos los idiomas', () => {
    const bad = [...es]
      .filter(([k, v]) => typeof v === 'string' && params(v) !== params(String(enUs.get(k))))
      .map(([k]) => k);
    expect(bad).toEqual([]);
  });

  it('ningún texto en inglés quedó igual que el español (salvo nombres propios)', () => {
    const allowed = /^(Odontogamma Oriente|Dr\. Jaime Arcila Cano|Odontogamma Oriente · El Carmen de Viboral|El Carmen de Viboral|Cl\. 30 #33-80, El Carmen de Viboral, Antioquia, Colombia\.|Dr\. Jaime|Arcila Cano|Error 404|[\d\s.,:/&·%()+\-–—*]+)$/;
    const same = [...es]
      .filter(([k, v]) => typeof v === 'string' && v === enUs.get(k) && !allowed.test(v) && !k.includes('.id'))
      .map(([k, v]) => `${k}: ${v}`);
    expect(same).toEqual([]);
  });
});

describe('deepMerge', () => {
  it('sobrescribe sólo lo que cambia y reemplaza los arreglos completos', () => {
    const base = { a: { x: 'color', y: 'same' }, list: ['1', '2'] } as Dict;
    const merged = deepMerge(base, { a: { x: 'colour' }, list: ['uno'] });
    expect(merged).toEqual({ a: { x: 'colour', y: 'same' }, list: ['uno'] });
  });
});

describe('mapa de rutas', () => {
  it('construye la ruta de cada idioma con su prefijo', () => {
    expect(buildPath('en-us', 'home')).toBe('/');
    expect(buildPath('es', 'home')).toBe('/es');
    expect(buildPath('en-gb', 'about')).toBe('/en-gb/who-we-are/about-us');
    expect(buildPath('es', 'service-detail', 'carillas-porcelana')).toBe('/es/servicios/carillas-porcelana');
    expect(buildPath('en-us', 'service-detail', 'porcelain-veneers')).toBe('/treatments/porcelain-veneers');
  });

  it('no repite rutas dentro de un mismo idioma', () => {
    for (const lang of LANGS) {
      const paths = Object.entries(ROUTE_PATHS)
        .filter(([key]) => key !== 'home' && key !== 'service-detail')
        .map(([, p]) => p[lang]);
      expect(new Set(paths).size).toBe(paths.length);
    }
  });

  it('cada slug de tratamiento se resuelve al mismo id en cualquier idioma', () => {
    for (const [id, slugs] of Object.entries(SERVICE_SLUGS)) {
      for (const lang of LANGS) expect(serviceIdFromSlug(slugs[lang])).toBe(id);
    }
  });

  it('los segmentos padre redirigen a una página existente', () => {
    for (const r of PARENT_REDIRECTS) expect(ROUTE_PATHS[r.to]).toBeDefined();
  });
});
