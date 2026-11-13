// Troca metades soltas de emoji (surrogates isolados) por "�".
// Sem isso, encodeURIComponent lança URIError (ex.: texto salvo corrompido
// ou corte com slice no meio de um emoji).
const SURROGATE_ISOLADO = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;

export function textoBemFormado(texto: string): string {
  return texto.replace(SURROGATE_ISOLADO, "�");
}
