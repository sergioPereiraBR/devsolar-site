'use client';

import { FaIcon } from '@/components/devsolar/utility/fa-icon';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; // Importar useState para Newsletter
import {
    ADDRESS_INFO, // Importando dados
    COMPANY_NAME, COMPANY_SLOGAN_PA, COMPANY_SLOGAN_PB,
    CONTACT_EMAIL,
    CONTACT_PHONE_DISPLAY,
    CONTACT_PHONE_RAW,
    CURRENT_YEAR,
    LOGO_URL,
    navLinksData,
    socialLinksData,
    usefulLinksData,
    WHATSAPP_FLOAT_ICON_URL,
    WHATSAPP_FLOAT_URL
} from './footer_data_ds'; // Ajuste o caminho se necessário
import styles from './footer_ds.module.css';

// Chave de acesso DO NOVO formulário Newsletter no StaticForms
const NEWSLETTER_STATICFORMS_KEY = process.env.NEXT_PUBLIC_NEWSLETTER_STATICFORMS_KEY || "sf_0cg1jn4jjmlngif74g76lk9j";

function FooterDS() {
    // Estado para o input e feedback da newsletter
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState(null); // null | 'submitting' | 'success' | 'error'
    const [newsletterMessage, setNewsletterMessage] = useState('');

    // Handler para o envio da newsletter
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;

        setNewsletterStatus('submitting');
        setNewsletterMessage('');

        const payload = {
            accessKey: NEWSLETTER_STATICFORMS_KEY,
            email: newsletterEmail, // Campo principal
            subject: `Nova Inscrição Newsletter DEV Solar: ${newsletterEmail}`, // Assunto do email que VOCÊ recebe
            // --- Campos Opcionais StaticForms ---
            replyTo: newsletterEmail, // Permite responder diretamente ao inscrito (se aplicável)
            // redirectTo: '/obrigado-newsletter', // Página de sucesso opcional
            // honeypot: '' // Campo honeypot se você adicionar um no HTML
        };

        try {
            const response = await fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const result = await response.json();

            if (response.ok && result.success !== false) {
                setNewsletterStatus('success');
                setNewsletterMessage('Obrigado por se inscrever!');
                setNewsletterEmail(''); // Limpa o campo
                setTimeout(() => setNewsletterStatus(null), 4000); // Limpa msg após 4s
            } else {
                throw new Error(result.error || result.message || 'Erro desconhecido do serviço.');
            }
        } catch (error) {
            console.error("Newsletter Submit Error:", error);
            setNewsletterStatus('error');
            setNewsletterMessage('Erro ao inscrever. Tente novamente.');
            setTimeout(() => setNewsletterStatus(null), 5000); // Limpa msg após 5s
        }
    };

    return (
        // Removido Fragmento
        <footer className={styles.footer} id="footer">
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.footerGrid}>

                    {/* Coluna 1: Info da Empresa */}
                    <div className={`${styles.footerColumn} ${styles.footerInfo}`}>
                        <div className={styles.footerLogo}>
                            <Link href="/#home" aria-label={`Ir para a página inicial de ${COMPANY_NAME}`}>
                                <Image
                                    className={styles.logoImg} // Classe específica para o logo img
                                    src={LOGO_URL}
                                    alt={`${COMPANY_NAME} Logo`}
                                    width={177} // Aumentado um pouco
                                    height={48} // Ajustado proporcionalmente
                                />
                            </Link>
                        </div>
                        <h2 className={styles.slogan}>{COMPANY_SLOGAN_PA}<br></br> {COMPANY_SLOGAN_PB}</h2>
                        <div className={styles.contactInfo}>
                            {/* Telefone Clicável */}
                            <div className={`${styles.contactItem} d-flex align-items-center mb-2`}>
                                <FaIcon iconClass="fas fa-phone-alt" className={styles.contactIcon} aria-label="Telefone DEV Solar" />
                                <a href={`tel:${CONTACT_PHONE_RAW}`} aria-label="Ligar para DEV Solar"> {CONTACT_PHONE_DISPLAY}</a>
                            </div>
                            {/* Email Clicável */}
                            <div className={`${styles.contactItem} d-flex align-items-center mb-2`}>
                                <FaIcon iconClass="fas fa-envelope" className={styles.contactIcon} aria-label="Email DEV Solar" />
                                <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Enviar email para DEV Solar"> {CONTACT_EMAIL}</a>
                            </div>
                            {/* Endereço Consolidado */}
                            <div className={`${styles.contactItem} d-flex align-items-start mb-2`}>
                                <FaIcon iconClass="fas fa-location-dot" className={`${styles.contactIcon} mt-1`} aria-label="Localização DEV Solar" />
                                <div>
                                    {ADDRESS_INFO.line1}<br />
                                    {ADDRESS_INFO.line2}<br />
                                    CEP: {ADDRESS_INFO.cep}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coluna 2: Navegação Principal */}
                    <div className={`${styles.footerColumn} ${styles.footerLinks}`}>
                        <p className={styles.footerTitle}>Navegação</p>
                        <ul>
                            {navLinksData.map(link => (
                                <li key={link.id}><Link href={link.href}>{link.text}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 3: Links Úteis */}
                    <div className={`${styles.footerColumn} ${styles.footerLinks}`}>
                        <p className={styles.footerTitle}>Links Úteis</p>
                        <ul>
                            {usefulLinksData.map(link => (
                                <li key={link.id}><Link href={link.href}>{link.text}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 4: Redes Sociais e Newsletter */}
                    <div className={`${styles.footerColumn} ${styles.footerSocial}`}>
                        <p className={styles.footerTitle}>Siga-nos</p>
                        <div className={`${styles.socialLinksContainer} d-flex mb-4`}> {/* Adicionado mb-4 */}
                            {socialLinksData.map(social => (
                                <Link
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialIconLinkFooter} // Classe específica do footer
                                    aria-label={`Visitar ${COMPANY_NAME} no ${social.name}`}
                                >
                                    <FaIcon iconClass={social.iconClass} aria-label={social.accessibility} />
                                    <span className="sr-only">{social.accessibility}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Formulário de Newsletter com estado básico */}
                        <p className={styles.footerTitleNewsletter}>Newsletter</p>
                        <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                id="newsletter-email"
                                name="newsletter_email"
                                aria-label="Email para newsletter"
                                placeholder="Seu melhor e-mail"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                required
                                disabled={newsletterStatus === 'submitting'} // Desabilita durante envio
                            />
                            <button type="submit" aria-label="Inscrever na newsletter" disabled={newsletterStatus === 'submitting'}>
                                {newsletterStatus === 'submitting' ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    <FaIcon iconClass="fas fa-paper-plane" aria-label="Enviar" />
                                )}
                            </button>
                        </form>
                        {/* Mensagens de Feedback da Newsletter */}
                        <div className={styles.newsletterFeedback}>
                            {newsletterStatus === 'success' && <p className={styles.successMessage}>{newsletterMessage}</p>}
                            {newsletterStatus === 'error' && <p className={styles.errorMessage}>{newsletterMessage}</p>}
                        </div>
                    </div>

                </div>

                {/* Seção de Copyright */}
                <div className={styles.footerCopyright}>
                    <p>
                        © {CURRENT_YEAR} {COMPANY_NAME} - Todos os direitos reservados.
                        {/* Links legais agora apenas aqui (removidos da coluna 3 ou vice-versa) */}
                        | <Link href="/#">Política de Privacidade</Link> |
                        <Link href="/#">Termos de Uso</Link>
                        {/* | <Link href="/politica-de-privacidade">Política de Privacidade</Link> |
                        <Link href="/termos-de-uso">Termos de Uso</Link> | rev 0.0.350 */}
                    </p>
                    {/* <p className={styles.developerCredit}>
                        Powered by <a href={DEVELOPER_URL} target="_blank" rel="noopener noreferrer">{DEVELOPER_NAME}</a>
                    </p> */}
                </div>
            </div>

            {/* Botão flutuante do WhatsApp com next/image */}
            <Link
                href={WHATSAPP_FLOAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn} // Classe do CSS Module
                aria-label="Entrar em contato pelo WhatsApp"
            >   <span className="sr-only">Entre em contato conosco via WhatsApp</span>
                <Image
                    src={WHATSAPP_FLOAT_ICON_URL} // Ícone local SVG branco
                    alt="WhatsApp"
                    width={32} // Ajuste o tamanho do ícone dentro do botão
                    height={32}
                />
            </Link>
        </footer> // Fechamento correto do footer
    );
}

export default FooterDS;