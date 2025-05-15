'use client';

import Link from "next/link";
import { useRef, useState } from 'react'; // Adicionado useRef
import ReCAPTCHA from "react-google-recaptcha"; // Importar reCAPTCHA
import { contactInfoData, socialLinksData } from './contact_data_ds';
import styles from './contact_section_ds.module.css';

// Subcomponente para item de contato
const ContactInfoItem = ({ iconClass, title, text, link }) => (
    // ... (código inalterado) ...
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

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeshiwrAAAAAPVbR8FTS_4l-80ea1G_UyBhZuFk";
const STATICFORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_STATICFORMS_KEY || "sf_b14798mng2klecllc3dljkgb";

function ContactSectionDS() {
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", phone: "", email: "", message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', 'error_recaptcha'
    const recaptchaRef = useRef(null); // Ref para o componente reCAPTCHA

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleSubmitReact = async (e) => {
        e.preventDefault(); // Previne envio nativo
        setIsSubmitting(true);
        setSubmitStatus(null);

        console.log("event: ", e); // Debug

        // 1. Obter token do reCAPTCHA
        const recaptchaToken = recaptchaRef.current?.getValue(); // Usa optional chaining

        console.log("recaptchaToken: ", recaptchaToken); // Debug

        // 2. Validar token
        if (!recaptchaToken) {
            setSubmitStatus('error_recaptcha');
            setIsSubmitting(false);
            recaptchaRef.current?.reset(); // Reseta para o usuário tentar de novo
            console.error("reCAPTCHA não preenchido.");
            return;
        }



        // Montar Payload
        const isLocalDevelopment = window.location.hostname === 'localhost' || window.location.hostname.startsWith('192.168.'); // Ou outra forma de detectar dev
        let redirectToEmail = "";
        if (!isLocalDevelopment) {
            redirectToEmail = "https://devsolar.com.br/#contato";
        }

        // 3. Montar Payload para StaticForms (incluindo campos hidden e reCAPTCHA)
        const payload = {
            ...formData,
            // --- Campos específicos devido políticas da API ---
            // name: `${formData.firstName} ${formData.lastName} - ${formData.phone}`,
            // email: `${formData.email}`,
            // message: `${formData.message}`,

            // --- Campos específicos para StaticForms ---
            accessKey: STATICFORMS_ACCESS_KEY,
            subject: `Contato Site DEV Solar: ${formData.firstName} ${formData.lastName}`, // Assunto mais dinâmico
            // replyTo: formData.email, // Email do remetente para responder
            // redirectTo: { redirectToEmail },  // redirectTo: "https://devsolar.com.br/#contato", // *** CRIE UMA PÁGINA DE OBRIGADO ***
            // --- Fim dos campos StaticForms ---
            'g-recaptcha-response': recaptchaToken, // Nome esperado pelo backend do reCAPTCHA
            // Adicione quaisquer outros campos que seu endpoint StaticForms espera
            // O campo 'honeypot' NÃO deve ser enviado no JSON
        };

        console.log("Enviando payload:", payload); // Debug 

        // 4. Enviar via Fetch
        try {
            const response = await fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'accept-charset': 'UTF-8',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log("response status:", response.status); // Debug status
            console.log("response ok:", response.ok); // Debug ok flag

            // Tenta ler o JSON mesmo se não for ok, para pegar a msg de erro
            const result = await response.json();
            console.log("result:", result);

            // --- CORREÇÃO AQUI: Verificar response.ok ou result específico ---
            if (response.ok && result.success !== false) { // Verifica se a requisição foi OK (status 2xx) E se o JSON não indica falha explicitamente
                // OU, se StaticForms SEMPRE retorna 'message' no sucesso:
                // if (response.ok && result.message === 'Form submitted successfully') {
                console.log("StaticForms Success:", result);
                setSubmitStatus('success'); // <<< Define SUCESSO
                // Limpar formulário após sucesso
                setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" });
                recaptchaRef.current?.reset(); // Reseta o reCAPTCHA
                setTimeout(() => setSubmitStatus(null), 6000); // Limpa msg após 4s

                // Opcional: Redirecionar (se removeu o redirectTo do payload)
                // setTimeout(() => { window.location.href = "/obrigado"; }, 1500);

            } else {
                // Erro HTTP ou erro reportado pelo StaticForms
                console.error("StaticForms Error Response:", result.error || result.message || 'Erro desconhecido');
                setSubmitStatus('error'); // <<< Define ERRO
                recaptchaRef.current?.reset();
            }
        } catch (error) {
            // Erro na requisição fetch (rede, CORS local, etc.)
            console.error("Submit Fetch Error:", error);
            setSubmitStatus('error'); // <<< Define ERRO
            // Não precisa resetar o recaptcha aqui necessariamente, pois a submissão falhou antes da validação dele
            // recaptchaRef.current?.reset();
        } finally {
            setIsSubmitting(false); // Finaliza o estado de envio
        }
    };

    return (
        <section id="contato" className={`${styles.contactSection}`} aria-labelledby="contact-heading">
            <div className="container">
                <div className="row">
                    {/* Coluna de Informações (inalterada) */}
                    <div className="col-lg-6">
                        {/* ... (código da coluna de informações igual ao anterior) ... */}
                        <h2 id="contact-heading" className={`${styles.sectionTitle} fw-bold mb-4`}>Entre em Contato</h2>
                        <p className={`${styles.sectionSubtitle} mb-4`}>
                            Estamos prontos para esclarecer todas as suas dúvidas e ajudar você a economizar com energia solar.
                        </p>
                        <div className="mb-4">
                            {contactInfoData.map(item => (
                                <ContactInfoItem key={item.id} {...item} />
                            ))}
                        </div>
                        <div className={`${styles.socialLinksContainer} d-flex`}>
                            {socialLinksData.map(link => (
                                <Link key={link.id} href={link.url} target={link.url.startsWith('http') ? "_blank" : "_self"} rel={link.url.startsWith('http') ? "noopener noreferrer" : ""} className={styles.socialIconLink} aria-label={`Visite nosso ${link.name}`}>
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
                                {/* ***** FORMULÁRIO AGORA USA onSubmit ***** */}
                                <form id="contactForm" onSubmit={handleSubmitReact}>
                                    {/* Campos do Formulário */}
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">Nome</label>
                                        <input type="text" className="form-control var(--branco)" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} autoComplete="given-name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Sobrenome</label>
                                        <input type="text" className="form-control var(--branco)" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} autoComplete="family-name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">E-mail</label>
                                        <input type="email" className="form-control var(--branco)" id="email" name="email" required value={formData.email} onChange={handleChange} autoComplete="email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Telefone</label>
                                        <input type="tel" className="form-control var(--branco)" id="phone" name="phone" required value={formData.phone} onChange={handleChange} autoComplete="tel" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Mensagem</label>
                                        <textarea className="form-control var(--branco)" id="message" name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
                                    </div>

                                    {/* ***** COMPONENTE reCAPTCHA ***** */}
                                    <div className="mb-3">
                                        <label className="form-label d-block">Verificação*</label>
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={RECAPTCHA_SITE_KEY}
                                            onChange={(token) => console.log("Captcha token:", token)} // Opcional: para debug ou lógica extra
                                            hl="pt-BR" // Define o idioma
                                        />
                                        {submitStatus === 'error_recaptcha' && <div className="text-danger small mt-1">Por favor, complete a verificação.</div>}
                                    </div>

                                    {/* Mensagens de Feedback */}
                                    {submitStatus === 'success' && <div className="alert alert-success">Obrigado! Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</div>}
                                    {submitStatus === 'error' && <div className="alert alert-danger">Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente ou entre em contato por outro canal.</div>}

                                    {/* Botão Submit */}
                                    <div className="d-grid">
                                        <button type="submit" className={`${styles.submitButton} btn btn-primary-custom`} disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Enviando...
                                                </>
                                            ) : (
                                                "Enviar Mensagem"
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