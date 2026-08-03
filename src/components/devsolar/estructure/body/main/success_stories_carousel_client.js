'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Card, Modal } from 'react-bootstrap';

import { trackEvent } from '@/lib/analytics';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { successStories } from './success_stories_data';
import styles from './success_stories_ds.module.css';

const MIN_SLIDES_FOR_LOOP = 4;

export default function SuccessStoriesCarouselClient() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStoryDetail, setSelectedStoryDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [imageStates, setImageStates] = useState({});
  const videoRef = useRef(null);
  const swiperRef = useRef(null);

  const scheduleCarouselLayout = useCallback(() => {
    if (!swiperRef.current) {
      return;
    }

    window.requestAnimationFrame(() => {
      swiperRef.current?.update();
    });
  }, []);

  useEffect(() => {
    scheduleCarouselLayout();

    const handleResize = () => {
      scheduleCarouselLayout();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [scheduleCarouselLayout]);

  useEffect(() => {
    if (showModal && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showModal, selectedVideo]);

  const handleCardClick = (video) => {
    trackEvent('modal_open', {
      location: 'success_stories',
      modal_name: 'video_preview',
      story_id: video.id,
      story_title: video.title,
    });
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleShowDetails = (story) => {
    trackEvent('modal_open', {
      location: 'success_stories',
      modal_name: 'story_detail',
      story_id: story.id,
      story_title: story.title,
    });
    setSelectedStoryDetail(story);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedStoryDetail(null);
  };

  const handleImageLoad = (storyId) => {
    setImageStates((prev) => ({
      ...prev,
      [storyId]: 'loaded',
    }));
  };

  const handleImageError = (storyId) => {
    setImageStates((prev) => ({
      ...prev,
      [storyId]: 'error',
    }));
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            scheduleCarouselLayout();
          }}
          loop={successStories.length >= MIN_SLIDES_FOR_LOOP}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation={false}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: Math.min(2, successStories.length),
              spaceBetween: 30,
            },
            992: {
              slidesPerView: Math.min(3, successStories.length),
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className={styles.mySwiper}
        >
          {successStories.map((story, index) => (
            <SwiperSlide key={story.id} className={styles.swiperSlide}>
              <Card className={styles.storyCard}>
                <div className={styles.thumbnailContainer}>
                  <button
                    type="button"
                    className={styles.thumbnailButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(story);
                    }}
                    aria-label={`Assistir vídeo do depoimento de ${story.title}`}
                  >
                    <Image
                      src={story.thumbnail}
                      alt={`${story.alt} - Depoimento`}
                      fill
                      className={styles.thumbnailImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'low'}
                      onLoad={() => handleImageLoad(story.id)}
                      onError={() => handleImageError(story.id)}
                      style={{
                        opacity: imageStates[story.id] === 'loaded' ? 1 : 0.5,
                      }}
                    />
                    <span className={styles.thumbnailOverlay}>
                      Assistir Depoimento
                    </span>
                    <span className={styles.playIcon} aria-hidden="true"></span>
                  </button>
                </div>
                <Card.Body style={{ backgroundColor: 'var(--branco)' }}>
                  <Card.Title className={styles.cardTitle}>
                    <h3>{story.title}</h3>
                  </Card.Title>
                  {/* <h4 className={styles.cardShortDescription}>
                    {story.power} - {story.installationDate}
                  </h4>
                  <h4 className={styles.cardShortDescription}>
                    {story.energyProduction}
                  </h4>
                  <h4 className={styles.cardShortDescription}>
                    {story.economicImpact}
                  </h4> */}
                  <h4 className={styles.cardShortDescription}>
                    "{story.resume}"
                  </h4>
                  <div className={styles.badgesContainer}>
                    <span className={`badge ${styles.badgePrimary}`}>
                      {story.type}
                    </span>
                    <span className={`badge ${styles.badgeSecondary}`}>
                      {story.impact}
                    </span>
                  </div>
                  <Button
                    variant="outline-success"
                    className={styles.watchVideoButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(story);
                    }}
                    aria-label={`Assistir vídeo do depoimento de ${story.title}`}
                    data-tab-entry={index === 0 ? 'true' : undefined}
                  >
                    Assistir Vídeo do Depoimento
                  </Button>
                  <Button
                    variant="outline-primary"
                    className={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowDetails(story);
                    }}
                    aria-label={`Ver detalhes do case ${story.title}`}
                  >
                    Ver Detalhes
                  </Button>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="video-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="video-modal"
            style={{ color: 'var(--footer-color)' }}
          >
            <strong>{selectedVideo?.title} - Depoimento</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: '#000',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <video
            ref={videoRef}
            key={selectedVideo?.id}
            controls
            autoPlay
            loop
            className="w-100"
            style={{
              maxHeight: '75vh',
              backgroundColor: 'var(--light)',
              objectFit: 'contain',
            }}
          >
            <source src={selectedVideo?.preview} type="video/mp4" />
          </video>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        size="lg"
        aria-labelledby="story-detail-modal-title"
        centered
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title
            id="story-detail-modal-title"
            className={styles.modalTitle}
          >
            {selectedStoryDetail?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBodyText}>
          {selectedStoryDetail?.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: selectedStoryDetail.description.replace(/\n/g, '<br>'),
              }}
            />
          ) : (
            <p>Detalhes não disponíveis.</p>
          )}
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
