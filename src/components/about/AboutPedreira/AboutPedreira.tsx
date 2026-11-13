import styles from "./AboutPedreira.module.scss";

/** Faixa creme sobre Pedreira, a cidade da loja. */
export function AboutPedreira() {
  return (
    <section aria-labelledby="pedreira-titulo" className={styles.pedreira}>
      <div className={styles.conteudo}>
        <h2 id="pedreira-titulo" className={styles.titulo}>
          Em Pedreira, a capital da porcelana.
        </h2>
        <p className={styles.texto}>
          A Loja Rossi fica em Pedreira, cidade do Circuito das Águas Paulista
          conhecida como a capital da porcelana.
        </p>
      </div>
    </section>
  );
}
