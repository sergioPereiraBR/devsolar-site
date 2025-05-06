'use client';

import Image from 'next/image';
import Accordion from 'react-bootstrap/Accordion';
import styles from './faq_section_ds.module.css'; // Importando CSS Modules

// --- Dados (Definidos fora do componente, como mostrado acima) ---
const faqData = [
    // ... (cole os dados do faqData aqui) ...
    { id: '0', question: 'Quanto tempo leva para instalar um sistema solar?', answer: 'Para sistemas residenciais, a instalação geralmente leva de 2 a 3 dias. Para sistemas comerciais ou industriais, o prazo varia de 1 a 3 semanas, dependendo da complexidade e tamanho do projeto.', personaImage: '/images/personas/persona-1.jpg' },
    { id: '1', question: 'Os painéis funcionam em dias nublados?', answer: 'Sim, os painéis solares continuam gerando energia em dias nublados, embora com eficiência reduzida...', personaImage: '/images/personas/persona-2.jpg' },
    { id: '2', question: 'Preciso de baterias para armazenar energia?', answer: 'Não necessariamente. A maioria dos sistemas utiliza o modelo "on-grid"...', personaImage: '/images/personas/persona-3.jpg' },
    { id: '3', question: 'Qual a vida útil dos painéis solares?', answer: 'Os painéis solares modernos têm vida útil superior a 25 anos...', personaImage: '/images/personas/persona-4.jpg' },
    { id: '4', question: 'Como funciona o financiamento dos sistemas?', answer: 'Oferecemos diversas opções de financiamento, incluindo linhas específicas...', personaImage: '/images/personas/persona-5.jpg' },
];
const COMPANY_LOGO_URL = '/images/logo-devsolar-icon.png';
// --- Fim dos Dados ---


function FAQSectionDS() {
    return (
        <>
            {/* FAQ Section */}
            <section id="faq" className={`${styles.sectionFaq} section bg-light`}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={`${styles.sectionTitle} fw-bold`}>Perguntas Frequentes (FAQ)</h2>
                        <p className={`${styles.sectionSubtitle} lead`}>Tire suas dúvidas sobre energia solar</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-10"> {/* Ajuste a largura da coluna se necessário */}
                            <Accordion defaultActiveKey="0" className={styles.faqAccordion}>
                                {faqData.map((item) => (
                                    // Cada item do Accordion representa uma troca de "mensagens"
                                    <Accordion.Item key={item.id} eventKey={item.id} className={styles.faqItem}>

                                        {/* Cabeçalho customizado (simula a pergunta do usuário) */}
                                        <Accordion.Header as="div" className={styles.messageHeader}>
                                            <div className={`${styles.messageRow} ${styles.questionRow}`}>
                                                {/* Avatar da Persona */}
                                                <div className={styles.avatarContainer}>
                                                    <Image
                                                        src={item.personaImage}
                                                        alt={`Persona ${item.id + 1}`}
                                                        width={60}
                                                        height={60}
                                                        className={styles.avatarImage}
                                                        objectfit="cover"
                                                    />
                                                </div>
                                                {/* Balão da Pergunta */}
                                                <div className={`${styles.messageBubble} ${styles.questionBubble}`}>
                                                    {item.question}
                                                </div>
                                                {/* Ícone de Toggle (Chevron) */}
                                                <span className={styles.toggleIcon}></span>
                                            </div>
                                        </Accordion.Header>

                                        {/* Corpo customizado (simula a resposta da empresa) */}
                                        <Accordion.Body className={styles.messageBody}>
                                            <div className={`${styles.messageRowAns} ${styles.answerRow}`}>
                                                {/* Balão da Resposta */}
                                                <div className={`${styles.messageBubble} ${styles.answerBubble}`}>
                                                    {item.answer}
                                                </div>
                                                {/* Logo da Empresa */}
                                                <div className={styles.avatarContainer}>
                                                    <Image
                                                        src={COMPANY_LOGO_URL}
                                                        alt="Logo da Empresa"
                                                        width={60}
                                                        height={60}
                                                        className={styles.avatarImage}
                                                        objectfit="contain" // 'contain' pode ser melhor para logos
                                                    />
                                                </div>
                                            </div>
                                        </Accordion.Body>

                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FAQSectionDS;