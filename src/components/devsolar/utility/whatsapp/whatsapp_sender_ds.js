'use client';

import { getDeviceType } from '@/utils/device_detector_ds';
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './whatsapp_sender_ds.module.css'; // CSS Module para este componente
// Chave para localStorage
const WHATSAPP_PREFERENCE_KEY = 'whatsapp_open_preference'; // ex: 'app' ou 'web'

// Função auxiliar para sanitizar e preparar mensagens
const prepareMessages = (baseMessage, userMessage) => {
    const trimmedMessage = userMessage?.trim() ?? ''; // Garante que userMessage não seja null/undefined
    if (trimmedMessage === '') return null; // Não processa se não houver pergunta
    const message = trimmedMessage;
    //const sanitizedMessage = trimmedMessage
    //    .replace(/\u00A0/g, ' ') // Remove NBSP
    //    .replace(/\s{2,}/g, ' '); // Remove espaços múltiplos

    // Remove VS16 para App, substitui emoji problemático para Web
    //const message = sanitizedMessage.replace(/\uFE0F/g, '');
    //const questionForWeb = sanitizedQuestion.replace(/\uFE0F/g, '');
    // const questionForWeb = questionForApp.replace(/❤/g, '[emoji]'); // Ou remove ''

    let fullMessage = '';

    if (baseMessage === '') {
        fullMessage = message;
    } else {
        fullMessage = `${baseMessage}\n${message}`;
    }

    //const fullMessageWeb = `${baseMessage}\n\n"${questionForWeb}"`;

    const encodedMessageApp = encodeURIComponent(fullMessage);
    const encodedMessageWeb = encodeURIComponent(fullMessage);

    return { encodedMessageApp, encodedMessageWeb };
};

/**
 * Componente/Hook para lidar com o envio de mensagens para o WhatsApp,
 * incluindo detecção mobile/desktop e modal de escolha.
 *
 * Props:
 * - show: boolean - Controla se o processo de envio deve ser iniciado.
 * - onHide: function - Chamada quando o processo termina (enviado ou cancelado).
 * - phoneNumber: string - O número de telefone do WhatsApp (ex: 55219...).
 * - baseMessage: string - A parte fixa da mensagem (ex: "Olá! Tenho uma dúvida...").
 * - userMessage: string - A pergunta específica do usuário (pode conter emojis).
 */
function WhatsAppSender({ show, onHide, phoneNumber, baseMessage, userMessage }) {
    const [deviceType, setDeviceType] = useState('Unknown');
    const [isProcessing, setIsProcessing] = useState(false); // Evita múltiplos cliques/processamentos
    const [showChoiceModal, setShowChoiceModal] = useState(false);
    const [preparedUrls, setPreparedUrls] = useState(null);

    // --- NOVO ESTADO para "Lembrar Escolha" ---
    const [rememberChoice, setRememberChoice] = useState(false); // Checkbox state

    // Roda uma vez para detectar o tipo de dispositivo
    useEffect(() => {
        setDeviceType(getDeviceType);
    }, []);

    useEffect(() => {
        setDeviceType(getDeviceType);
        // Só processa quando 'show' é true e não está processando
        if (show && !isProcessing && userMessage && deviceType !== 'Unknown') {
            setIsProcessing(true); // Marca como processando
            console.log("Device Type: ", deviceType);

            const messages = prepareMessages(baseMessage, userMessage);

            if (!messages) {
                console.warn("Pergunta do usuário está vazia após sanitização.");
                onHide(); // Fecha se a pergunta for inválida
                setIsProcessing(false);
                return;
            }

            const { encodedMessageApp, encodedMessageWeb } = messages;

            const urls = {
                app: `whatsapp://send?phone=${phoneNumber}&text=${encodedMessageApp}`,
                web: `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessageWeb}`,
                pho: `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessageWeb}`
            };
            setPreparedUrls(urls); // Guarda as URLs prontas

            if (deviceType === 'Mobile' || deviceType === 'Tablet') { // TV removida por enquanto
                console.log(`${deviceType}: Tentando abrir app:`, urls.app);
                window.open(`${urls.pho}`, '_blank', 'noopener,noreferrer');
                // window.location.href = urls.app;
                // Pequeno delay antes de chamar onHide no mobile para dar tempo ao redirect
                setTimeout(onHide, 300);
            } else if (deviceType === 'Desktop') {
                // --- LÓGICA DESKTOP COM PREFERÊNCIA ---
                const savedPreference = localStorage.getItem(WHATSAPP_PREFERENCE_KEY);
                console.log("Preferência salva:", savedPreference);

                if (savedPreference === 'app') {
                    console.log("Desktop: Usando preferência salva 'app'.");
                    window.location.href = urls.app; // Tenta abrir app
                    setTimeout(onHide, 300); // Delay para dar tempo
                } else if (savedPreference === 'web') {
                    console.log("Desktop: Usando preferência salva 'web'.");
                    window.open(urls.web, '_blank', 'noopener,noreferrer'); // Abre web
                    onHide();
                } else {
                    // Nenhuma preferência salva, mostra o modal
                    console.log("Desktop: Nenhuma preferência salva. Exibindo modal.");
                    setShowChoiceModal(true);
                    // onHide será chamado após a escolha do usuário
                }
            } else {
                // Caso desconhecido ou TV/Console - talvez fallback para web?
                console.log(`Tipo de dispositivo ${deviceType} não tratado ou desconhecido, usando fallback web.`);
                window.open(urls.web, '_blank', 'noopener,noreferrer');
                onHide();
            }
        } else if (!show) {
            // Reseta quando o componente é "escondido"
            setIsProcessing(false);
            setShowChoiceModal(false);
            setPreparedUrls(null);
            setRememberChoice(false); // Reseta o checkbox também
        }

    }, [show, isProcessing, userMessage, baseMessage, phoneNumber, onHide]); // Dependências do effect


    // Handler para a escolha no modal desktop
    const handleDesktopChoice = (useApp) => {
        if (!preparedUrls) return;

        // --- Salva a Preferência se marcado ---
        if (rememberChoice) {
            const preferenceToSave = useApp ? 'app' : 'web';
            try {
                localStorage.setItem(WHATSAPP_PREFERENCE_KEY, preferenceToSave);
                console.log("Preferência salva:", preferenceToSave);
            } catch (error) {
                console.error("Erro ao salvar preferência no localStorage:", error);
                // Informar usuário? Ou apenas falhar silenciosamente?
            }
        }

        // Abre o link escolhido
        if (useApp) {
            console.log("Usuário escolheu App (Desktop). Tentando URL:", preparedUrls.app);
            window.location.href = preparedUrls.app; // Tenta protocolo
        } else {
            console.log("Usuário escolheu Navegador (Desktop). Abrindo URL:", preparedUrls.web);
            window.open(preparedUrls.web, '_blank', 'noopener,noreferrer'); // Abre wa.me
        }
        onHide(); // Chama onHide após a escolha e tentativa
    };


    // --- Renderização ---
    // Renderiza apenas o modal se for necessário (Desktop sem preferência salva)
    if (!show || !showChoiceModal || !preparedUrls || deviceType !== 'Desktop') {
        return null;
    }

    // Renderiza o Modal de Escolha para Desktop
    return (
        <Modal show={showChoiceModal} onHide={onHide} centered size="sm">
            <Modal.Header closeButton className={styles.modalChoiceHeader}>
                <Modal.Title className={styles.modalChoiceTitle}>Como abrir o WhatsApp?</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalChoiceBody}>
                <p>Escolha como abrir o WhatsApp:</p>
                <div className="d-grid gap-2">
                    <Button variant="success" onClick={() => handleDesktopChoice(true)} className={styles.modalChoiceButton}>
                        <i className="fab fa-whatsapp me-2"></i> Abrir no Aplicativo
                    </Button>
                    <Button variant="secondary" onClick={() => handleDesktopChoice(false)} className={styles.modalChoiceButton}>
                        <i className="fas fa-globe me-2"></i> Abrir no Navegador
                    </Button>
                </div>
                {/* --- CHECKBOX "Lembrar Escolha" --- */}
                <Form.Group controlId="whatsappRememberChoice" className="mt-3 text-center">
                    <Form.Check
                        type="checkbox"
                        label="Lembrar minha escolha neste navegador"
                        checked={rememberChoice}
                        onChange={(e) => setRememberChoice(e.target.checked)}
                        className={styles.rememberCheckbox} // Classe para estilização opcional
                    />
                </Form.Group>
                {/* <small className="text-muted d-block mt-3">...</small> */}
            </Modal.Body>
        </Modal>
    );
    //     <Modal show={showChoiceModal} onHide={onHide} centered size="sm">
    //         <Modal.Header closeButton className={styles.modalChoiceHeader}>
    //             <Modal.Title className={styles.modalChoiceTitle}>Como deseja enviar?</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body className={styles.modalChoiceBody}>
    //             <p>Escolha como abrir o WhatsApp:</p>
    //             <div className="d-grid gap-2">
    //                 <Button
    //                     variant="success"
    //                     onClick={() => handleDesktopChoice(true)}
    //                     className={styles.modalChoiceButton}
    //                 >
    //                     <i className="fab fa-whatsapp me-2"></i> Abrir no Aplicativo
    //                 </Button>
    //                 <Button
    //                     variant="secondary"
    //                     onClick={() => handleDesktopChoice(false)}
    //                     className={styles.modalChoiceButton}
    //                 >
    //                     <i className="fas fa-globe me-2"></i> Abrir no Navegador
    //                 </Button>
    //             </div>
    //             <small className="text-muted d-block mt-3">
    //                 Abrir no aplicativo tentará usar o WhatsApp Desktop e pode incluir emojis. Abrir no navegador usará o WhatsApp Web (pode não exibir alguns emojis).
    //             </small>
    //         </Modal.Body>
    //     </Modal>
    // );
}

export default WhatsAppSender;


/*

        if (deviceType == 'Mobile' || deviceType == 'Tablet' || deviceType == 'TV') {
            console.log("Mobile: Tentando abrir app:", urls.app);
            window.open(`${urls.pho}`, '_blank', 'noopener,noreferrer');
            onHide(); // Fecha e indica que a ação foi tentada
            // Resetar estado interno? Não precisa aqui, será resetado quando show=false
        }

        if (deviceType == 'Desktop') {
            // Desktop: Mostra o modal de escolha
            console.log("Desktop: Exibindo modal de escolha.");
            setShowChoiceModal(true);
            // Não chama onHide ainda, espera a escolha do usuário
        }
    } else if (!show) {
        // Reseta quando o componente é "escondido" pelo pai
        setIsProcessing(false);
        setShowChoiceModal(false);
        setPreparedUrls(null);
    }
*/