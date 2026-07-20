'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const FAQSectionDS = dynamic(() => import('./faq_section_ds'), {
  ssr: false,
});

export default function DeferredFaqSectionDS() {
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
        <FAQSectionDS />
      ) : (
        <div style={{ minHeight: '860px' }} aria-hidden="true" />
      )}
    </div>
  );
}
