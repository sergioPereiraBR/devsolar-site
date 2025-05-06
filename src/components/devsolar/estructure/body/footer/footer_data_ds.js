'use client';

export const COMPANY_NAME = "DEV Solar";
export const COMPANY_SLOGAN_PA = "O FUTURO É SOLAR";
export const COMPANY_SLOGAN_PB = "junte-se a essa mudança.";
export const CONTACT_PHONE_RAW = "998990303"; // Número puro para links
export const CONTACT_PHONE_DISPLAY = "+55 (21) 99899-0303"; // Formato para exibição
export const CONTACT_EMAIL = "comercial@devsolar.com.br";
export const ADDRESS_INFO = {
    line1: "Av. Jambeiro, 474 Loja C",
    line2: "Vila Valqueire - Rio de Janeiro/RJ",
    cep: "21330-300" // Adicionado CEP aqui
};
export const CURRENT_YEAR = new Date().getFullYear();
export const LOGO_URL = './images/logo-dev-branco.png'; // Logo para o rodapé
export const WHATSAPP_FLOAT_ICON_URL = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"; //'/icons/whatsapp-white.svg'; // Ícone branco para botão flutuante
export const DEVELOPER_NAME = "Pereira Dev";
export const DEVELOPER_URL = "https://www.linkedin.com/in/sergiopereira-br/"; // https://github.com/sergioPereiraBR

// Links de Navegação Principal do Rodapé
export const navLinksData = [
    { id: 'home', href: '/', text: 'Início' },
    // { id: 'about', href: '/#sobre', text: 'Sobre Nós' }, // Exemplo de página interna
    { id: 'benefits', href: '/#beneficios', text: 'Benefícios' }, // Link para seção na home
    { id: 'services', href: '/#modalidades', text: 'Serviços' }, // Exemplo página interna
    { id: 'cases', href: '/#cases', text: 'Cases de Sucesso' },
    { id: 'faq', href: '/#faq', text: 'Perguntas Frequentes' },
    { id: 'location', href: '/#location', text: 'Localização' },
    { id: 'partners', href: '/#parceiros', text: 'Parceiros' },
    { id: 'contact', href: '/#contato', text: 'Contato' },
];

// Links Úteis
export const usefulLinksData = [
    { id: 'faq', href: '/#faq', text: 'Perguntas Frequentes' },
    { id: 'terms', href: '/#', text: 'Termos de Uso' }, // Exemplo página interna
    { id: 'privacy', href: '/#', text: 'Política de Privacidade' }, // Exemplo página interna
    // { id: 'terms', href: '/termos-de-uso', text: 'Termos de Uso' }, // Exemplo página interna
    // { id: 'privacy', href: '/politica-de-privacidade', text: 'Política de Privacidade' }, // Exemplo página interna
];

// Links Sociais (mantendo FontAwesome por enquanto)
export const socialLinksData = [
    { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61562778810789', iconClass: 'fab fa-facebook-f' },
    { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/devsolar_/', iconClass: 'fab fa-instagram' },
    { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/company/dev-solar-efici%C3%AAncia-energ%C3%A9tica/about/', iconClass: 'fab fa-linkedin-in' },
    // { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', iconClass: 'fab fa-youtube' }, // Exemplo de URL real
    { id: 'whatsapp', name: 'WhatsApp', url: `https://wa.me/${CONTACT_PHONE_RAW}?text=Olá!%20Gostaria%20de%20mais%20informações`, iconClass: 'fab fa-whatsapp' },
];

// Dados específicos do botão flutuante do WhatsApp
export const WHATSAPP_FLOAT_URL = `https://wa.me/${CONTACT_PHONE_RAW}?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20DEV%20Solar.`;