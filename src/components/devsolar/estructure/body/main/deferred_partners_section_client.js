'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ParceirosFinanceirasSectionDS = dynamic(
  () => import('./parceiros_financeiras_ds'),
  { ssr: false },
);

export default function DeferredPartnersSectionDS() {
  const triggerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (
      shouldRender ||
      !triggerRef.current ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={triggerRef}>
      {shouldRender ? (
        <ParceirosFinanceirasSectionDS />
      ) : (
        <div style={{ minHeight: '760px' }} aria-hidden="true" />
      )}
    </div>
  );
}
