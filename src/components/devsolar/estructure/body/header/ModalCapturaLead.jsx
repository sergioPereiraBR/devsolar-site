import { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import styles from './ModalCapturaLead.module.css';

export default function ModalCapturaLead({ show, handleClose, valorConta, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    previsaoInstalacao: '30-60_dias', // valor padrão estratégico
  });

  const [validated, setValidated] = useState(false);

  // Formatação em tempo real para o WhatsApp (XX) 9XXXX-XXXX
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setFormData({ ...formData, whatsapp: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Estrutura do Lead pronto para envio à API / CRM
    const leadData = {
      ...formData,
      valorContaMensal: valorConta,
      dataCaptura: new Date().toISOString(),
    };

    console.log('Lead Capturado:', leadData);

    // Função de callback para abrir a tela/modal do Relatório e PDF
    if (onSuccess) {
      onSuccess(leadData);
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
        <p className={styles.modalIntro}>
          Preencha os dados abaixo para desbloquear seu <strong>Relatório Personalizado de Rentabilidade</strong> para uma conta de <strong>R$ {valorConta}</strong>.
        </p>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className={styles.formGroup} controlId="leadNome">
            <Form.Label className={styles.formLabel}>Seu Nome Completo *</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              placeholder="Ex: Roberto Silva"
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

          <Button
            type="submit"
            size="lg"
            className={styles.submitButton}
          >
            📊 Ver Relatório
          </Button>

          <div className={styles.infoCard}>
            <p className={styles.infoTitle}>💡 O que você verá no relatório</p>
            <p className={styles.infoText}>
              Você vai conhecer sua projeção de economia, o tempo estimado de retorno do seu investimento,
              a potência ideal do seu sistema e os principais parâmetros que sustentam o cálculo.
              É uma ferramenta objetiva para comparar cenários, entender o impacto financeiro e tomar
              uma decisão mais segura e bem embasada.
            </p>
          </div>

          <div className={styles.securityNote}>
            <small>🔒 Seus dados estão seguros. Não enviamos spam.</small>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}