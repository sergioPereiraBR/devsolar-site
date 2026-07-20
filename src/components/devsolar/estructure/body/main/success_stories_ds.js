'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap'; // Import Button

import styles from './success_stories_ds.module.css'; // Usaremos CSS Modules

const SuccessStoriesCarousel = dynamic(
  () => import('./success_stories_carousel_client'),
  { ssr: false },
);

export default function SuccessStoriesDS() {
  const sectionRef = useRef(null);
  const [shouldRenderCarousel, setShouldRenderCarousel] = useState(false);

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
              Cases de Sucesso
            </h2>
            <p className={`${styles.sectionSubtitle} lead`}>
              Conheça quem já está economizando com energia solar
            </p>
          </div>

          {shouldRenderCarousel ? (
            <SuccessStoriesCarousel />
          ) : (
            <div className={styles.carouselPlaceholder} aria-hidden="true" />
          )}
        </Container>
      </section>
    </>
  );
}
