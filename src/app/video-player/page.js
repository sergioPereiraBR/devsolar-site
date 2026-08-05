'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VideoPlayerPage() {
  const searchParams = useSearchParams();
  const videoRef = useRef(null);

  const rawSrc = searchParams.get('src') || '';
  const title = searchParams.get('title') || 'Depoimento DEV Solar';
  const src = typeof rawSrc === 'string' ? decodeURIComponent(rawSrc) : '';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const startPlayback = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('canplay', startPlayback, { once: true });
    }
  }, [src]);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <a
        href="/"
        style={{
          color: '#fff',
          textDecoration: 'none',
          marginBottom: '16px',
          alignSelf: 'flex-start',
        }}
      >
        ← Voltar para o site
      </a>

      <h1
        style={{ fontSize: '20px', marginBottom: '12px', textAlign: 'center' }}
      >
        {title}
      </h1>

      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
        src={src}
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '70vh',
          background: '#000',
          objectFit: 'contain',
        }}
      />
    </main>
  );
}
