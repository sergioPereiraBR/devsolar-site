// No topo do arquivo FAQSectionDS.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import LogoDevSolar from '@/assets/logo-devsolar-icon.webp';
import PersonaA from '@/assets/persona-1.webp';
import PersonaB from '@/assets/persona-2.webp';
import PersonaC from '@/assets/persona-3.webp';
import PersonaD from '@/assets/persona-4.webp';
import PersonaE from '@/assets/persona-5.webp';
import Accordion from 'react-bootstrap/Accordion';

import { FaIcon } from '@/components/devsolar/utility/fa-icon';

import styles from './faq_section_ds.module.css';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

const WhatsAppSender = dynamic(
  () => import('@/components/devsolar/utility/whatsapp/whatsapp_sender_ds.js'),
  { ssr: false },
);

// --- Dados ---
const faqData = [
  // ... (seus dados faqData existentes) ...
  {
    id: '0',
    question: 'Quanto tempo leva para instalar um sistema solar?',
    answer:
      'A instalação física é rápida, levando de 2 a 3 dias para residências e de 1 a 3 semanas para grandes projetos comerciais, industriais ou condomínios. No entanto, o processo completo inclui a homologação da concessionária para conectar o sistema à rede elétrica pública, etapa que leva de 1 a 4 semanas.',
    personaImage: PersonaA,
  },
  {
    id: '1',
    question: 'Os painéis funcionam em dias nublados?',
    answer:
      'Sim!<br><br>Os painéis solares dependem da luminosidade e radiação, não do calor, por isso continuam gerando energia mesmo com o céu encoberto. Em dias totalmente nublados, a produção se mantém ativa, operando entre 10% e 25% da sua capacidade máxima em comparação a um dia de céu limpo.',
    personaImage: PersonaB,
  },
  {
    id: '2',
    question: 'Preciso de baterias para armazenar energia?',
    answer:
      'Não necessariamente.<br><br>A maioria dos sistemas utiliza o modelo On-Grid, que funciona conectado à rede pública. Durante o dia, os painéis geram energia para consumo imediato e o excedente é enviado para a distribuidora, transformando-se em créditos. À noite ou em dias chuvosos, você consome a energia da rede e abate desses créditos acumulados.<br><br>O uso de baterias é restrito aos modelos Off-Grid ou Híbridos, indicados apenas para situações específicas. São elas: locais isolados sem acesso à rede, proteção contra apagões, armazenamento estratégico para horários de tarifa alta e atendimento a sistemas críticos.',
    personaImage: PersonaC,
  },
  {
    id: '3',
    question: 'Qual a vida útil dos painéis solares?',
    answer:
      'Os painéis solares modernos têm vida útil superior a 25 anos. Os fabricantes garantem que eles manterão pelo menos 80% a 85% da sua capacidade de geração original ao final desse período. Na prática, muitos módulos continuam gerando energia por 30 ou 40 anos, operando apenas com uma eficiência ligeiramente reduzida.',
    personaImage: PersonaD,
  },
  {
    id: '4',
    question: 'Como funciona o financiamento dos sistemas?',
    answer:
      'O processo é estruturado para que a própria economia gerada pague o investimento. O objetivo principal é que o valor da parcela seja igual ou menor do que a redução obtida na sua conta de luz. Para isso, oferecemos opções de financiamento de até 100% do projeto, cobrindo tanto os equipamentos (painéis e inversor) quanto a mão de obra de instalação.',
    personaImage: PersonaE,
  },
];
const COMPANY_LOGO_URL = LogoDevSolar;
const WHATSAPP_CONTACT_NUMBER = '5521999677722';
const WHATSAPP_BASE_MESSAGE = 'FAQ do site:';
// --- Fim dos Dados ---

function renderAnswerWithLineBreaks(answerText) {
  return answerText.split(/<br\s*\/?\s*>/i).map((part, index, parts) => (
    <span key={`${index}-${part.slice(0, 12)}`}>
      {part}
      {index < parts.length - 1 ? <br /> : null}
    </span>
  ));
}

function FAQSectionDS() {
  const [userMessage, setUserMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const devSolarLogo = { width: 'auto', height: '60px' };

  // --- ESTADO PARA ATIVAR O WHATSAPP SENDER ---
  const [showWhatsAppSender, setShowWhatsAppSender] = useState(false);

  // ... (handleUserInputChange, onEmojiClick, useEffect para fechar picker - inalterados) ...
  const handleUserInputChange = (e) => {
    setUserMessage(e.target.value);
  };
  const onEmojiClick = (emojiObject) => {
    setUserMessage((prevInput) => prevInput + emojiObject.emoji);
  };
  useEffect(() => {
    /* ... lógica de identificar device e fechar picker ... */
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        const toggleButton = document.getElementById('emoji-toggle-button');
        if (!toggleButton || !toggleButton.contains(event.target)) {
          setShowEmojiPicker(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiPickerRef]);

  // Função que ATIVA o processo de envio
  const handleInitiateSend = () => {
    if (userMessage.trim() === '') return;
    setShowWhatsAppSender(true); // Ativa o componente WhatsAppSender
  };

  // Função chamada pelo WhatsAppSender quando o processo termina (ou é cancelado)
  const handleWhatsAppSenderClose = () => {
    setShowWhatsAppSender(false); // Desativa o sender
    setUserMessage(''); // Limpa o input AQUI
    setShowEmojiPicker(false);
  };

  return (
    <>
      <section id="faq" className={styles.sectionFaq}>
        <div className="container">
          {/* ... Cabeçalho e Acordeão ... */}
          <div className="mb-5 text-center">
            <h2 className={`${styles.sectionTitle} fw-bold`}>
              Perguntas Frequentes (FAQ)
            </h2>
            <p className={`${styles.sectionSubtitle} lead`}>
              Tire suas dúvidas sobre energia solar
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9 col-md-10">
              {/* Acordeão Existente */}
              <Accordion defaultActiveKey="0" className={styles.faqAccordion}>
                {faqData.map((item) => (
                  <Accordion.Item
                    key={item.id}
                    eventKey={item.id}
                    className={styles.faqItem}
                  >
                    {/* ... (Seu Accordion.Header e Accordion.Body existentes) ... */}
                    {/* Cabeçalho customizado (simula a pergunta do usuário) */}
                    <Accordion.Header as="div" className={styles.messageHeader}>
                      <div
                        className={`${styles.messageRow} ${styles.questionRow}`}
                      >
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
                        <div
                          className={`${styles.messageBubble} ${styles.questionBubble}`}
                        >
                          <h3>{item.question}</h3>
                        </div>
                        <span className={styles.toggleIcon}></span>
                      </div>
                    </Accordion.Header>
                    {/* Corpo customizado (simula a resposta da empresa) */}
                    <Accordion.Body className={styles.messageBody}>
                      <div
                        className={`${styles.messageRowAns} ${styles.answerRow}`}
                      >
                        <div
                          className={`${styles.messageBubble} ${styles.answerBubble}`}
                        >
                          <h4>{renderAnswerWithLineBreaks(item.answer)}</h4>
                        </div>
                        <div className={styles.avatarContainer}>
                          <Image
                            src={COMPANY_LOGO_URL}
                            alt="Logo da Empresa"
                            width={60}
                            height={60}
                            className={styles.avatarImage}
                            style={{ devSolarLogo }}
                          />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>

              {/* Área de Input do Usuário */}
              <div className={styles.userInputSection}>
                <h3 className={styles.userInputTitle}>
                  Tire suas dúvidas para gerar sua própria energia com a Dev
                  Solar:
                </h3>
                <div className={styles.inputAreaContainer}>
                  {/* Botão Emoji e Picker */}
                  <button
                    id="emoji-toggle-button"
                    className={styles.emojiButton}
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    aria-label="Selecionar emoji"
                    type="button"
                  >
                    <FaIcon iconClass="far fa-smile" />
                  </button>
                  {showEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      className={styles.emojiPickerWrapper}
                    >
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        emojiStyle="native"
                        height={350}
                        width="100%"
                      />
                    </div>
                  )}
                  {/* Textarea */}
                  <textarea
                    id="pergunta-faq"
                    name="pergunta_faq"
                    aria-label="Digite sua pergunta para o FAQ"
                    ref={inputRef}
                    className={styles.userInput}
                    rows="1"
                    placeholder="Digite sua pergunta..."
                    value={userMessage}
                    onChange={handleUserInputChange}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                  {/* Botão de Enviar (agora chama handleInitiateSend) */}
                  <button
                    className={styles.sendButton}
                    onClick={handleInitiateSend}
                    disabled={userMessage.trim() === ''}
                    aria-label="Enviar pergunta via WhatsApp"
                    type="button"
                  >
                    <FaIcon iconClass="fas fa-paper-plane" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Renderiza o Componente WhatsAppSender Condicionalmente ---  #21C063 */}
      <WhatsAppSender
        show={showWhatsAppSender}
        onHide={handleWhatsAppSenderClose} // Passa a função para fechar e limpar
        phoneNumber={WHATSAPP_CONTACT_NUMBER}
        baseMessage={WHATSAPP_BASE_MESSAGE}
        userMessage={`"${userMessage}"`} // Passa a pergunta atual
      />
    </>
  );
}

export default FAQSectionDS;
