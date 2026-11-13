import styles from "./HowItWorks.module.scss";

const passos = [
  {
    titulo: "Selecione as peças",
    texto: "Escolha as peças e as opções que deseja para compor seu conjunto.",
  },
  {
    titulo: "Revise as combinações",
    texto: "Confira a sua seleção, ajuste as quantidades e inclua observações.",
  },
  {
    titulo: "Confirme com a loja",
    texto: "Envie seu orçamento pelo WhatsApp e converse com a nossa equipe.",
  },
];

/** Faixa "Como funciona" no fim da página de orçamento. */
export function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona-titulo" className={styles.secao}>
      <h2 id="como-funciona-titulo" className={styles.titulo}>
        Como funciona
      </h2>
      <ol className={styles.passos}>
        {passos.map((passo) => (
          <li key={passo.titulo} className={styles.passo}>
            <h3 className={styles.nome}>{passo.titulo}</h3>
            <p className={styles.texto}>{passo.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
