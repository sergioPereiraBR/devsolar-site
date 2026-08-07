'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { trackEvent, trackWhatsAppClick } from '@/lib/analytics';
import { RECAPTCHA_ENABLED, STATICFORMS_ACCESS_KEY } from '@/lib/email-config';

import { sendContactEmail } from '@/components/devsolar/utility/email/SendEmail';
import { FaIcon } from '@/components/devsolar/utility/fa-icon';
import { formatPhoneValue } from '@/components/devsolar/utility/phone/formatPhoneValue';
import RecaptchaField from '@/components/devsolar/utility/recapcha/RecaptchaField';

import { contactInfoData, socialLinksData } from './contact_data_ds';
import styles from './contact_section_ds.module.css';

// Subcomponente para item de contato
const ContactInfoItem = ({
  iconClass,
  title,
  text,
  link,
  onClick,
  tabEntry,
  isHydrated,
}) => (
  // ... (código inalterado) ...
  <div className={`${styles.contactItem} d-flex align-items-start mb-3`}>
    <div className={`${styles.iconWrapper} me-3 flex-shrink-0`}>
      <FaIcon iconClass={iconClass} className={styles.icon} />
    </div>
    <div className="flex-grow-1">
      <p className={`${styles.contactTitle} mb-0`}>{title}</p>
      {link && isHydrated ? (
        <a
          href={link}
          className={styles.contactLink}
          onClick={onClick}
          data-tab-entry={tabEntry ? 'true' : undefined}
        >
          <h4 className={`${styles.contactText} mb-0`}>{text}</h4>
        </a>
      ) : (
        <h4 className={`${styles.contactText} mb-0`}>{text}</h4>
      )}
    </div>
  </div>
);

function ContactSectionDS() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'error_recaptcha'
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null); // Ref para o componente reCAPTCHA
  const sectionRef = useRef(null);
  const phoneDigitsRef = useRef('');
  const [shouldLoadRecaptcha, setShouldLoadRecaptcha] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const recaptchaEnabled = RECAPTCHA_ENABLED;

  // Garante hidratação correta na produção
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!recaptchaEnabled) {
      setRecaptchaToken(null);
      recaptchaRef.current?.reset?.();
    }
  }, [recaptchaEnabled]);

  const ensureRecaptchaLoaded = () => {
    if (!recaptchaEnabled || shouldLoadRecaptcha) {
      return;
    }

    setShouldLoadRecaptcha(true);
  };

  useEffect(() => {
    if (
      shouldLoadRecaptcha ||
      !sectionRef.current ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          setShouldLoadRecaptcha(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [shouldLoadRecaptcha]);

  const handlePhoneChange = (e) => {
    const nextValue = e.target.value;
    phoneDigitsRef.current = nextValue.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, phone: formatPhoneValue(nextValue) }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRequiredInvalid = (e) => {
    // console.log(
    //   `Campo inválido: ${e.target.id}, valor atual: "${e.target.value}"`,
    // );
    // console.log('Validade do campo:', e.target.validity);
    // console.log('Mensagem de validação atual:', e.target.validationMessage);
    // console.log('Tipo de input:', e.target.type);
    // console.log('Valor do campo:', e.target.value);

    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Preencha este campo.');
      return;
    }

    if (e.target.id === 'email' && e.target.validity.typeMismatch) {
      e.target.setCustomValidity('Informe um e-mail válido.');
      return;
    }

    e.target.setCustomValidity('');
  };

  const clearValidationMessage = (e) => {
    e.target.setCustomValidity('');
  };

  const handleSubmitReact = async (e) => {
    e.preventDefault(); // Previne envio nativo
    trackEvent('contact_form_submit_attempt', {
      location: 'contact_section',
    });
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (recaptchaEnabled && !shouldLoadRecaptcha) {
      trackEvent('contact_form_validation_error', {
        location: 'contact_section',
        reason: 'recaptcha_not_loaded',
      });
      setShouldLoadRecaptcha(true);
      setSubmitStatus('error_recaptcha');
      setIsSubmitting(false);
      return;
    }

    //console.log("event: ", e); // Debug

    // 1. Obter token do reCAPTCHA
    const currentRecaptchaToken = recaptchaEnabled
      ? recaptchaToken || recaptchaRef.current?.getValue?.()
      : undefined;

    //console.log("recaptchaToken: ", currentRecaptchaToken); // Debug

    // 2. Validar token
    if (recaptchaEnabled && !currentRecaptchaToken) {
      trackEvent('contact_form_validation_error', {
        location: 'contact_section',
        reason: 'recaptcha_missing',
      });
      setSubmitStatus('error_recaptcha');
      setIsSubmitting(false);
      recaptchaRef.current?.reset(); // Reseta para o usuário tentar de novo
      //console.error("reCAPTCHA não preenchido.");
      return;
    }

    try {
      const result = await sendContactEmail({
        formData: {
          firstName: formData.firstName,
          lastName: formData.lastName || '',
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        },
        accessKey: STATICFORMS_ACCESS_KEY,
        recaptchaToken: currentRecaptchaToken,
        endpoint: '/api/contact',
        subject: `Contato Site DEV Solar: ${formData.firstName} ${formData.lastName}`,
        replyTo: formData.email,
      });

      if (result.success) {
        setSubmitStatus('success');
        trackEvent('contact_form_submit_success', {
          location: 'contact_section',
        });
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          message: '',
        });
        phoneDigitsRef.current = '';
        setRecaptchaToken(null);
        recaptchaRef.current?.reset?.();
        window.setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        trackEvent('contact_form_submit_error', {
          location: 'contact_section',
          reason: result.error || 'service_error',
        });
        setSubmitStatus('error');
        setRecaptchaToken(null);
        recaptchaRef.current?.reset?.();
      }
    } catch (error) {
      trackEvent('contact_form_submit_error', {
        location: 'contact_section',
        reason: error?.message || 'network_error',
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contato"
      className={`${styles.contactSection}`}
      aria-labelledby="contact-heading"
      onMouseEnter={ensureRecaptchaLoaded}
      onTouchStart={ensureRecaptchaLoaded}
    >
      <div className="container">
        <div className="row">
          {/* Coluna de Informações (inalterada) */}
          <div className="col-lg-6">
            {/* ... (código da coluna de informações igual ao anterior) ... */}
            <h2
              id="contact-heading"
              className={`${styles.sectionTitle} fw-bold mb-4`}
            >
              Entre em Contato
            </h2>
            <h3 className={`${styles.sectionSubtitle} mb-4`}>
              Estamos à disposição em todas as etapas do seu projeto. Seja para
              tirar dúvidas antes de investir, acompanhar sua instalação ou
              oferecer suporte no pós-venda, nossa equipe está pronta para
              atender você, seu condomínio ou sua empresa.
            </h3>
            <div className="mb-4" suppressHydrationWarning>
              {contactInfoData.map((item) => (
                <ContactInfoItem
                  key={item.id}
                  {...item}
                  tabEntry={item.id === 'phone'}
                  isHydrated={isHydrated}
                  onClick={() => {
                    if (!item.link) return;

                    if (item.link.startsWith('tel:')) {
                      trackEvent('contact_click', {
                        contact_channel: 'phone',
                        location: 'contact_section',
                      });
                      return;
                    }

                    if (item.link.startsWith('mailto:')) {
                      trackEvent('contact_click', {
                        contact_channel: 'email',
                        location: 'contact_section',
                      });
                    }
                  }}
                />
              ))}
            </div>
            <div className={`${styles.socialLinksContainer} d-flex`}>
              {socialLinksData.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={styles.socialIconLink}
                  aria-label={`Visite nosso ${link.name}: ${link.url}`}
                  onClick={() => {
                    if (link.url.includes('wa.me')) {
                      trackWhatsAppClick(
                        'contact_section',
                        'contact_social_whatsapp',
                      );
                      return;
                    }

                    trackEvent('social_click', {
                      location: 'contact_section',
                      network: link.name,
                      destination: link.url,
                    });
                  }}
                >
                  <FaIcon iconClass={link.iconClass} />
                  <span className="sr-only">{link.accessibility}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna do Formulário */}
          <div className="col-lg-6 mt-lg-0 mt-4">
            <div className={`${styles.formCard} card shadow-sm`}>
              <div className="card-body p-4">
                <h3 className={`${styles.formTitle} fw-bold mb-4`}>
                  Envie sua Mensagem
                </h3>
                {/* ***** FORMULÁRIO AGORA USA onSubmit ***** */}
                <form
                  id="contactForm"
                  onSubmit={handleSubmitReact}
                  onFocusCapture={ensureRecaptchaLoaded}
                >
                  {/* Campos do Formulário */}
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="form-control var(--branco)"
                      id="firstName"
                      name="firstName"
                      placeholder="Seu nome"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      onInvalid={handleRequiredInvalid}
                      onInput={clearValidationMessage}
                      autoComplete="given-name"
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      className="form-control var(--branco)"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      onInvalid={handleRequiredInvalid}
                      onInput={clearValidationMessage}
                      autoComplete="family-name"
                    />
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      className="form-control var(--branco)"
                      id="phone"
                      name="phone"
                      required
                      placeholder="(21) 99999-9999"
                      minLength={14}
                      maxLength={17}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onInvalid={handleRequiredInvalid}
                      onInput={clearValidationMessage}
                      autoComplete="tel-national"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      className="form-control var(--branco)"
                      id="email"
                      name="email"
                      // required
                      value={formData.email}
                      onChange={handleChange}
                      onInvalid={handleRequiredInvalid}
                      onInput={clearValidationMessage}
                      autoComplete="email"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Mensagem
                    </label>
                    <textarea
                      className="form-control var(--branco)"
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* ***** COMPONENTE reCAPTCHA ***** */}
                  {recaptchaEnabled && (
                    <>
                      <div htmlFor="recaptcha" className="form-label d-block">
                        Verificação*
                      </div>
                      <fieldset
                        id="recaptcha"
                        className={`${styles.recaptchaContainer} m-0 mb-3 border-0 p-0`}
                      >
                        <div className="mb-3">
                          {shouldLoadRecaptcha ? (
                            <RecaptchaField
                              ref={recaptchaRef}
                              shouldLoad
                              hl="pt-BR"
                              onChange={setRecaptchaToken}
                              onExpired={() => setRecaptchaToken(null)}
                              onErrored={() => setRecaptchaToken(null)}
                            />
                          ) : (
                            <p className={`${styles.recaptchaHint} small mb-0`}>
                              A verificação será carregada quando você começar a
                              preencher o formulário.
                            </p>
                          )}
                          {submitStatus === 'error_recaptcha' && (
                            <div className="text-danger small mt-1">
                              Por favor, complete a verificação.
                            </div>
                          )}
                        </div>
                      </fieldset>
                    </>
                  )}
                  {/* Mensagens de Feedback */}
                  {submitStatus === 'success' && (
                    <div className="alert alert-success">
                      Obrigado! Sua mensagem foi enviada com sucesso! Entraremos
                      em contato em breve. Respondemos em até 2 horas dentro do
                      horário comercial. Caso não receba resposta, verifique sua
                      caixa de spam ou entre em contato por outro canal.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="alert alert-danger">
                      Ocorreu um erro ao enviar a mensagem. Por favor, tente
                      novamente ou entre em contato por outro canal.
                    </div>
                  )}

                  {/* Botão Submit */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className={`${styles.submitButton} btn btn-primary-custom`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Enviando...
                        </>
                      ) : (
                        'Enviar Mensagem'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSectionDS;
