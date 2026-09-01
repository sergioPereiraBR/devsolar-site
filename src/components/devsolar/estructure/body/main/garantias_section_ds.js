'use client';

import styles from './abaut_section_ds.module.css';

const garantiasItems = [
  {
    title: 'Garantia dos produtos',
    description:
      'Cada equipamento recebe o prazo de garantia previsto pelo fabricante, conforme a linha e o modelo contratado.',
  },
  {
    title: 'Projeto de engenharia',
    description:
      'Elaboração de projeto técnico com ART do CREA-RJ, garantindo segurança, adequação e respaldo profissional.',
  },
  {
    title: 'Homologação junto à concessionária',
    description:
      'Acompanhamento completo do processo de homologação com a concessionária, reduzindo retrabalho e acelerando a conexão.',
  },
  {
    title: 'Conformidade regulatória',
    description:
      'Atendimento às leis e normas aplicáveis ao setor de energia solar e elétrica, com foco em legalidade e segurança.',
  },
  {
    title: 'Normas técnicas e certificações',
    description:
      'Conformidade com regras da RECON, NBR da ABNT e padrões internacionais, além de certificações pelo Inmetro para materiais elétricos.',
  },
  {
    title: 'Garantia dos serviços',
    description:
      'Os serviços prestados contam com garantia de execução, respaldando qualidade, rastreabilidade e compromisso com o cliente.',
  },
];

function GarantiasSectionDS() {
  return (
    <section id="garantias" className={styles.sectionAbout}>
      <div className="container">
        <div className="mb-5 text-center">
          <h2 className={`${styles.sectionTitle} fw-bold`}>
            Garantias e conformidades
          </h2>
          <p className={`${styles.sectionSubtitle} lead`}>
            Nossa estrutura é pensada para oferecer segurança técnica, respaldo
            regulatório e tranquilidade em cada etapa.
          </p>
        </div>

        <div className="row g-4">
          {garantiasItems.map((item) => (
            <div className="col-lg-6" key={item.title}>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={`${styles.sectionText} mb-0`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GarantiasSectionDS;
