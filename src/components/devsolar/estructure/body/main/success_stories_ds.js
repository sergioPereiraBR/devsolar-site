'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Container, Modal } from 'react-bootstrap'; // Import Button
import styles from './success_stories_ds.module.css'; // Usaremos CSS Modules

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
//import { Autoplay, Loop, Navigation, Pagination } from 'swiper/modules';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// --- Dados (movidos para fora) ---
const successStories = [
    // ... (cole a lista de 'successStories' definida acima aqui) ...
    { id: 1, title: 'Condomínio Lilases', thumbnail: './images/cond_lilases.jpg', preview: './videos/depcon01.mp4', type: "Condominial", impact: "Economia imadiata", resume: "Investimento inteligente com a Dev Solar! Gasto de R$ 6.000 virou economia, pagando o financiamento e permitindo outras melhorias.", description: "Descrição detalhada: Investir em energia solar com a DEV Solar foi a decisão financeira mais inteligente que tomamos recentemente. Convertemos um gasto de mais de R$ 6.000,00/mês num financiamento de R$ 4.500,00 durante 3 ano e depois disso a geração própria de energia beneficiará ainda mais o condomínio. O sistema de energia solar já se tornou um investimento que se paga com a própria economia gerada, e ainda conseguimos direcionar recursos para outras melhorias! O retorno é mais rápido do que o previsto. A instalação foi ágil e a equipe demonstrou total profissionalismo." },
    { id: 2, title: 'Casa da Fernanda', thumbnail: './images/casa_fernanda.jpg', preview: './videos/depcon02.mp4', type: "Residencial", impact: "Bom Atendimento e Valor Ideal", resume: "Agora produzimos nossa própria energia e reduzimos custos com a conta de luz. Fomos bem atendidos e estamos satisfeitos com o serviço.", description: "Descrição detalhada: Devido o atendimento proativo e esclarecedor todas as dúvidas foram respondidas prontamente, juntamente com a flexibilidade na negociação chegamos a um valor ideal que viabilizou a instalação do sistema de energia solar, o qual se converte em benefícios para casa e toda família." },
    { id: 3, title: 'Casa do Osmar', thumbnail: './images/casa_osmar.jpg', preview: './videos/depcon03.mp4', type: "Residencial", impact: "Confiança e Exelente Qualidade", resume: "A instalação do nosso sistema solar foi feita com profissionais de exelente qualidade até a entrega com a ligação no rede pública de energia.", description: "A instalação do nosso sistema solar foi feita com profissionais de exelente qualidade, onde desde a negociação já se demostrou terem confiança e compromisso com o que fazem até a entrega final na integração com o serviço público de energia elétrica." },
];


export default function SuccessStoriesDS() {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedStoryDetail, setSelectedStoryDetail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (showModal && videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Erro ao reproduzir vídeo:", error);
            });
        } else if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [showModal, selectedVideo]);

    const handleCardClick = (video) => {
        setSelectedVideo(video);
        setShowModal(true);
    };

    // Função para abrir o modal de detalhes
    const handleShowDetails = (story) => {
        setSelectedStoryDetail(story);
        setShowDetailModal(true);
    };

    // Função para fechar o modal de detalhes
    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedStoryDetail(null); // Limpa o estado ao fechar
    };

    return (
        <>
            <section id="cases" className={styles.sectionCases} aria-labelledby="cases-title">

                <Container>
                    <div className="text-center mb-5">
                        <h2 id="cases-title" className={`${styles.sectionTitle} fw-bold`}>Cases de Sucesso</h2>
                        <p className={`${styles.sectionSubtitle} lead`}>Conheça quem já está economizando com energia solar</p>
                    </div>

                    {/* Container do Carrossel Swiper */}
                    <div className={styles.carouselContainer}>
                        <Swiper
                            modules={[Pagination, Navigation, Autoplay]}
                            loop={true} // Ativa o loop infinito
                            slidesPerView={1} // Slides visíveis no mobile
                            spaceBetween={20} // Espaço entre slides
                            pagination={{ // Configuração dos pontos de navegação
                                clickable: true
                            }}
                            navigation={false} // Ativa as setas de navegação
                            autoplay={{ // Autoplay opcional
                                delay: 6000, // Tempo entre slides
                                disableOnInteraction: false, // Não para ao interagir
                                pauseOnMouseEnter: true, // Pausa ao passar o mouse
                            }}
                            breakpoints={{ // Responsividade
                                // >= 768px
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                // >= 992px
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                                // >= 1200px
                                1200: {
                                    slidesPerView: 3, // Mantém 3 ou aumenta para 4 se tiver muitos itens
                                    spaceBetween: 40,
                                },
                            }}
                            className={styles.mySwiper} // Classe para estilização customizada
                        >
                            {successStories.map((story) => (
                                <SwiperSlide key={story.id} className={styles.swiperSlide}>
                                    {/* Card do Case de Sucesso */}
                                    <Card className={styles.storyCard}>
                                        <div className={styles.thumbnailContainer}>
                                            <Image
                                                src={story.thumbnail}
                                                alt={story.title}
                                                fill
                                                className={styles.thumbnailImage}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={true}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCardClick(story)
                                                }}
                                            />
                                        </div>
                                        <Card.Body style={{ backgroundColor: 'var(--branco)' }}>
                                            <Card.Title className={styles.cardTitle}>{story.title}</Card.Title>
                                            {/* Descrição curta pode ir aqui ou usar CSS para limitar a principal '#F8F9FA' */}
                                            <p className={styles.cardShortDescription}> {story.resume} </p>
                                            <div className={styles.badgesContainer}>
                                                <span className={`badge ${styles.badgePrimary}`}>{story.type}</span>
                                                <span className={`badge ${styles.badgeSecondary}`}>{story.impact}</span>
                                            </div>
                                            {/* Botão que abre o MODAL DE DETALHES */}
                                            <Button
                                                variant="outline-primary" // Use 'variant' do react-bootstrap
                                                className={styles.detailsButton}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Previne que o clique no botão propague para o card (se houver outra ação no card)
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
                </Container>

                {/* Modal para Vídeo */}
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    size="lg"
                    aria-labelledby="video-modal"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="video-modal"
                            style={{
                                color: 'var(--footer-color)', // Fundo preto como fallback
                            }}
                        >
                            <strong>{selectedVideo?.title}</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        style={{
                            backgroundColor: '#000', // Fundo escuro para o corpo do modal
                            padding: 0, // Remove padding para o vídeo ocupar todo o espaço
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}

                    >
                        <video
                            ref={videoRef}
                            key={selectedVideo?.id}
                            controls
                            autoPlay
                            // muted
                            loop
                            className="w-100"
                            // style={{ maxHeight: '75vh', backgroundColor: 'black' }}
                            style={{
                                maxHeight: '75vh',
                                backgroundColor: 'var(--light)', // Fundo preto como fallback
                                objectFit: 'contain' // Ajusta o vídeo mantendo proporção
                            }}
                        >
                            <source src={selectedVideo?.preview} type="video/mp4" />
                        </video>
                    </Modal.Body>
                </Modal>

                {/* Modal para Detalhes do Texto */}
                <Modal
                    show={showDetailModal}
                    onHide={handleCloseDetailModal}
                    size="lg" // Tamanho do modal
                    aria-labelledby="story-detail-modal-title"
                    centered // Centraliza verticalmente
                >
                    <Modal.Header closeButton className={styles.modalHeader}>
                        <Modal.Title id="story-detail-modal-title" className={styles.modalTitle}>
                            {selectedStoryDetail?.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.modalBodyText}>
                        {/* Exibe a descrição completa */}
                        {selectedStoryDetail?.description ? (
                            <div dangerouslySetInnerHTML={{ __html: selectedStoryDetail.description.replace(/\n/g, '<br />') }} />
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
            </section>
        </>
    );
}