import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

import { sendContactEmail } from '@/components/devsolar/utility/email/SendEmail';
import { enqueueLead, flushPendingLeads, startLeadQueueSync } from '@/components/devsolar/utility/lead/leadQueue';
import { formatPhoneValue } from '@/components/devsolar/utility/phone/formatPhoneValue';
import { STATICFORMS_ACCESS_KEY } from '@/lib/email-config';
import styles from './ModalCapturaLead.module.css';

export default function ModalCapturaLead({ show, handleClose, valorConta, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    previsaoInstalacao: 'imediato', // valor padrão estratégico
  });

  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (!show) return;

    const cleanup = startLeadQueueSync({
      sendFn: async (queuedLead) => {
        const result = await sendContactEmail({
          formData: {
            firstName: queuedLead.nome,
            phone: queuedLead.whatsapp,
            message: queuedLead.mensagem,
            previsaoInstalacao: queuedLead.previsaoTexto,
            valorContaMensal: `R$ ${queuedLead.valorContaMensal}`,
          },
          accessKey: STATICFORMS_ACCESS_KEY,
          subject: `Lead DEV Solar - ${queuedLead.nome}`,
          replyTo: queuedLead.whatsapp,
        });

        return result;
      },
    });

    return cleanup;
  }, [show]);

  const handlePhoneChange = (e) => {
    const nextValue = e.target.value;
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

    const sendLeadWithFallback = async () => {
      const shouldAttemptImmediateSend = typeof navigator === 'undefined' ? true : navigator.onLine;

      if (!shouldAttemptImmediateSend) {
        enqueueLead(leadData);
        return { queued: true, success: false };
      }

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
          subject: `Lead DEV Solar - ${formData.nome}`,
          replyTo: formData.whatsapp,
        });

        if (result && result.success) {
          return result;
        }

        enqueueLead(leadData);
        return { queued: true, success: false, result };
      } catch (error) {
        enqueueLead(leadData);
        console.warn('Lead salvo localmente para sincronização posterior:', error);
        return { queued: true, success: false, error };
      }
    };

    try {
      const result = await sendLeadWithFallback();

      if (result && result.queued) {
        console.info('Lead em fila local. Será sincronizado quando a rede voltar.');
        setSubmitStatus('queued');
      } else if (typeof navigator !== 'undefined' && navigator.onLine) {
        await flushPendingLeads({
          sendFn: async (queuedLead) => {
            return sendContactEmail({
              formData: {
                firstName: queuedLead.nome,
                phone: queuedLead.whatsapp,
                message: queuedLead.mensagem,
                previsaoInstalacao: queuedLead.previsaoTexto,
                valorContaMensal: `R$ ${queuedLead.valorContaMensal}`,
              },
              accessKey: STATICFORMS_ACCESS_KEY,
              subject: `Lead DEV Solar - ${queuedLead.nome}`,
              replyTo: queuedLead.whatsapp,
            });
          },
        });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('queued');
      }

      if (onSuccess) {
        onSuccess(leadData);
      }
    } catch (error) {
      console.warn('Lead não enviado por indisponibilidade de rede; continuando com o relatório local.', error);
      enqueueLead(leadData);
      setSubmitStatus('queued');
      if (onSuccess) {
        onSuccess(leadData);
      }
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
          ⚡Estamos quase lá!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={`${styles.modalBody} mt-4 pt-2`}>
        <div className={styles.formShell}>
          <div className={styles.formShellHeader}>💡 O que você verá no relatório</div>
          <div className={`${styles.infoBullet} mt-2 pt-2`}>✅ Projeção de economia em 25 anos e tempo estimado de retorno (payback).</div>
          <div className={styles.infoBullet}>✅ Potência ideal do sistema calculada para sua conta de R$ {valorConta}.</div>
          <div className={styles.infoBullet}>✅ Análise comparativa de cenários para uma decisão financeira segura.</div>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className={`${styles.form} mt-4 pt-2`}>
            <Form.Group className={styles.formGroup} controlId="leadNome">
              <Form.Label className={styles.formLabel}>Seu Nome *</Form.Label>
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
              <Form.Label className={styles.formLabel}>WhatsApp *</Form.Label>
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

            <Form.Group className={styles.formGroup} controlId="leadPrevisao">
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

            <Button
              type="submit"
              size="lg"
              className={`${styles.submitButton} mt-4 pt-2`}
              disabled={isSubmitting}
              style={{ textTransform: 'capitalize' }}
            >
              Minha economia em 1 clique{' '}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                style={{ color: '#000000', marginLeft: '6px', verticalAlign: 'middle' }}
                fill="currentColor"
              >
                <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>
            </Button>

            {submitStatus === 'success' && (
              <div className={`${styles.statusMessage} ${styles.statusSuccess}`}>
                Seu relatório de investimento será preparado em breve.
              </div>
            )}

            {submitStatus === 'queued' && (
              <div className={`${styles.statusMessage} ${styles.statusSuccess}`}>
                Seu interesse foi salvo e será enviado quando a conexão voltar.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={`${styles.statusMessage} ${styles.statusError}`}>
                Não foi possível processar o relatório. Verifique os dados e tente novamente.
              </div>
            )}
          </Form>

          <div className={`${styles.securityNote} mt-4 pt-2`}>
            <small>🔒 Seus dados estão seguros. Não enviamos spam.</small>
          </div>
        </div>
      </Modal.Body>
    </Modal >
  );
}