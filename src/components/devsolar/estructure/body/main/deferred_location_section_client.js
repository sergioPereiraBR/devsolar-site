'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const LocationSectionDS = dynamic(() => import('./location_ds'), {
  ssr: false,
});

export default function DeferredLocationSectionDS() {
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
        <LocationSectionDS />
      ) : (
        <div style={{ minHeight: '620px' }} aria-hidden="true" />
      )}
    </div>
  );
}
