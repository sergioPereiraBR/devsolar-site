'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const SuccessStoriesDS = dynamic(() => import('./success_stories_ds'), {
  ssr: false,
});

export default function DeferredSuccessStoriesDS() {
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
        <SuccessStoriesDS />
      ) : (
        <div style={{ minHeight: '520px' }} aria-hidden="true" />
      )}
    </div>
  );
}
