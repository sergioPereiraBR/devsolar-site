'use client';

import styles from './success_stories_ds.module.css';

/**
 * Skeleton loader para o carrossel de histórias de sucesso.
 * Renderiza cards com shimmer effect durante o carregamento.
 */
export default function SuccessStoriesSkeleton() {
  const skeletonCards = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className={`${styles.carouselContainer} ${styles.skeletonContainer}`}>
      <div className={styles.skeletonGrid}>
        {skeletonCards.map((index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonThumbnail} />
            <div className={styles.skeletonCardBody}>
              <div className={styles.skeletonTitle} />
              <div
                className={styles.skeletonText}
                style={{ marginBottom: '8px' }}
              />
              <div
                className={styles.skeletonText}
                style={{ marginBottom: '16px', width: '70%' }}
              />
              <div className={styles.skeletonBadges} />
              <div
                className={styles.skeletonButton}
                style={{ marginBottom: '8px' }}
              />
              <div className={styles.skeletonButton} style={{ width: '80%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
