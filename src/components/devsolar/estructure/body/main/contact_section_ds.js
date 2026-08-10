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
      form_type: 'contact',
    });

    const isFormValid = e.currentTarget.checkValidity();
    if (!isFormValid) {
      const invalidField =
        e.currentTarget.querySelector(':invalid')?.id || 'unknown_field';
      trackEvent('contact_form_validation_error', {
        location: 'contact_section',
        section: 'main',
        form_type: 'contact',
        status: 'error',
        reason: 'invalid_required_field',
        failed_field: invalidField,
      });
      e.currentTarget.reportValidity();
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);

    //console.log("event: ", e); // Debug

    // 1. Obter token do reCAPTCHA, se disponível
    const currentRecaptchaToken = recaptchaEnabled
      ? recaptchaToken || recaptchaRef.current?.getValue?.()
      : undefined;

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
        subject: `Contato Site DEV Solar: ${formData.firstName} ${formData.lastName}`,
        replyTo: formData.email,
      });

      if (result.success) {
        setSubmitStatus('success');
        trackEvent('contact_form_submit_success', {
          location: 'contact_section',
          section: 'main',
          form_type: 'contact',
          status: 'success',
          label: 'contact_form_submit',
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
            <div className="mb-4 mt-5 pt-3" suppressHydrationWarning>
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
                        label: 'contact_phone',
                        form_type: 'contact',
                      });
                      return;
                    }

                    if (item.link.startsWith('mailto:')) {
                      trackEvent('contact_click', {
                        contact_channel: 'email',
                        location: 'contact_section',
                        label: 'contact_email',
                        form_type: 'contact',
                      });
                    }
                  }}
                />
              ))}
            </div>

            <div className={`${styles.socialLinksContainer} d-flex mt-3 pt-2`}>
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
            <div className="mt-4 pt-2">
              <a
                href="https://www.google.com/search?q=dev+solar#lrd=0x9963a865267047:0xe012023a2b57908d,1"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.googleRatingBadge}
                aria-label="Ver avaliações da DEV Solar no Google"
              >
                <div className={styles.googleLogo} aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.09z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.09c.95-2.85 3.6-4.96 6.72-4.96z"
                    />
                  </svg>
                </div>
                <div className={styles.ratingInfo}>
                  <span className={styles.stars}>★★★★★</span>
                  <span className={styles.score}>
                    <strong>5.0</strong> Excelente no Google
                  </span>
                </div>
              </a>
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
                      placeholder=""
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
                      placeholder=""
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
                      placeholder=""
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
