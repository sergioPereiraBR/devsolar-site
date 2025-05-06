'use client';

import { useState } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import FaleConoscoDS from '../fale_conosco_ds'; // Confirme o caminho
import { benefitsData } from './benefits_data_ds'; // Importa os dados estruturados
import styles from './benefits_section_ds.module.css'; // Importar CSS Module

// Componente para o Card de Benefício Principal
const BenefitCard = ({ benefit, onClick }) => (
    <Col md={6} lg={4} className="mb-4"> {/* Ajusta colunas e adiciona margem */}
        <Card className={`${styles.benefitCard} h-100`} onClick={() => onClick(benefit)} >
            <Card.Body className="text-center p-4">
                <i className={`${benefit.iconClass} ${styles.benefitIcon}`}></i>
                <Card.Title as="h5" className={`${styles.benefitTitle} fw-bold`}>{benefit.title}</Card.Title>
                <Card.Text className={styles.benefitDescription}>{benefit.description}</Card.Text>
            </Card.Body>
        </Card>
    </Col>
);

// Componente para o Card de Categoria dentro do Modal
const CategoryCard = ({ category, onClick }) => (
    <Col>
        <Card className={`${styles.categoryCard} h-100`} onClick={() => onClick(category.detail)}>
            <Card.Body className="d-flex flex-column text-center p-3">
                <i className={`${category.iconClass} ${styles.categoryIcon} mb-3`}></i>
                <Card.Title as="h6" className="fw-bold">{category.title}</Card.Title>
                <Card.Text className={`${styles.categoryDescription} flex-grow-1`}>
                    {category.description}
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
);


function BenefitsSectionDS() {
    const [showModal, setShowModal] = useState(false);
    // Guarda os dados do benefício ou do detalhe da categoria a ser exibido
    const [modalContent, setModalContent] = useState(null);
    // Controla se o modal está exibindo a lista de categorias (false) ou o detalhe final (true)
    const [isDetailView, setIsDetailView] = useState(false);

    // Abre o modal no nível das categorias
    const handleShowBenefitModal = (benefitData) => {
        setModalContent(benefitData);
        setIsDetailView(false); // Mostra as categorias primeiro
        setShowModal(true);
    };

    // Mostra o detalhe final (citações, etc.) dentro do mesmo modal
    const handleShowDetailView = (detailData) => {
        setModalContent(detailData); // Agora o modalContent guarda os detalhes
        setIsDetailView(true); // Muda a visualização para detalhes
    };

    // Fecha o modal e reseta tudo
    const handleCloseModal = () => {
        setShowModal(false);
        setIsDetailView(false);
        // Pequeno delay para não ver o conteúdo antigo sumindo
        setTimeout(() => setModalContent(null), 300);
    };

    // ---- Funções auxiliares para renderizar conteúdo do modal ----
    const renderCategoryView = () => (
        <>
            <Modal.Body>
                <Row xs={1} sm={2} md={3} className="g-3">
                    {modalContent?.categories?.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onClick={handleShowDetailView} // Ao clicar, mostra a view de detalhe
                        />
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-center justify-content-md-end">
                <FaleConoscoDS
                    textClassButton={`btn btn-outline-custom btn-lg ${styles.modalFooterButton}`} // Use classe do module se precisar
                    textMessage={modalContent?.contactMessageBase || 'Olá, quero falar com especialista sobre os benefícios.'}
                    textTag={modalContent?.contactTagBase || '#devSolar #beneficios'}
                />
            </Modal.Footer>
        </>
    );

    const renderDetailView = () => (
        <>
            <Modal.Body className={styles.detailModalBody}>
                <h4 className={styles.detailTitle}>{modalContent?.detailTitle}</h4>
                <p className={styles.detailText}>{modalContent?.text}</p>

                {modalContent?.citations?.length > 0 && (
                    <div className={styles.citations}>
                        <h5>Citações</h5>
                        {modalContent.citations.map(cite => (
                            <p key={cite.id}>
                                <strong>Citação {cite.id.split('-').pop()}:</strong> {cite.text}
                                {cite.link && <a href={cite.link} target="_blank" rel="noopener noreferrer" className={styles.citationLink}> [{cite.id.split('-').pop()}]</a>}
                            </p>
                        ))}
                    </div>
                )}

                {modalContent?.references?.length > 0 && (
                    <div className={styles.references}>
                        <h5>Referências</h5>
                        {modalContent.references.map(ref => (
                            <p key={ref.id}>[{ref.id.split('-').pop()}] {ref.text}</p>
                        ))}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="justify-content-center justify-content-md-end">
                <FaleConoscoDS
                    onClick={handleCloseModal}
                    textClassButton={`btn btn-outline-custom btn-lg ${styles.modalFooterButton}`}
                    textMessage={modalContent?.contactMessage || 'Olá, quero falar com especialista sobre este benefício.'}
                    textTag={modalContent?.contactTag || '#devSolar #beneficioDetalhe'}
                />
            </Modal.Footer>
        </>
    );

    return (
        <>
            <section id="beneficios" className={`${styles.sectionBenefits} section`} aria-labelledby="benefits-title">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 id="benefits-title" className={`${styles.sectionTitle} fw-bold`}>Por que escolher energia solar?</h2>
                        <p className={`${styles.sectionSubtitle} lead`}>Descubra os benefícios que milhares de clientes já aproveitam</p>
                    </div>
                    {/* Renderiza os cards de benefícios principais */}
                    <Row className="g-4 justify-content-center">
                        {benefitsData.map((benefit) => (
                            <BenefitCard
                                key={benefit.id}
                                benefit={benefit}
                                onClick={handleShowBenefitModal}
                            />
                        ))}
                    </Row>
                </div>
            </section>

            {/* --- Modal Único e Dinâmico --- */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered dialogClassName={styles.modalDialog}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className={styles.modalTitle}>
                        {/* O título muda dependendo da view */}
                        {isDetailView ? modalContent?.title : modalContent?.modalTitle}
                    </Modal.Title>
                </Modal.Header>

                {/* Renderiza o conteúdo apropriado (categorias ou detalhes) */}
                {isDetailView ? renderDetailView() : renderCategoryView()}

            </Modal>
        </>
    );
}

export default BenefitsSectionDS;