'use client';

import styles from './abaut_section_ds.module.css';

function DevSolarAboutSectionDS() {
  return (
    <section id="sobre-devsolar" className={styles.sectionAbout}>
      <div className="container">
        <div className={`${styles.contentWrapper} row align-items-center g-4`}>
          <div className="col-lg-7">
            <h3 className={styles.sectionTitle}>Sobre a Dev Solar</h3>
            <p className={styles.sectionText}>
              A Dev Solar é uma empresa especializada em soluções de energia
              solar, com foco em eficiência, economia e atendimento de alto
              padrão.
            </p>
            <p className={styles.sectionText}>
              Trabalhamos para transformar o consumo energético de residências e
              empresas, oferecendo projetos personalizados, instalação confiável
              e suporte contínuo.
            </p>
            <p className={`${styles.sectionText} mb-0`}>
              Nossa missão é tornar a energia solar acessível, sustentável e
              vantajosa para cada cliente.
            </p>
          </div>

          <div className="col-lg-5">
            <div className={styles.featureCard}>
              <h4 className={styles.featureTitle}>
                Por que escolher a Dev Solar?
              </h4>
              <ul className={styles.featureList}>
                <li>Atendimento especializado e humano</li>
                <li>Projetos personalizados para cada necessidade</li>
                <li>Qualidade técnica e compromisso com resultado</li>
                <li>Transparência em cada etapa do processo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DevSolarAboutSectionDS;
