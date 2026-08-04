import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup, Modal, Spinner } from 'react-bootstrap';

import { sendContactEmail } from '@/components/devsolar/utility/email/SendEmail';
import styles from './ModalCapturaLead.module.css';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => (
    <div className={styles.recaptchaLoader}>
      <Spinner animation="border" size="sm" />
    </div>
  ),
});

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  '6LeshiwrAAAAAPVbR8FTS_4l-80ea1G_UyBhZuFk';
const STATICFORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_STATICFORMS_KEY || 'sf_b14798mng2klecllc3dljkgb';

export default function ModalCapturaLead({ show, handleClose, valorConta, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    previsaoInstalacao: '30-60_dias', // valor padrão estratégico
  });

  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [shouldLoadRecaptcha, setShouldLoadRecaptcha] = useState(false);
  const recaptchaRef = useRef(null);
  const phoneInputRef = useRef(null);
  const phoneDigitsRef = useRef('');

  useEffect(() => {
    if (show) {
      setShouldLoadRecaptcha(true);
    }
  }, [show]);

  const formatPhoneValue = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);

    if (!digits) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e) => {
    const input = e.target;
    const nextValue = input.value;
    const digits = nextValue.replace(/\D/g, '').slice(0, 11);
    const previousDigits = phoneDigitsRef.current;

    if (digits.length > previousDigits.length) {
      const inserted = digits.slice(previousDigits.length);
      const nextDigits = previousDigits + inserted;
      const formatted = formatPhoneValue(nextDigits);
      phoneDigitsRef.current = nextDigits;
      setFormData((prev) => ({ ...prev, whatsapp: formatted }));
      return;
    }

    phoneDigitsRef.current = digits;
    setFormData((prev) => ({ ...prev, whatsapp: formatPhoneValue(digits) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setSubmitStatus('error');
      return;
    }

    if (!shouldLoadRecaptcha) {
      setShouldLoadRecaptcha(true);
      setSubmitStatus('error');
      return;
    }

    const recaptchaToken = recaptchaRef.current?.getValue();

    if (!recaptchaToken) {
      setSubmitStatus('error');
      recaptchaRef.current?.reset();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const previsaoLabels = {
      imediato: 'O quanto antes (Imediato)',
      '30-60_dias': 'Nos próximos 30 a 60 dias',
      este_ano: 'Ainda este ano',
      pesquisando: 'Apenas pesquisando / Comparando custos',
    };

    const previsaoTexto = previsaoLabels[formData.previsaoInstalacao] || formData.previsaoInstalacao;
    const mensagem = [
      `Valor da conta mensal: R$ ${valorConta}`,
      `Previsão para instalar: ${previsaoTexto}`,
      `Nome: ${formData.nome}`,
      `WhatsApp: ${formData.whatsapp}`,
    ].join('\n');

    const leadData = {
      ...formData,
      valorContaMensal: valorConta,
      previsaoTexto: previsaoTexto,
      dataCaptura: new Date().toISOString(),
      mensagem,
    };

    try {
      const result = await sendContactEmail({
        formData: {
          firstName: formData.nome,
          phone: formData.whatsapp,
          message: mensagem,
          previsaoInstalacao: previsaoTexto,
          valorContaMensal: `R$ ${valorConta}`,
        },
        accessKey: STATICFORMS_ACCESS_KEY,
        recaptchaToken,
        endpoint: 'https://api.staticforms.xyz/submit',
        subject: `Lead DEV Solar - ${formData.nome}`,
        replyTo: formData.whatsapp,
      });

      if (result.success) {
        setSubmitStatus('success');
        recaptchaRef.current?.reset();
        if (onSuccess) {
          onSuccess(leadData);
        }
      } else {
        setSubmitStatus('error');
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Erro ao enviar o lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      size="sm"
      dialogClassName={styles.modalDialog}
      contentClassName={styles.modalContent}
      className="modal-lead-solar"
    >
      {shouldLoadRecaptcha && (
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="lazyOnload"
          async
          defer
        />
      )}

      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          ⚡ Estamos Quase Lá!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        <div className={styles.infoCard}>
          <p className={styles.infoTitle}>💡 O que você verá no relatório</p>
          <div className={styles.infoText}>
            <div className={styles.infoBullet}>✅ Projeção de economia em 25 anos e tempo estimado de retorno (payback).</div>
            <div className={styles.infoBullet}>✅ Potência ideal do sistema calculada para sua conta de R$ {valorConta}.</div>
            <div className={styles.infoBullet}>✅ Análise comparativa de cenários para uma decisão financeira segura.</div>
          </div>
        </div>
        <br />
        <div className={styles.formShell}>
          <div className={styles.formShellHeader}>Dados para o relatório</div>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.form}>
            <Form.Group className={styles.formGroup} controlId="leadNome">
              <Form.Label className={styles.formLabel}>Seu Nome Completo *</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                placeholder="Digite seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className={styles.formControl}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe seu nome.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={styles.formGroup} controlId="leadWhatsapp">
              <Form.Label className={styles.formLabel}>WhatsApp (para envio do gráfico e PDF) *</Form.Label>
              <InputGroup className={styles.inputGroup} hasValidation>
                <InputGroup.Text className={styles.inputGroupText}>📲</InputGroup.Text>
                <Form.Control
                  type="tel"
                  name="whatsapp"
                  placeholder="(21) 99999-9999"
                  value={formData.whatsapp}
                  onChange={handlePhoneChange}
                  required
                  minLength={14}
                  className={styles.formControl}
                />
                <Form.Control.Feedback type="invalid">
                  Informe um número de WhatsApp válido.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className={`${styles.formGroup} mb-4`} controlId="leadPrevisao">
              <Form.Label className={styles.formLabel}>Qual sua previsão para instalar? *</Form.Label>
              <Form.Select
                name="previsaoInstalacao"
                value={formData.previsaoInstalacao}
                onChange={handleChange}
                required
                className={styles.formSelect}
              >
                <option value="imediato">🚀 O quanto antes (Imediato)</option>
                <option value="30-60_dias">📅 Nos próximos 30 a 60 dias</option>
                <option value="este_ano">📆 Ainda este ano</option>
                <option value="pesquisando">🔍 Apenas pesquisando / Comparando custos</option>
              </Form.Select>
            </Form.Group>
            <div className={styles.recaptchaWrapper}>
              {shouldLoadRecaptcha ? (
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />
              ) : (
                <div className={styles.recaptchaLoader}>
                  <Spinner animation="border" size="sm" />
                </div>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className={styles.submitButton}
              disabled={isSubmitting}
              style={{ textTransform: 'capitalize' }}
            >
              Ver Relatório{/* {isSubmitting ? 'Enviando...' : '📊 Ver Relatório'} */}
            </Button>

            {submitStatus === 'success' && (
              <div className={`${styles.statusMessage} ${styles.statusSuccess}`}>
                E-mail enviado com sucesso. Seu relatório será preparado em breve.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={`${styles.statusMessage} ${styles.statusError}`}>
                Não foi possível processar o relatório. Verifique os dados e tente novamente.
              </div>
            )}
          </Form>

          <div className={styles.securityNote}>
            <small>🔒 Seus dados estão seguros. Não enviamos spam.</small>
          </div>
        </div>
      </Modal.Body>
    </Modal >
  );
}