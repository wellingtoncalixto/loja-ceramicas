import Image from "next/image";
import { PinIcon } from "@/components/icons/icons";
import { MapLink } from "@/components/ui/MapLink/MapLink";
import {
  linkTelefone,
  lojaEndereco,
  lojaHorario,
  lojaInstagram,
  lojaLocal,
  lojaTelefones,
} from "@/data/store";
import styles from "./VisitStore.module.scss";

// Celular e tablet: foto escondida (não é baixada). Desktop: coluna direita de 440px.
const tamanhosFoto = "(min-width: 1024px) 440px, 1px";

/** "Visite a loja": endereço, horário, telefones e "Como chegar" (Google Maps). */
export function VisitStore() {
  return (
    // id: destino do link "Contato" do rodapé (/sobre#contato).
    <section id="contato" aria-labelledby="visite-titulo" className={styles.visite}>
      <div className={styles.conteudo}>
        <div className={styles.info}>
          <h2 id="visite-titulo" className={styles.titulo}>
            Visite a loja
          </h2>

          <dl className={styles.dados}>
            <div className={styles.item}>
              <dt className={styles.rotulo}>Onde fica</dt>
              <dd className={styles.valor}>
                {lojaLocal}
                <br />
                {lojaEndereco}
              </dd>
            </div>

            <div className={styles.item}>
              <dt className={styles.rotulo}>Horário</dt>
              {lojaHorario.map((linha) => (
                <dd key={linha.dias} className={styles.valor}>
                  {linha.dias}: {linha.horas}
                </dd>
              ))}
            </div>

            <div className={styles.item}>
              <dt className={styles.rotulo}>Telefones</dt>
              {lojaTelefones.map((telefone) => (
                <dd key={telefone.numero} className={styles.valor}>
                  <a href={linkTelefone(telefone)} className={styles.link}>
                    {telefone.exibicao}
                  </a>
                </dd>
              ))}
            </div>

            <div className={styles.item}>
              <dt className={styles.rotulo}>Instagram</dt>
              <dd className={styles.valor}>
                <a
                  href={lojaInstagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {lojaInstagram.usuario}
                  <span className={styles.oculto}> (abre o Instagram em nova aba)</span>
                </a>
              </dd>
            </div>
          </dl>

          <MapLink className={styles.botao}>
            <PinIcon className={styles.icone} />
            Como chegar
          </MapLink>
        </div>

        <div className={styles.midia}>
          <Image
            src="/images/demonstracao/03-galeria/19-galeria-detalhe-tampa-madeira.png"
            alt="Pote de porcelana com tampa de madeira"
            fill
            sizes={tamanhosFoto}
            className={styles.foto}
          />
        </div>
      </div>
    </section>
  );
}
