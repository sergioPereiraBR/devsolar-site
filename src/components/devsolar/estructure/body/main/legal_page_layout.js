import Link from 'next/link';

import FooterDS from '../footer/footer_ds';
import NavDS from '../header/nav_ds';
import styles from './legal_page_layout.module.css';

export default function LegalPageLayout({
  title,
  intro,
  lastUpdated,
  sections,
}) {
  return (
    <>
      <NavDS />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <Link href="/" className={styles.backLink}>
              ← Voltar para a home
            </Link>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.intro}>{intro}</p>
            {lastUpdated ? (
              <p className={styles.updated}>
                Última atualização: {lastUpdated}
              </p>
            ) : null}
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            <div className={styles.card}>
              {sections.map((section) => (
                <article key={section.title} className={styles.section}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  {section.content}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterDS />
    </>
  );
}
