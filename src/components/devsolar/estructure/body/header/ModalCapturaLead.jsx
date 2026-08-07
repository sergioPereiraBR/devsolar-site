import { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup, Modal, Spinner } from 'react-bootstrap';

import { sendContactEmail } from '@/components/devsolar/utility/email/SendEmail';
import { formatPhoneValue } from '@/components/devsolar/utility/phone/formatPhoneValue';
import RecaptchaField from '@/components/devsolar/utility/recapcha/RecaptchaField';
import {
  RECAPTCHA_ENABLED,
  STATICFORMS_ACCESS_KEY
} from '@/lib/email-config';
import styles from './ModalCapturaLead.module.css';

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
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const phoneInputRef = useRef(null);
  const phoneDigitsRef = useRef('');
  const recaptchaEnabled = RECAPTCHA_ENABLED;

  useEffect(() => {
    if (show && recaptchaEnabled) {
      setShouldLoadRecaptcha(true);
    }
  }, [show, recaptchaEnabled]);

  const handlePhoneChange = (e) => {
    const nextValue = e.target.value;
    phoneDigitsRef.current = nextValue.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, whatsapp: formatPhoneValue(nextValue) }));
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

    if (recaptchaEnabled && !shouldLoadRecaptcha) {
      setShouldLoadRecaptcha(true);
      setSubmitStatus('error');
      return;
    }

    const currentRecaptchaToken = recaptchaEnabled
      ? recaptchaToken || recaptchaRef.current?.getValue?.()
      : null;

    if (recaptchaEnabled && !currentRecaptchaToken) {
      setSubmitStatus('error');
      recaptchaRef.current?.reset?.();
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
        recaptchaToken: currentRecaptchaToken,
        endpoint: '/api/contact',
        subject: `Lead DEV Solar - ${formData.nome}`,
        replyTo: formData.whatsapp,
      });

      if (result.success) {
        setSubmitStatus('success');
        setRecaptchaToken(null);
        recaptchaRef.current?.reset?.();
        if (onSuccess) {
          onSuccess(leadData);
        }
      } else {
        setSubmitStatus('error');
        setRecaptchaToken(null);
        recaptchaRef.current?.reset?.();
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
                  maxLength={17}
                  className={styles.formControl}
                  autoComplete="tel-national"
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
            {recaptchaEnabled && (
              <div className={styles.recaptchaWrapper}>
                <RecaptchaField
                  ref={recaptchaRef}
                  shouldLoad={shouldLoadRecaptcha}
                  onChange={setRecaptchaToken}
                  onExpired={() => setRecaptchaToken(null)}
                  onErrored={() => setRecaptchaToken(null)}
                  loadingFallback={
                    <div className={styles.recaptchaLoader}>
                      <Spinner animation="border" size="sm" />
                    </div>
                  }
                />
              </div>
            )}

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