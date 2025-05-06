// No topo absoluto do seu arquivo FAQSectionDS.jsx
'use client';

import EmojiPicker, { EmojiStyle } from 'emoji-picker-react'; // Importa o Emoji Picker
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react'; // Adicionado useState, useRef, useEffect
import { Button, Modal } from 'react-bootstrap';
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
const WHATSAPP_CONTACT_NUMBER = "5521998990303"; //"+55 21 99899-0303"; // Seu número de WhatsApp

// --- Fim dos Dados ---

/**
 * Estima o tipo de dispositivo do cliente com base no User Agent e características da tela.
 * IMPORTANTE: A detecção baseada em User Agent não é 100% precisa e pode ser enganada.
 * Use com cautela, principalmente para TV e Console.
 *
 * @returns {'Mobile' | 'Tablet' | 'Desktop' | 'TV' | 'Console' | 'Unknown'} O tipo de dispositivo estimado.
 */
function getDeviceType() {
    // Verifica se o código está rodando no navegador
    if (typeof window === 'undefined' || !navigator) {
        return 'Unknown'; // Ou talvez 'Server' se for em contexto de SSR sem window
    }

    const ua = navigator.userAgent.toLowerCase();

    // 1. Detecção Mobile (mais confiável)
    // Inclui a maioria dos telefones e alguns tablets Android mais antigos
    if (/android|iphone|ipod|windows phone|blackberry|iemobile|opera mini/i.test(ua)) {
        // Verifica se é um tablet Android (não contém 'mobile') ou iPad
        // O iPad moderno pode não ter 'iPad' no UA, mas terá Mac OS e touch
        const isTablet = /ipad|android(?!.*mobile)/i.test(ua) ||
            (navigator.maxTouchPoints > 1 && /macintosh/i.test(ua)); // Heurística para iPad recente
        if (isTablet) {
            return 'Tablet';
        }
        return 'Mobile';
    }

    // 2. Detecção de Tablet (iPad já coberto acima, outros casos)
    // Tablets podem ter user agents complexos, usar touch como indicador
    if (/tablet|kindle|silk/i.test(ua) || (navigator.maxTouchPoints > 1 && window.innerWidth >= 768)) {
        // Considera tablet se tiver touch e largura mínima razoável
        return 'Tablet';
    }


    // 3. Detecção de TV (menos confiável - depende de strings específicas)
    if (/tv|smarttv|googletv|crkey|appletv|tizen|webos|viera|netcast|dtv|nettv|playstation|xbox|nintendo/i.test(ua)) {
        // Verifica se é um console especificamente
        if (/playstation|xbox|nintendo/i.test(ua)) {
            return 'Console';
        }
        return 'TV';
    }

    // 4. Detecção de Console (se não detectado junto com TV)
    if (/playstation|xbox|nintendo/i.test(ua)) {
        return 'Console';
    }

    // 5. Se não for Mobile, Tablet, TV ou Console, assume Desktop
    // Poderia adicionar uma checagem extra para telas muito grandes como possível TV
    // if (window.innerWidth > 1600 || window.innerHeight > 900) {
    //     // Heurística para telas muito grandes, podem ser TVs conectadas a PCs
    // }
    return 'Desktop';
}


function FAQSectionDS() {
    // Estado para a pergunta do usuário
    const [userQuestion, setUserQuestion] = useState('');
    // Estado para controlar a visibilidade do seletor de emojis
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showDesktopChoiceModal, setShowDesktopChoiceModal] = useState(false);
    const [messageDataToSend, setMessageDataToSend] = useState(null); // Guarda os dados da msg para o modal
    // Ref para o input/textarea para inserir emojis na posição correta (opcional avançado)
    const inputRef = useRef(null);
    // Fecha o emoji picker se clicar fora dele
    const emojiPickerRef = useRef(null);

    const [deviceType, setDeviceType] = useState('Unknown');

    useEffect(() => {
        // Chama a função SOMENTE no lado do cliente
        setDeviceType(getDeviceType());
    }, []); // Executa apenas uma vez na montagem


    // // Handler para atualizar a pergunta do usuário
    // const handleUserInputChange = (e) => {
    //     setUserQuestion(e.target.value);
    // };

    // // Handler para adicionar o emoji selecionado à pergunta
    // const onEmojiClick = (emojiObject) => {
    //     // Insere o emoji onde o cursor estava (ou apenas anexa)
    //     setUserQuestion(prevInput => prevInput + emojiObject.emoji);
    //     // Fecha o picker após selecionar (opcional)
    //     // setShowEmojiPicker(false);
    // };

    // ... (handleUserInputChange, onEmojiClick, useEffect para fechar picker - inalterados) ...
    const handleUserInputChange = (e) => { setUserQuestion(e.target.value); };
    const onEmojiClick = (emojiObject) => { setUserQuestion(prevInput => prevInput + emojiObject.emoji); };
    useEffect(() => { /* ... lógica de fechar picker ... */
        function handleClickOutside(event) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                const toggleButton = document.getElementById('emoji-toggle-button');
                if (!toggleButton || !toggleButton.contains(event.target)) {
                    setShowEmojiPicker(false);
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, [emojiPickerRef]);

    // Função para preparar dados e decidir fluxo
    const prepareAndSendQuestion = () => {
        const trimmedQuestion = userQuestion.trim();
        if (trimmedQuestion === '') return;

        const sanitizedQuestion = trimmedQuestion
            .replace(/\u00A0/g, ' ')
            .replace(/\s{2,}/g, ' ');

        // Remove o VS16
        const finalQuestion = sanitizedQuestion.replace(/\uFE0F/g, '');

        const baseMessage = "Olá! Tenho uma dúvida que não encontrei no FAQ do site:";
        const fullMessage = `${baseMessage}\n\n"${finalQuestion}"`;
        const encodedMessage = encodeURIComponent(fullMessage); // Com emoji (para app)

        // Mensagem de fallback sem emoji problemático
        const fallbackQuestion = finalQuestion.replace(/❤/g, '[emoji]'); // Substitui por texto
        const fallbackFullMessage = `${baseMessage}\n\n"${finalQuestion}"`;
        const encodedFallbackMessage = encodeURIComponent(fallbackFullMessage); // Sem emoji (para web)

        // Guarda os dados para usar no modal ou envio direto
        const data = {
            encodedMessage,
            encodedFallbackMessage,

            whatsappAppDesktop: `whatsapp://send?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedFallbackMessage}`,
            whatsappWebDesktop: `https://web.whatsapp.com/send?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedFallbackMessage}`,
            whatsappAppMobile: `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodedFallbackMessage}`,
            whatsappAppWebMobile: `https://api.whatsapp.com/send?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedFallbackMessage}`
        };

        // const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (deviceType == 'Mobile' || deviceType == 'Tablet' || deviceType == 'TV') {
            // Mobile: Tenta direto o app
            console.log("Dispositivo móvel detectado. Tentando abrir app:", data.whatsappAppUrl);
            // Web - Mobile ?
            // window.location.href = `${data.whatsappAppMobile} : App - Mobile`; // Smart: funciona perfeito em mobile com app instalado, via web abre nova janela e o emoji falha
            // window.location.href = `${data.whatsappAppDesktop} : App - Mobile`; // Smart: funciona perfeito em mobile com app instalado - não abre janela
            // window.location.href = `${data.whatsappWebDesktop} : App - Mobile`; // Smart: Não abre app e falha ao tentar abrir web - abre apenas web na mesma janela // Tab: Abre apenas web e passa mensagem completa - abre na mesma janela. 
            // window.location.href = `${data.whatsappX} : App - Mobile`; // Smart: Abre App e passa mensagem completa - abre apenas app // Tab: Abre apenas web sem atenticação e não passa mensagem com falha no emoji - abre na mesma janela.
            // window.open(`${data.whatsappAppMobile} : Mobile:`, '_blank', 'noopener,noreferrer'); // Smart: Abre App e passa mensagem completa - abre apenas app // Tab: Abre apenas web sem atenticação e passa mensagem com falha no emoji ao usar na web - abre em nova janela.
            // window.open(`${data.whatsappAppDesktop} : Mobile:`, '_blank', 'noopener,noreferrer'); // Smart: Abre App e passa mensagem completa - abre apenas app // Tab: Abre apenas web sem atenticação e passa mensagem com falha no emoji ao usar na web - abre em nova janela.
            // window.open(`${data.whatsappAppDesktop} : Mobile:`, '_blank', 'noopener,noreferrer'); // Smart: Abre App e passa mensagem completa - abre apenas app // Tab: Abre apenas web, mas não carrega a página - abre em nova janela.
            window.open(`${data.whatsappAppWebMobile}`, '_blank', 'noopener,noreferrer'); // Smart: Abre App e passa mensagem completa - abre apenas app // Tab: Abre apenas web e carrega a página, usuário inicia conversa e passa mensagem completa - abre em nova janela.

            clearInput(); // Limpa após tentar enviar
        }

        if (deviceType == 'Desktop') {
            // Desktop: Mostra modal de escolha
            console.log(`Dispositivo ${deviceType} detectado. Exibindo modal de escolha.`);
            // window.open(`${data.whatsappAppMobile} : Desktop:`, '_blank', 'noopener,noreferrer'); // [x] web com falha no emoji na alternativa do app e não trasfere mensagem na web - em nova janela.
            // window.open(`${data.whatsappWebDesktop} : Web - Desktop:`, '_blank', 'noopener,noreferrer'); // [V] Web - Desktop: funcioona perfeito em desktop somente na web e com ou sem aplicativo instalado - em nova janela).
            // window.open(`${data.whatsappAppDesktop} : App - Desktop:`, '_blank', 'noopener,noreferrer'); // [V] App - Desktop: funcioona perfeito em desktop somente no App, com o aplicativo instalado - sem janela.
            // window.open(`${data.whatsappAppWebMobile} : Desktop:`, '_blank', 'noopener,noreferrer'); // [X] permite acessa o app e funciona bem, mas na web não passa a mensagem - em nova janela.
            // window.location.href = `${data.whatsappAppMobile} : Web - Desktop`; // [X] permite acesso ao app e empji não funciona, mas na web não passa a mensagem - na mesma janela.
            // window.location.href = `${data.whatsappWebDesktop} : Web - Desktop`; // [-] Web - Desktop: funcioona perfeito em desktop somente na web e com ou sem aplicativo instalado - (mesma janela?).
            // window.location.href = `${data.whatsappAppDesktop} : App - Desktop`; // [V] App - Desktop: funcioona perfeito em desktop somente no App, onde o aplicativo precisa estar instalado.
            // window.location.href = `${data.whatsappAppWebMobile} : Desktop`; // [X] Abre web e possibilita abrir o app no desktop, que funciona, mas não volta ao site e se retornar fica bloqueado - na mesma janela.

            // [x] window.open(`https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`, '_blank');
            // [x] window.location.href = `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`;
            // [x] const appUrl = `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`;
            // [-] const universalUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;


            setMessageDataToSend(data); // Armazena os dados para o modal usar
            setShowDesktopChoiceModal(true); // Abre o modal
        }
    };

    // Função chamada pelos botões do modal de escolha
    const handleDesktopChoice = (useApp) => {
        if (!messageDataToSend) return;

        // window.open(`${data.whatsappWebDesktop} : Web - Desktop:`, '_blank', 'noopener,noreferrer'); // [V] Web - Desktop: funcioona perfeito em desktop somente na web e com ou sem aplicativo instalado - em nova janela).
        // window.open(`${data.whatsappAppDesktop} : App - Desktop:`, '_blank', 'noopener,noreferrer'); // [V] App - Desktop: funcioona perfeito em desktop somente no App, com o aplicativo instalado - sem janela.
        // window.open(`${data.whatsappWebDesktop} : Web - Desktop:`, '_blank', 'noopener,noreferrer'); // [V] Web - Desktop: funcioona perfeito em desktop somente na web e com ou sem aplicativo instalado - em nova janela).
        // window.open(`${data.whatsappAppDesktop} : App - Desktop:`, '_blank', 'noopener,noreferrer'); // [V] App - Desktop: funcioona perfeito em desktop somente no App, com o aplicativo instalado - sem janela.
        // whatsappAppDesktop: `whatsapp://send?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedFallbackMessage}`,
        // whatsappWebDesktop: `https://web.whatsapp.com/send?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedFallbackMessage}`,

        if (useApp) {
            // Usuário escolheu App: tenta protocolo whatsapp://
            console.log("Usuário escolheu App. Tentando URL:", messageDataToSend.whatsappAppDesktop);
            // Tentar abrir via location.href ou window.open - location pode ser melhor para protocolo
            window.location.href = messageDataToSend.whatsappAppDesktop;
            // Alternativa: window.open(messageDataToSend.whatsappAppUrl, '_self');
            //window.open(messageDataToSend.whatsappAppDesktop, '_blank', 'noopener,noreferrer');
        } else {
            // Usuário escolheu Navegador: abre wa.me com fallback sem emoji
            console.log("Usuário escolheu Navegador. Abrindo URL:", messageDataToSend.whatsappWebDesktop);
            window.location.href = messageDataToSend.whatsappWebDesktop;
            //window.open(messageDataToSend.whatsappWebDesktop, '_blank', 'noopener,noreferrer');
            //window.open(data.whatsappWebDesktop, '_blank', 'noopener,noreferrer');
        }
        closeAndClear(); // Fecha modal e limpa input
    };

    // Função para fechar modal de escolha e limpar
    const closeAndClear = () => {
        setShowDesktopChoiceModal(false);
        setMessageDataToSend(null);
        setUserQuestion('');
        setShowEmojiPicker(false);
    };

    // Função auxiliar para limpar input (usada no mobile e após escolha desktop)
    const clearInput = () => {
        setUserQuestion('');
        setShowEmojiPicker(false);
    }

    // Handler para enviar a pergunta via WhatsApp
    const handleSendQuestion = () => {
        const trimmedQuestion = userQuestion.trim();
        if (trimmedQuestion === '') return;

        const sanitizedQuestion = trimmedQuestion
            .replace(/\u00A0/g, ' ')
            .replace(/\s{2,}/g, ' ');
        // ... (sanitização, montagem de fullMessage, encodedMessage, fallbackQuestion, encodedFallbackMessage - igual antes) ...
        const finalQuestion = sanitizedQuestion.replace(/\uFE0F/g, '');
        const baseMessage = "Olá! Tenho uma dúvida que não encontrei no FAQ do site:";
        const fullMessage = `${baseMessage}\n\n"${finalQuestion}"`;
        const encodedMessage = encodeURIComponent(fullMessage); // Para tentar no app

        const fallbackQuestion = finalQuestion.replace(/❤/g, '[emoji]'); // Ou remove ''
        const fallbackFullMessage = `${baseMessage}\n\n"${fallbackQuestion}"`;
        const encodedFallbackMessage = encodeURIComponent(fallbackFullMessage); // Para o fallback web

        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        const whatsappAppUrl = `whatsapp://send/?phone=${WHATSAPP_CONTACT_NUMBER}&text=${encodedMessage}`;
        const whatsappWebUrlFallback = `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodedFallbackMessage}`; // Fallback SEMPRE usa msg sem emoji problemático

        console.log("URL App:", whatsappAppUrl);
        console.log("URL Fallback Web:", whatsappWebUrlFallback);

        if (isMobile) {
            // Mobile: Tenta direto o app (sabemos que funciona com emoji)
            window.location.href = whatsappAppUrl;
        } else {
            // --- Desktop: Tenta App, Fallback Web ---

            // 1. Define um timestamp para checar foco depois
            const attemptTimestamp = Date.now();

            // 2. Tenta navegar para o protocolo whatsapp://
            //    Isso pode ou não mudar o foco da janela, dependendo do navegador/OS/configuração
            window.location.href = whatsappAppUrl;

            // 3. Define um fallback com setTimeout
            setTimeout(() => {
                // 4. Verifica se a janela ainda tem foco ou se tempo suficiente passou
                //    Se a janela perdeu foco (difícil de garantir) OU se muito tempo passou
                //    sem interação (indicando que o app provavelmente não abriu ou foi ignorado),
                //    abre o fallback web.
                //    A verificação de foco com document.hidden ou document.hasFocus é imperfeita
                //    para detectar abas/apps externos. Usar um delay razoável é mais prático.

                // Delay de fallback (ex: 1.5 segundos) - ajuste se necessário
                const fallbackDelay = 1500;

                if (Date.now() - attemptTimestamp < fallbackDelay + 100) {
                    // Se passou menos tempo que o delay + uma margem,
                    // é provável que o app não abriu ou o usuário está interagindo com o popup de permissão.
                    // Abrir o fallback agora pode ser abrupto.
                    // Poderíamos adicionar lógica mais complexa aqui (ex: só abrir se a aba ainda estiver visível),
                    // mas por simplicidade, vamos abrir o fallback se o tempo passou.
                    // => Comentário: Para uma UX mais simples, talvez só executar o fallback se um erro for pego,
                    // o que não acontece aqui. A lógica do tempo é uma heurística.
                }

                // Executa o fallback após o delay, assumindo que o app não abriu ou não foi o desejado
                // Usamos window.open para o fallback para garantir nova aba/janela
                console.log(`Executando fallback web após ${fallbackDelay}ms.`);
                window.open(whatsappWebUrlFallback, '_blank', 'noopener,noreferrer');


            }, 1500); // Ajuste este delay (em milissegundos) conforme necessário
        }

        // Limpa o estado (isso acontecerá antes do setTimeout terminar no desktop)
        setUserQuestion('');
        setShowEmojiPicker(false);
    };


    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
    //             // Verifica também se o clique não foi no botão de toggle
    //             // (Assume que o botão de toggle tem um id ou classe específica, ex: 'emoji-toggle-button')
    //             const toggleButton = document.getElementById('emoji-toggle-button'); // Ou use uma ref no botão
    //             if (!toggleButton || !toggleButton.contains(event.target)) {
    //                 setShowEmojiPicker(false);
    //             }
    //         }
    //     }
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [emojiPickerRef]);

    return (
        <>
            <section id="faq" className={`${styles.sectionFaq} section bg-light`}>
                <div className="container">
                    {/* ... Cabeçalho da Seção ... */}
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
                                        onClick={prepareAndSendQuestion}
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
            {/* --- NOVO Modal de Escolha para Desktop --- */}
            <Modal show={showDesktopChoiceModal} onHide={closeAndClear} centered size="sm">
                <Modal.Header closeButton className={styles.modalChoiceHeader}>
                    <Modal.Title className={styles.modalChoiceTitle}>Como deseja enviar?</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalChoiceBody}>
                    <p>Escolha como abrir o WhatsApp:</p>
                    <div className="d-grid gap-2">
                        <Button
                            variant="success" // Cor do WhatsApp
                            onClick={() => handleDesktopChoice(true)} // true para usar App
                            className={styles.modalChoiceButton}
                        >
                            <i className="fab fa-whatsapp me-2"></i> Abrir no Aplicativo
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => handleDesktopChoice(false)} // false para usar Navegador
                            className={styles.modalChoiceButton}
                        >
                            <i className="fas fa-globe me-2"></i> Abrir no Navegador
                        </Button>
                    </div>
                    <small className="text-muted d-block mt-3">
                        Abrir no aplicativo tentará usar o WhatsApp Desktop (se instalado) e incluirá emojis. Abrir no navegador usará o WhatsApp Web e pode não exibir alguns emojis corretamente.
                    </small>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FAQSectionDS;