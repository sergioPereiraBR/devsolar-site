'use client';

import WhatsAppSender from '@/components/devsolar/utility/whatsapp/whatsapp_sender_ds.js';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import CustomCepInput from './cep';


const ps3BackgroundImage = 'images/ps3.webp'; // 'images/module.jpg'; //

const ContactSectionDS = ({ textClassButton, textMessage, textTag }) => {
    const [userMessage, setUserMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [whatsAppStatus, setWhatsAppStatus] = useState("initial");
    const phone = "5521998990303";
    const firstNameRef = useRef(null);
    const [message, setMessage] = useState(textMessage || "");
    const [messageWebWhastsapp, setMessageWebWhastsapp] = useState("");

    // --- Dados ---
    const COMPANY_LOGO_URL = '/images/logo-devsolar-icon.png';
    const WHATSAPP_CONTACT_NUMBER = "5521998990303";
    const WHATSAPP_BASE_MESSAGE = "Olá! Solicito falar com Especialista.\n\n";
    // --- Fim dos Dados ---

    // --- ESTADO PARA ATIVAR O WHATSAPP SENDER ---
    const [showWhatsAppSender, setShowWhatsAppSender] = useState(false);

    useEffect(() => {
        if (showModal) {
            // Resetar a mensagem ao abrir o modal, se necessário
            setFormData(prev => ({ ...prev, message: textMessage || "" }));
            // Focar o campo
            if (firstNameRef.current) {
                firstNameRef.current.focus();
            }
        }
    }, [showModal, textMessage]); // Adicionar textMessage como dependência se ele puder mudar

    // Estado para guardar todos os dados do formulário
    const [formData, setFormData] = useState({
        firstName: "",
        cep: "",
        roofType: "",
        otherRoof: "",
        message: textMessage || ""
    });

    const resetFormData = () => {
        setWhatsAppStatus("initial");
        setFormData(prevData => ({
            ...prevData,
            firstName: "",
            cep: "",
            roofType: "",
            otherRoof: "",
            message: textMessage || ""
        }));
    }

    // Estado para mostrar feedback após o envio (opcional)
    const [submittedData, setSubmittedData] = useState(null);

    // Callback que será passada para o CustomCepInput
    // Recebe o valor FORMATADO do CEP sempre que ele muda
    const handleCepChange = (formattedCepValue) => {
        setFormData(prevData => ({
            ...prevData,
            cep: formattedCepValue // Atualiza apenas o campo CEP no estado do formulário
        }));
    };

    // Handler genérico para outros campos do formulário
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevData => {
            const newData = {
                ...prevData,
                [name]: value
            };

            // Se o campo alterado foi 'roofType' E o novo valor NÃO é 'Outro'
            if (name === 'roofType' && value !== 'Outro') {
                newData.otherRoof = ""; // Limpa o otherRoof
            }

            return newData;
        });
    };

    // Dentro de ContactSectionDS
    const handleSubmit = (event) => {
        event.preventDefault();

        // Campos obrigatórios
        if (!formData.firstName || !formData.cep || !formData.roofType || (formData.roofType === 'Outro' && !formData.otherRoof)) {
            // Idealmente, mostre um erro mais específico ou destaque os campos
            alert("Preencha todos os campos obrigatórios.");
            setWhatsAppStatus("initial"); // Resetar status se falhar aqui
            return;
        }

        // Monta a mensagem (pode mover a lógica de dataToSend para cá)
        const finalMessage = formData.message || textMessage || "Olá, quero falar com especialista."; // Garante uma mensagem
        const messageBody =
            `*Nome:* ${formData.firstName}\n` +
            `*CEP:* ${formData.cep}\n` +
            `*Tipo de Telhado:* ${formData.roofType === 'Outro' ? formData.otherRoof : formData.roofType}\n\n` +
            `*Mensagem:* ${finalMessage}\n\n` + // Usar finalMessage
            `${textTag || ''}`; // Adicionar tag se existir
        const encodedMessage = encodeURIComponent(messageBody);

        setUserMessage(messageBody)
        handleInitiateSend()
        closeForm();
        //handleWhatsAppSenderClose()

        // onClick={handleInitiateSend} disabled={userMessage.trim() === ''

        // 4. Tentar abrir WhatsApp (abordagem simplificada - oferece web como fallback)
        // A detecção de mobile é opcional aqui. Pode tentar o app primeiro.
        //const whatsappUrlApp = `whatsapp://send?phone=${phone}&text=${encodedMessage}`;
        //const whatsappUrlWeb = `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`; // Corrigido: ?text=
        //setMessageWebWhastsapp(encodedMessage)

        //setWhatsAppStatus("sending"); // Opcional: estado de envio

        // Tenta abrir o app. Se não conseguir (comum no desktop),
        // ou se explicitamente quiser o web, usa o link web.
        // Uma forma simples é sempre oferecer o web como fallback ou opção.
        //try {
        // Tenta o app primeiro (pode não funcionar no desktop sem handler)
        // window.location.href = whatsappUrlApp; // Usar window.open é mais seguro para popups

        // Alternativa: Abrir Web diretamente ou como fallback
        //window.open(whatsappUrlApp, "_blank", "noopener noreferrer");
        //setWhatsAppStatus("sent"); // Ou apenas fechar
        //closeForm(); // Fechar o modal após sucesso

        //} catch (error) {
        //console.error("Erro ao tentar abrir WhatsApp:", error);
        // Se a tentativa acima falhar ou se quiser sempre oferecer:
        //setWhatsAppStatus("failed_fallback_web"); // Novo estado para indicar fallback
        // Não feche o formulário aqui, mostre a opção web
        //}
    };

    const resetFormState = () => { // Renomeado para clareza
        setFormData({
            firstName: "",
            cep: "",
            roofType: "",
            otherRoof: "",
            message: textMessage || "" // Resetar para o valor da prop
        });
        setWhatsAppStatus("initial");
    };

    function closeForm() {
        resetFormState();
        setShowModal(false);
    }

    // Função que ATIVA o processo de envio
    const handleInitiateSend = () => {
        // if (userMessage.trim() === '') return;
        setShowWhatsAppSender(true); // Ativa o componente WhatsAppSender
    };

    // Função chamada pelo WhatsAppSender quando o processo termina (ou é cancelado)
    const handleWhatsAppSenderClose = () => {
        setShowWhatsAppSender(false); // Desativa o sender
        setUserMessage(''); // Limpa o input AQUI
    };

    const modalStyles = {
        modalContent: {
            backgroundImage: `url('images/module.png')`, //`url('/images/ps3.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.3rem',
            overflow: 'hidden'
        },
        modalHeader: {
            border: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '15px 20px',
            position: 'relative' // Adicionado para posicionamento do botão de fechar
        },
        modalTitle: {
            color: '#ff9e00',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
            marginTop: 100
        },
        closeButton: {
            position: 'absolute',
            right: '15px',
            top: '15px',
            width: '40px',
            height: '40px',
            background: 'black',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            opacity: 1,
            transition: 'all 0.2s ease'
        },
        closeButtonIcon: {
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#ddd',
            lineHeight: '1',
            textShadow: 'none',
            marginBottom: 6
        },
        modalBody: {
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        formLabel: {
            color: 'white',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
            fontWeight: 'bold'
        },
        formControl: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'blue'
        }
    };

    return (
        <>
            <button
                className={textClassButton}
                onClick={() => { setShowModal(true) }}
            >
                <i className="fas fa-headset me-2"></i><span>Falar com Especialista</span>
            </button>

            <Modal
                show={showModal}
                onHide={closeForm}
                centered
                contentClassName="custom-modal-content"
            >
                <div style={modalStyles.modalContent}>
                    <Modal.Header style={modalStyles.modalHeader}>
                        <Modal.Title style={modalStyles.modalTitle}>Solicito falar com Especialista:</Modal.Title>
                        {/* Botão de fechar personalizado */}
                        <button
                            type="button"
                            style={modalStyles.closeButton}
                            onClick={closeForm}
                            aria-label="Fechar"
                        >
                            <span style={modalStyles.closeButtonIcon}>&times;</span>
                            <span className="visually-hidden">Fechar</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body style={modalStyles.modalBody}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="firstName" style={modalStyles.formLabel}>Nome</Form.Label>
                                <Form.Control
                                    ref={firstNameRef}
                                    type="text"
                                    autoComplete="given-name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    id="firstName"
                                    style={modalStyles.formControl}
                                />
                            </Form.Group>
                            <Row >
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <CustomCepInput
                                            stylesComp={modalStyles}
                                            name="cep" // Importante para autofill e semântica handleSubmitApp
                                            initialValue={formData.cep} // Pode ser útil se carregar dados existentes
                                            onCepChange={handleCepChange} // Passa a função de callback
                                            isRequired={true} // Define se é obrigatório
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="roofType" style={modalStyles.formLabel}>Tipo de Telhado</Form.Label>
                                        <Form.Select
                                            name="roofType"
                                            value={formData.roofType}
                                            onChange={handleInputChange}
                                            required
                                            id="roofType"
                                            style={modalStyles.formControl}
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="Metálico">Metálico</option>
                                            <option value="Cerâmico">Cerâmico</option>
                                            <option value="Fibrocimento">Fibrocimento</option>
                                            <option value="Concreto">Concreto</option>
                                            <option value="PVC">PVC</option>
                                            <option value="Outro">Outro</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                            </Row>

                            {formData.roofType === 'Outro' && (
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="otherRoof" style={modalStyles.formLabel}>Especifique</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="otherRoof"
                                        value={formData.otherRoof}
                                        onChange={handleInputChange}
                                        required
                                        id="otherRoof"
                                        style={modalStyles.formControl}
                                    />
                                </Form.Group>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label>Mensagem</Form.Label>
                                <Form.Control
                                    id="message"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Digite seu texto aqui..."
                                    spellCheck="true"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <div className="d-grid" style={{ marginTop: 50, marginBottom: 340 }}>
                                <Button variant="primary" type="submit" aria-label="Enviar mensagem via WhatsApp">
                                    Enviar Solicitação
                                </Button>
                                {whatsAppStatus === "failed_fallback_web" && (
                                    <div style={{ marginTop: 20, color: "yellow" }}> {/* Cor de aviso */}
                                        <p>Não foi possível abrir o app WhatsApp automaticamente.</p>
                                        <p>
                                            <a
                                                href={`https://web.whatsapp.com/send?phone=${phone}&text=${messageWebWhastsapp}`}
                                                aria-label="Enviar mensagem via WhatsApp"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => {
                                                    // Opcional: Fechar o modal após clicar no link web
                                                    // closeForm();
                                                    setWhatsAppStatus("initial"); // Reseta o status
                                                }}
                                            >
                                                Clique aqui para tentar enviar pela versão Web do WhatsApp
                                            </a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Form>
                    </Modal.Body>
                </div>
            </Modal >

            {/* --- Renderiza o Componente WhatsAppSender Condicionalmente --- */}
            <WhatsAppSender
                show={showWhatsAppSender}
                onHide={handleWhatsAppSenderClose} // Passa a função para fechar e limpar
                phoneNumber={WHATSAPP_CONTACT_NUMBER}
                baseMessage={WHATSAPP_BASE_MESSAGE}
                userMessage={userMessage} // Passa a pergunta atual
            />
        </>
    );
}


export default ContactSectionDS;


