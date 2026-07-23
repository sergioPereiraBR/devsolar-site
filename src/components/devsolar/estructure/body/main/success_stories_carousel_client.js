'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, Card, Modal } from 'react-bootstrap';

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
  const videoRef = useRef(null);

  useEffect(() => {
    if (showModal && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [showModal, selectedVideo]);

  const handleCardClick = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleShowDetails = (story) => {
    setSelectedStoryDetail(story);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedStoryDetail(null);
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
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
          {successStories.map((story) => (
            <SwiperSlide key={story.id} className={styles.swiperSlide}>
              <Card className={styles.storyCard}>
                <div className={styles.thumbnailContainer}>
                  <Image
                    src={story.thumbnail}
                    alt={`${story.title} - Instalação de painéis solares ${story.type} no Rio de Janeiro - DEV Solar`}
                    fill
                    className={styles.thumbnailImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(story);
                    }}
                  />
                </div>
                <Card.Body style={{ backgroundColor: 'var(--branco)' }}>
                  <Card.Title className={styles.cardTitle}>
                    <h3>{story.title}</h3>
                  </Card.Title>
                  <h4 className={styles.cardShortDescription}>
                    {story.resume}
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
                    variant="outline-primary"
                    className={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowDetails(story);
                    }}
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
            <strong>{selectedVideo?.title}</strong>
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
                __html: selectedStoryDetail.description.replace(
                  /\n/g,
                  '<br />',
                ),
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
