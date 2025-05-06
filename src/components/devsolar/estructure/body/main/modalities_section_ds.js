'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import FaleConoscoDS from '../fale_conosco_ds';
import styles from './modalities_section_ds.module.css'; // Importar CSS Module

// --- Dados (com HTML, definidos fora) ---
const modalitiesData = [
    // ... (cole os dados ATUALIZADOS do modalitiesData com HTML aqui) ...
    {
        id: 'propria', title: 'Produção Própria', iconClass: 'fas fa-bolt', shortDescription: 'Gere energia para consumo no próprio local...', buttonText: 'Saiba Mais: Produção Própria de Energia', modalTitle: 'Modalidade: Produção Própria', modalMessage: 'produção de energia para utilização no mesmo imóvel', modalImage: './images/producao-propria.webp',
        modalText: `

Esta modalidade permite que o consumidor gere energia para consumo no próprio local de instalação dos painéis fotovoltaicos.<br /><br />

<strong>Pontos-chave:</strong><br /><br />

<strong>Base legal:</strong> Regulamentada pela Resolução Normativa ANEEL nº 482/2012 e suas atualizações, como a Lei nº 14.300/2022 (Marco Legal da Microgeração).<br /><br />

<strong>Aplicação:</strong> Ideal para residências unifamiliares, empresas, indústrias e propriedades rurais que possuam espaço adequado para instalação.<br /><br />

<strong>Benefício fiscal:</strong> Os equipamentos possuem isenção de ICMS em muitos estados e possibilidade de depreciação acelerada para pessoas jurídicas.<br /><br />

<strong>Economia:</strong> Redução de até 95% na conta de energia, dependendo do dimensionamento do sistema.<br /><br />

<strong>Compensação:</strong> A energia excedente gera créditos que podem ser utilizados em até 60 meses.<br /><br />

<strong>Valorização imobiliária:</strong> Propriedades com sistemas solares tendem a valorizar no mercado.<br /><br />`
    },
    {
        id: 'compartilhada', title: 'Produção Compartilhada', iconClass: 'fas fa-users', shortDescription: 'Múltiplos consumidores compartilham os benefícios...', buttonText: 'Saiba Mais: Produção Compartilhada', modalTitle: 'Modalidade: Produção Compartilhada', modalMessage: 'produção de energia com utilização também em outro imóvel', modalImage: './images/producao-compartilhada.png',
        modalText: `Esta modalidade permite que múltiplos consumidores compartilhem os benefícios de uma mesma usina solar, mesmo estando em locais diferentes.<br /><br />



<strong>Pontos-chave:</strong><br /><br />

<strong>Base legal:</strong> Amparada pela Resolução Normativa ANEEL nº 687/2015 e Lei nº 14.300/2022.<br /><br />
<strong>Formato jurídico:</strong> Pode ser estruturada como consórcio, cooperativa ou outras formas de associação.<br /><br />
<strong>Aplicação ideal:</strong> Condomínios residenciais e comerciais, grupos empresariais com múltiplas unidades, associações de produtores rurais.<br /><br />
<strong>Vantagem competitiva:</strong> Permite acesso à energia solar para quem não possui telhado adequado ou capital para instalação individual.<br /><br />
<strong>Distribuição de créditos:</strong> Estabelecida por contrato entre os participantes, com percentuais fixos ou variáveis conforme participação no investimento.<br /><br />
<strong>Economia de escala:</strong> Redução no custo por kWp instalado devido ao maior porte da instalação.<br /><br />
<strong>Flexibilidade:</strong> Possibilidade de realocação de créditos entre unidades consumidoras de acordo com necessidades sazonais.<br /><br />`
    },
    {
        id: 'negocio', title: 'Produção para Negócio', iconClass: 'fas fa-store-alt', shortDescription: 'Comercialização de créditos de energia solar...', buttonText: 'Saiba Mais: Produção para Negócio', modalTitle: 'Modalidade: Produção para Negócio', modalMessage: 'produção de energia e comercialização de créditos', modalImage: './images/producao-negocio.png',
        modalText: `Esta modalidade permite a comercialização de créditos de energia solar para terceiros, criando um modelo de negócio específico.<br /><br />

<strong>Pontos-chave:</strong><br /><br />

<strong>Base legal:</strong> Estruturada conforme a Lei nº 14.300/2022 e regulamentações estaduais específicas.<br /><br />
<strong>Modelo de negócio:</strong> Pode operar como uma usina solar dedicada à venda de créditos ou excedentes.<br /><br />
<strong>Tributação específica:</strong> Incidência de PIS/COFINS e ICMS sobre a comercialização dos créditos em muitos estados.<br /><br />
<strong>Contratos de fornecimento:</strong> Necessidade de instrumentos jurídicos robustos para garantir o fornecimento e estabelecer preços e condições.<br /><br />
<strong>Público-alvo:</strong> Investidores que buscam retorno financeiro no setor energético, empresas com capacidade de investimento excedente.<br /><br />
<strong>Rentabilidade:</strong> ROI de 12% a 20% ao ano, dependendo da escala e condições locais.<br /><br />
<strong>Aspectos regulatórios:</strong> Necessidade de registro e autorizações específicas junto à ANEEL e concessionárias locais.<br /><br />
<strong>Valor agregado:</strong> Possibilidade de vincular a comercialização a certificados de energia renovável ou programas ESG.<br /><br />`
    },
];
// --- Fim dos Dados ---


function ModalitiesSectionDS() {
    const [showModal, setShowModal] = useState(false);
    const [selectedModalContent, setSelectedModalContent] = useState(null);

    // Guarda os dados do benefício ou do detalhe da categoria a ser exibido
    const [modalContent, setModalContent] = useState(null);

    const handleShowModal = (modalityData) => {
        setSelectedModalContent(modalityData);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedModalContent(null);
    };

    return (
        <>
            <section id="modalidades" className={styles.sectionModalities} aria-labelledby="modalities-title">
                <div className="container">
                    {/* ... (cabeçalho da seção inalterado) ... */}
                    <div className="text-center mb-5">
                        <h2 id="modalities-title" className={`${styles.sectionTitle} fw-bold`}>O que Fazer com Seu Potencial Solar</h2>
                        <p className={`${styles.sectionSubtitle} lead`}>Descubra a modalidade dos nossos serviços ideal para você</p>
                    </div>
                    <Row className="g-4 justify-content-center">
                        {modalitiesData.map((modality) => (
                            // ... (Estrutura do Card inalterada) ...
                            <Col key={modality.id} md={6} lg={4}>
                                <Card className={`${styles.modalityCard} h-100`}>
                                    <div className={styles.cardHeader}>
                                        <i className={`${modality.iconClass} ${styles.cardIcon}`}></i>
                                        <h4 className={styles.cardTitle}>{modality.title}</h4>
                                    </div>
                                    <Card.Body className={styles.cardBody}>
                                        <p className={styles.cardDescription}>{modality.shortDescription}</p>
                                        <Button
                                            variant="primary"
                                            className={`${styles.detailsButton} w-100`}
                                            onClick={() => handleShowModal(modality)}
                                        >
                                            <i className="fas fa-info-circle me-2"></i>
                                            <span>{modality.buttonText}</span>
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Modal para exibir os detalhes */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                size="lg"
                aria-labelledby="modality-detail-modal-title"
                centered
                dialogClassName={styles.modalDialog}
            >
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title id="modality-detail-modal-title" className={styles.modalTitle}>
                        {selectedModalContent?.modalTitle}
                    </Modal.Title>
                </Modal.Header>
                {/* ***** MODIFICAÇÃO PRINCIPAL AQUI ***** */}
                <Modal.Body className={styles.modalBodyContentStacked}> {/* Nova classe CSS */}
                    {selectedModalContent && (
                        <>
                            {/* 1. Imagem renderizada primeiro */}
                            <div className={styles.modalImageContainerStacked}>
                                <Image
                                    src={selectedModalContent.modalImage}
                                    alt={`Ilustração ${selectedModalContent.title}`}
                                    width={900} // Pode ajustar o tamanho para o layout empilhado
                                    height={720}
                                    objectfit="contain"
                                    className={styles.modalImage}
                                />
                            </div>
                            {/* 2. Texto renderizado depois, usando dangerouslySetInnerHTML */}
                            <div
                                className={styles.modalTextContent} // Mantém estilos de texto
                                dangerouslySetInnerHTML={{ __html: selectedModalContent.modalText }} // Renderiza o HTML
                            />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <FaleConoscoDS
                        textClassButton={`btn btn-outline-custom btn-lg ${styles.modalFooterButton}`} // Use classe do module se precisar
                        textMessage={`Olá, quero falar com especialista sobre ${selectedModalContent?.modalMessage}.`}
                        textTag={'#devSolar #beneficios'}
                        onClick={handleCloseModal}
                    />
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalitiesSectionDS;