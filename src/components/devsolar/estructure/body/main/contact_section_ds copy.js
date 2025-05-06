'use client';

import Link from "next/link";
import { useState } from 'react';
import { contactInfoData, socialLinksData } from './contact_data_ds'; // Importar dados
import styles from './contact_section_ds.module.css'; // Importar CSS Module

// Subcomponente para item de contato (opcional, mas limpa o JSX)
const ContactInfoItem = ({ iconClass, title, text, link }) => (
    <div className={`${styles.contactItem} d-flex align-items-start mb-3`}>
        <div className={`${styles.iconWrapper} flex-shrink-0 me-3`}>
            <i className={`${iconClass} ${styles.icon}`}></i>
        </div>
        <div className="flex-grow-1">
            <h5 className={`${styles.contactTitle} mb-0`}>{title}</h5>
            {link ? (
                <a href={link} className={styles.contactLink}>
                    <p className={`${styles.contactText} mb-0`}>{text}</p>
                </a>
            ) : (
                <p className={`${styles.contactText} mb-0`}>{text}</p>
            )}
        </div>
    </div>
);

function ContactSectionDS() {
    // Estado consolidado para o formulário
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "" // Nome corrigido de 'mensage' para 'message'
    });
    // Estados para feedback (se implementar envio via React)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'

    // Handler genérico para inputs do formulário
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    // Handler para envio via React (exemplo, requer implementação do fetch e reCAPTCHA)
    const handleSubmitReact = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        // TODO: Obter token do reCAPTCHA (usando ref de react-google-recaptcha)
        const recaptchaToken = recaptchaRef.current.getValue();
        if (!recaptchaToken) {
            setSubmitStatus('error_recaptcha');
            setIsSubmitting(false);
            return;
        }

        const payload = {
            ...formData,
            accessKey: "b70b324e-e0be-45cc-9e6e-77385875d25e",
            subject: "Solicitação de Orçamento - lp02 v0.1.1",
            replyTo: formData.email, // Usa o email do formulário 
            redirectTo: "https://devsolar.com.br/#contato",
        };

        try {
            const response = await fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                // Limpar formulário
                setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" });
                // Resetar reCAPTCHA se estiver usando a biblioteca
                recaptchaRef.current.reset();
            } else {
                console.error("StaticForms Error:", result.message);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        // Removido o fragmento
        <section id="contato" className={`${styles.contactSection} section`} aria-labelledby="contact-heading">
            <div className="container">
                <div className="row">
                    {/* Coluna de Informações */}
                    <div className="col-lg-6">
                        <h2 id="contact-heading" className={`${styles.sectionTitle} fw-bold mb-4`}>Entre em Contato</h2>
                        <p className={`${styles.sectionSubtitle} mb-4`}>
                            Estamos prontos para esclarecer todas as suas dúvidas e ajudar você a economizar com energia solar.
                        </p>
                        {/* Renderiza informações de contato a partir dos dados */}
                        <div className="mb-4">
                            {contactInfoData.map(item => (
                                <ContactInfoItem
                                    key={item.id}
                                    iconClass={item.iconClass}
                                    title={item.title}
                                    text={item.text}
                                    link={item.link}
                                />
                            ))}
                        </div>
                        {/* Renderiza links sociais a partir dos dados */}
                        <div className={`${styles.socialLinksContainer} d-flex`}>
                            {socialLinksData.map(link => (
                                <Link
                                    key={link.id}
                                    href={link.url}
                                    target={link.url.startsWith('http') ? "_blank" : "_self"} // Abre links externos em nova aba
                                    rel={link.url.startsWith('http') ? "noopener noreferrer" : ""}
                                    className={styles.socialIconLink}
                                    aria-label={`Visite nosso ${link.name}`} // Melhoria de acessibilidade
                                >
                                    <i className={link.iconClass}></i>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Coluna do Formulário */}
                    <div className="col-lg-6 mt-4 mt-lg-0">
                        <div className={`${styles.formCard} card shadow-sm`}>
                            <div className="card-body p-4">
                                <h4 className={`${styles.formTitle} fw-bold mb-4`}>Envie sua Mensagem</h4>
                                {/* Formulário ainda usando action nativo (considerar mudar para onSubmit={handleSubmitReact}) */}
                                <form id="contactForm">
                                    {/* Campos do Formulário (usando estado consolidado) */}
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">Nome</label>
                                        <input type="text" className="form-control bg-light" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} autoComplete="given-name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Sobrenome</label>
                                        <input type="text" className="form-control bg-light" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} autoComplete="family-name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">E-mail</label>
                                        <input type="email" className="form-control bg-light" id="email" name="email" required value={formData.email} onChange={handleChange} autoComplete="email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Telefone</label>
                                        {/* Considerar usar uma biblioteca de máscara (ex: react-input-mask) */}
                                        <input type="tel" className="form-control bg-light" id="phone" name="phone" required value={formData.phone} onChange={handleChange} autoComplete="tel" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Mensagem</label>
                                        <textarea className="form-control bg-light" id="message" name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
                                    </div>

                                    {/* reCAPTCHA (mantido para envio nativo) */}
                                    {/* Se mudar para envio React, substituir por componente react-google-recaptcha */}
                                    <div className="mb-3">
                                        <label className="form-label d-block">Verificação</label>
                                        <div className="g-recaptcha" data-sitekey="6LfsCgQrAAAAAL4_d-85i5Fd2zd4b326-R3pyf4Q"></div>
                                        {/* É importante carregar o script do reCAPTCHA na página, talvez no _app.js ou _document.js */}
                                        {/* <script src="https://www.google.com/recaptcha/api.js" async defer></script> */}
                                        <p className="small text-secondary mt-1">Preencha o reCAPTCHA para enviar.</p>
                                    </div>

                                    {/* Mensagens de Feedback (para envio React) */}

                                    {submitStatus === 'success' && <div className="alert alert-success">Mensagem enviada com sucesso!</div>}
                                    {submitStatus === 'error' && <div className="alert alert-danger">Erro ao enviar mensagem. Tente novamente.</div>}
                                    {submitStatus === 'error_recaptcha' && <div className="alert alert-warning">Por favor, complete o reCAPTCHA.</div>}


                                    <div className="d-grid">
                                        <button type="submit" className={`${styles.submitButton} btn btn-primary-custom`} /* disabled={isSubmitting} */>
                                            {isSubmitting ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                            Enviar Mensagem
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