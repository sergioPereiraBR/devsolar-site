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
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DEV Solar',
    review: seoStories.map((story) => ({
      '@type': 'Review',
      name: `Case de Sucesso: ${story.title}`,
      reviewBody: `${story.resume} ${story.description}`,
      author: {
        '@type': 'Person',
        name: `Cliente ${story.title}`,
      },
    })),
  };

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

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
          />
        </Container>
      </section>
    </>
  );
}
