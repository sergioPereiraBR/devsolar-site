'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Row } from 'react-bootstrap';

import styles from './location_map_ds.module.css';

const LocationMap = dynamic(() => import('./location_map_ds'), {
  ssr: false,
  loading: () => <div className={styles.mapPlaceholder} aria-hidden="true" />,
});

function LocationSectionDS() {
  const sectionRef = useRef(null);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Garante hidratação correta na produção
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fallback: renderiza mapa após 2 segundos se IntersectionObserver não disparar
  useEffect(() => {
    if (shouldRenderMap || !isHydrated) {
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setShouldRenderMap(true);
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [shouldRenderMap, isHydrated]);

  // IntersectionObserver para lazy-load otimizado
  useEffect(() => {
    if (
      shouldRenderMap ||
      !isHydrated ||
      !sectionRef.current ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          setShouldRenderMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [shouldRenderMap, isHydrated]);

  return (
    <section
      ref={sectionRef}
      id="location"
      className={`${styles.sectionLocation}`}
      aria-labelledby="location-title"
    >
      {/* Location Section */}
      <div className="container">
        <div className="mb-5 text-center">
          <h2 id="location-title" className={`${styles.sectionTitle} fw-bold`}>
            Nossa localização
          </h2>
          <h3 className={`${styles.sectionSubtitle} lead`}>
            Vamos marcar, encontre sua rota para vir falar com a gente!
          </h3>
        </div>
        {/* Map Section */}
        <Row className="g-4 justify-content-center">
          <div className="col-lg-9">
            {shouldRenderMap ? (
              <LocationMap />
            ) : (
              <div className={styles.mapPlaceholder} aria-hidden="true" />
            )}
          </div>
        </Row>
      </div>
    </section>
  );
}

export default LocationSectionDS;
