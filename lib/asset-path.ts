/**
 * En GitHub Pages el sitio no cuelga de la raíz, sino de /importadora-prototipo.
 * `basePath` de Next reescribe rutas y chunks, pero NO el `src` de <Image>
 * cuando `images.unoptimized` está activo (obligatorio con `output: "export"`).
 * Toda ruta a /public tiene que pasar por aquí.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(src?: string) {
  if (!src) return src;
  if (/^(https?:)?\/\/|^data:|^blob:/.test(src)) return src;
  if (!src.startsWith("/")) return src;
  if (BASE_PATH && src.startsWith(`${BASE_PATH}/`)) return src;
  return `${BASE_PATH}${src}`;
}
