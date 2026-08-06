'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function VideoPlayerContent() {
  const searchParams = useSearchParams();
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

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
    video.setAttribute('x-webkit-airplay', 'allow');

    const handleCanPlay = () => {
      setIsReady(true);
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
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

      {!isReady && (
        <p style={{ marginTop: '12px', color: '#ccc', fontSize: '14px' }}>
          Se o vídeo não iniciar, toque no player para reproduzir manualmente.
        </p>
      )}
    </main>
  );
}

export default function VideoPlayerPage() {
  return (
    <Suspense
      fallback={
        <div style={{ color: '#fff', padding: '24px' }}>
          Carregando vídeo...
        </div>
      }
    >
      <VideoPlayerContent />
    </Suspense>
  );
}
