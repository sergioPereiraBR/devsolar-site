'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';

import { seoStories } from './success_stories_data';
import styles from './success_stories_ds.module.css';
import SuccessStoriesSkeleton from './success_stories_skeleton';

const SuccessStoriesCarousel = dynamic(
  () => import('./success_stories_carousel_client'),
  {
    ssr: false,
    loading: () => <SuccessStoriesSkeleton />,
  },
);

export default function SuccessStoriesDS() {
  const sectionRef = useRef(null);
  const [shouldRenderCarousel, setShouldRenderCarousel] = useState(false);
  // const reviewSchema = {
  //   '@context': 'https://schema.org',
  //   '@type': 'success stories',
  //   name: 'DEV Solar',
  //   review: seoStories.map((story) => ({
  //     '@type': 'Review',
  //     name: `Caso de Sucesso: ${story.title}`,
  //     reviewBody: `${story.resume} ${story.description}`,
  //     author: {
  //       '@type': 'Person',
  //       name: `Cliente ${story.title}`,
  //     },
  //   })),
  // };

  useEffect(() => {
    if (
      shouldRenderCarousel ||
      !sectionRef.current ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          setShouldRenderCarousel(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [shouldRenderCarousel]);

  return (
    <>
      <section
        ref={sectionRef}
        id="cases"
        className={styles.sectionCases}
        aria-labelledby="cases-title"
      >
        <Container>
          <div className="mb-5 text-center">
            <h2 id="cases-title" className={`${styles.sectionTitle} fw-bold`}>
              Cases de sucesso das nossas instalações
            </h2>
            <p className={`${styles.sectionSubtitle} lead`}>
              Conheça quem já está economizando com energia solar
            </p>

            <div className="d-flex justify-content-center mt-5 pt-2">
              <a
                href="https://www.google.com/search?q=dev+solar#lrd=0x9963a865267047:0xe012023a2b57908d,1"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={styles.googleRatingBadge}
                aria-label="Ver avaliações da DEV Solar no Google"
              >
                <div className={styles.googleLogo} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.09z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.09c.95-2.85 3.6-4.96 6.72-4.96z"
                    />
                  </svg>
                </div>
                <div className={styles.ratingInfo}>
                  <span className={styles.stars}>★★★★★</span>
                  <span className={styles.score}>
                    <strong>5.0</strong> Excelente no Google
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div
            className={styles.seoOnlyContent}
            aria-label="Depoimentos de clientes para indexacao"
          >
            {seoStories.map((story) => (
              <article
                key={`seo-story-${story.id}`}
                className={styles.seoProofCard}
              >
                <h3 className={styles.seoProofTitle}>{story.title}</h3>
                <p className={styles.seoProofResume}>{story.resume}</p>
                <p className={styles.seoProofDescription}>
                  {story.description}
                </p>
                <div className={styles.seoProofMeta}>
                  <span className={`badge ${styles.badgePrimary}`}>
                    {story.type}
                  </span>
                  <span className={`badge ${styles.badgeSecondary}`}>
                    {story.impact}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {shouldRenderCarousel ? (
            <SuccessStoriesCarousel />
          ) : (
            <SuccessStoriesSkeleton />
          )}

          {/* <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
          /> */}
        </Container>
      </section>
    </>
  );
}
