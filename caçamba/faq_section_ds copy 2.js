// No topo absoluto do seu arquivo FAQSectionDS.jsx
'use client';

import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'; // Importa o Emoji Picker
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react'; // Adicionado useState, useRef, useEffect
import Accordion from 'react-bootstrap/Accordion';
import styles from './faq_section_ds.module.css';

// --- Dados ---
const faqData = [
    // ... (seus dados faqData existentes) ...
    { id: '0', question: 'Quanto tempo leva para instalar um sistema solar?', answer: 'Para sistemas residenciais, a instalação geralmente leva de 2 a 3 dias. Para sistemas comerciais ou industriais, o prazo varia de 1 a 3 semanas, dependendo da complexidade e tamanho do projeto.', personaImage: '/images/personas/persona-1.jpg' },
    { id: '1', question: 'Os painéis funcionam em dias nublados?', answer: 'Sim, os painéis solares continuam gerando energia em dias nublados, embora com eficiência reduzida...', personaImage: '/images/personas/persona-2.jpg' },
    { id: '2', question: 'Preciso de baterias para armazenar energia?', answer: 'Não necessariamente. A maioria dos sistemas utiliza o modelo "on-grid"...', personaImage: '/images/personas/persona-3.jpg' },
    { id: '3', question: 'Qual a vida útil dos painéis solares?', answer: 'Os painéis solares modernos têm vida útil superior a 25 anos...', personaImage: '/images/personas/persona-4.jpg' },
    { id: '4', question: 'Como funciona o financiamento dos sistemas?', answer: 'Oferecemos diversas opções de financiamento, incluindo linhas específicas...', personaImage: '/images/personas/persona-5.jpg' },
];
const COMPANY_LOGO_URL = '/images/logo-devsolar-icon.png';
const WHATSAPP_CONTACT_NUMBER = "5521998990303"; // Seu número de WhatsApp
// --- Fim dos Dados ---


function FAQSectionDS() {
    // Estado para a pergunta do usuário
    const [userQuestion, setUserQuestion] = useState('');
    // Estado para controlar a visibilidade do seletor de emojis
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    // Ref para o input/textarea para inserir emojis na posição correta (opcional avançado)
    const inputRef = useRef(null);

    // Handler para atualizar a pergunta do usuário
    const handleUserInputChange = (e) => {
        setUserQuestion(e.target.value);
    };

    // Handler para adicionar o emoji selecionado à pergunta
    const onEmojiClick = (emojiObject) => {
        // Insere o emoji onde o cursor estava (ou apenas anexa)
        setUserQuestion(prevInput => prevInput + emojiObject.emoji);
        // Fecha o picker após selecionar (opcional)
        // setShowEmojiPicker(false);
    };

    // Handler para enviar a pergunta via WhatsApp
    const handleSendQuestion = () => {
        const trimmedQuestion = userQuestion.trim();
        if (trimmedQuestion === '') return;

        const sanitizedQuestion = trimmedQuestion
            .replace(/\u00A0/g, ' ')
            .replace(/\s{2,}/g, ' ');

        // Remove o VS16 como boa prática
        const finalQuestion = sanitizedQuestion.replace(/\uFE0F/g, '');

        const baseMessage = "Olá! Tenho uma dúvida que não encontrei no FAQ do site:";
        const fullMessage = `${baseMessage}\n\n"${finalQuestion}"`;
        const encodedMessage = encodeURIComponent(fullMessage);

        // Mensagem para o fallback (sem o emoji problemático - substitui por placeholder ou remove)
        // Opção A: Remover o caractere base problemático (U+2764)
        const fallbackQuestion = finalQuestion.replace(/❤/g, '[emoji]'); // Substitui por texto
        // Opção B: Ou remover completamente: const fallbackQuestion = finalQuestion.replace(/❤/g, '');
        const fallbackFullMessage = `${baseMessage}\n\n"${fallbackQuestion}"`;
        const encodedFallbackMessage = encodeURIComponent(fallbackFullMessage);

        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isDesktopWhatsAppInstalled = true; // *** Difícil detectar programaticamente *** - Assumimos que pode estar

        const whatsappAppUrl = `whatsapp://send/?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedMessage}`;
        // Usar wa.me para o fallback web, pois é mais universal que web.whatsapp.com direto
        const whatsappWebUrlFallback = `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodedFallbackMessage}`;


        console.log("Tentando URL App:", whatsappAppUrl);
        console.log("URL Fallback Web (sem emoji problemático):", whatsappWebUrlFallback);

        // --- Lógica de Tentativa e Fallback ---

        if (isMobile) {
            // Em mobile, tenta abrir o App diretamente.
            // A falha aqui geralmente é silenciosa ou abre a App Store.
            // Não temos um bom jeito de detectar a falha e rodar o fallback automaticamente.
            // A melhor abordagem é tentar e esperar que funcione.
            window.location.href = whatsappAppUrl;
        } else {
            // Em Desktop: Tentar abrir o App Desktop pode ser inconsistente.
            // Abordagem mais segura: Abrir wa.me no navegador.
            // wa.me tentará abrir o app desktop se instalado, ou mostrará QR code/link para Web.
            // *MAS*, sabemos que wa.me está corrompendo o emoji.
            // Então, abrimos wa.me com a MENSAGEM DE FALLBACK (sem o emoji problemático).

            // window.open(whatsappWebUrlFallback, '_blank', 'noopener,noreferrer');

            // --- Alternativa Desktop (Tenta App Primeiro - Mais arriscado) ---

            // 1. Tenta abrir o app desktop via protocolo
            let openedApp = false;
            try {
                // Usar um iframe oculto é uma técnica para tentar detectar se o handler existe, mas não é garantido
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = whatsappAppUrl;
                document.body.appendChild(iframe);
                // Não temos como saber com certeza se abriu, mas tentamos.
                // Poderia usar um setTimeout para considerar falha se nada acontecer, mas é impreciso.
                console.log("Tentativa de abrir App Desktop iniciada.");
                openedApp = true; // Assume que tentou (melhor estimativa)

                // Remove o iframe depois de um tempo
                setTimeout(() => {
                    console.log("Timeout 01.");
                    try {
                        console.log("Tenta remover o iframe.");
                        iframe.remove();
                    } catch (e) { console.log("Falha na tentativa de remover o iframe.") }
                }, 1000);


            } catch (e) {
                console.warn("Falha ao tentar iniciar app desktop via protocolo:", e);
                openedApp = false;
            }

            // 2. Fallback para Web (com mensagem sem emoji) se a tentativa do app falhou ou não temos certeza
            // Adiciona um pequeno delay para o caso do app estar abrindo
            setTimeout(() => {
                console.log("Timeout 02.");
                // Se não temos certeza se abriu, ou se explicitamente falhou
                if (!openedApp) { // Ou uma lógica mais sofisticada se possível
                    console.log("Protocolo app:// falhou ou incerto, abrindo fallback web.");
                    window.open(whatsappWebUrlFallback, '_blank', 'noopener,noreferrer');
                }
            }, 500); // Delay de 500ms

        }

        console.log("Término do processo.");

        // Limpar o estado independentemente do resultado da abertura
        setUserQuestion('');
        setShowEmojiPicker(false);
    };

    // Fecha o emoji picker se clicar fora dele
    const emojiPickerRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                // Verifica também se o clique não foi no botão de toggle
                // (Assume que o botão de toggle tem um id ou classe específica, ex: 'emoji-toggle-button')
                const toggleButton = document.getElementById('emoji-toggle-button'); // Ou use uma ref no botão
                if (!toggleButton || !toggleButton.contains(event.target)) {
                    setShowEmojiPicker(false);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiPickerRef]);


    return (
        <>
            <section id="faq" className={`${styles.sectionFaq} section bg-light`}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={`${styles.sectionTitle} fw-bold`}>Perguntas Frequentes (FAQ)</h2>
                        <p className={`${styles.sectionSubtitle} lead`}>Tire suas dúvidas sobre energia solar</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-10">
                            {/* Acordeão Existente */}
                            <Accordion defaultActiveKey="0" className={styles.faqAccordion}>
                                {faqData.map((item) => (
                                    <Accordion.Item key={item.id} eventKey={item.id} className={styles.faqItem}>
                                        {/* ... (Seu Accordion.Header e Accordion.Body existentes) ... */}
                                        {/* Cabeçalho customizado (simula a pergunta do usuário) */}
                                        <Accordion.Header as="div" className={styles.messageHeader}>
                                            <div className={`${styles.messageRow} ${styles.questionRow}`}>
                                                <div className={styles.avatarContainer}>
                                                    <Image src={item.personaImage} alt={`Persona ${item.id + 1}`} width={60} height={60} className={styles.avatarImage} objectfit="cover" />
                                                </div>
                                                <div className={`${styles.messageBubble} ${styles.questionBubble}`}>
                                                    {item.question}
                                                </div>
                                                <span className={styles.toggleIcon}></span>
                                            </div>
                                        </Accordion.Header>
                                        {/* Corpo customizado (simula a resposta da empresa) */}
                                        <Accordion.Body className={styles.messageBody}>
                                            <div className={`${styles.messageRowAns} ${styles.answerRow}`}>
                                                <div className={`${styles.messageBubble} ${styles.answerBubble}`}>
                                                    {item.answer}
                                                </div>
                                                <div className={styles.avatarContainer}>
                                                    <Image src={COMPANY_LOGO_URL} alt="Logo da Empresa" width={60} height={60} className={styles.avatarImage} objectfit="contain" />
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>

                            {/* --- Nova Área de Input --- */}
                            <div className={styles.userInputSection}>
                                <h5 className={styles.userInputTitle}>Não encontrou sua dúvida? Pergunte aqui!</h5>
                                <div className={styles.inputAreaContainer}>
                                    {/* Botão de Emoji */}
                                    <button
                                        id="emoji-toggle-button" // ID para lógica de fechar ao clicar fora
                                        className={styles.emojiButton}
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        aria-label="Selecionar emoji"
                                        type="button" // importante para não submeter form se estiver dentro de um
                                    >
                                        <i className="far fa-smile"></i> {/* Ícone FontAwesome */}
                                    </button>

                                    {/* Seletor de Emojis (Posicionado Absolutamente) */}
                                    {showEmojiPicker && (
                                        <div ref={emojiPickerRef} className={styles.emojiPickerWrapper}>
                                            <EmojiPicker
                                                onEmojiClick={onEmojiClick}
                                                autoFocusSearch={false}
                                                emojiStyle={EmojiStyle.NATIVE} // Ou outro estilo: GOOGLE, APPLE, FACEBOOK
                                                height={350}
                                                width="100%"
                                            // searchDisabled // Desabilita busca se preferir
                                            // previewConfig={{ showPreview: false }} // Desabilita preview
                                            />
                                        </div>
                                    )}


                                    {/* Textarea para a pergunta */}
                                    <textarea
                                        ref={inputRef}
                                        className={styles.userInput}
                                        rows="1" // Começa com 1 linha, expande se necessário
                                        placeholder="Digite sua pergunta..."
                                        value={userQuestion}
                                        onChange={handleUserInputChange}
                                        // Ajusta altura automaticamente (requer CSS adicional)
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = (e.target.scrollHeight) + 'px';
                                        }}
                                    />

                                    {/* Botão de Enviar */}
                                    <button
                                        className={styles.sendButton}
                                        onClick={handleSendQuestion}
                                        disabled={userQuestion.trim() === ''} // Desabilita se vazio
                                        aria-label="Enviar pergunta via WhatsApp"
                                        type="button"
                                    >
                                        <i className="fas fa-paper-plane"></i> {/* Ícone FontAwesome */}
                                    </button>
                                </div>
                            </div>
                            {/* --- Fim da Nova Área de Input --- */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FAQSectionDS;