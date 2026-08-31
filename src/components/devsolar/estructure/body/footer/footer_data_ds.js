'use client';

import LogoDevBranco from '@/assets/logo-dev-branco.webp';

export const COMPANY_NAME = 'DEV Solar';
export const COMPANY_SLOGAN_PA = 'O FUTURO É SOLAR';
export const COMPANY_SLOGAN_PB = 'junte-se a essa mudança.';
export const CONTACT_PHONE_RAW = '5521999677722'; // Número puro para links
export const CONTACT_PHONE_DISPLAY = '+55 (21) 99967-7722'; // Formato para exibição
export const CONTACT_EMAIL = 'comercial@devsolar.com.br';
export const ADDRESS_INFO = {
  line1: 'Av. Jambeiro, 474 - Lj C -',
  line2: 'Vila Valqueire,',
  line3: 'Rio de Janeiro - RJ,',
  cep: '21330-300', // Adicionado CEP aqui
};
export const CURRENT_YEAR = new Date().getFullYear();
export const LOGO_URL = LogoDevBranco.src; // Logo para o rodapé
export const WHATSAPP_FLOAT_ICON_URL = '@/assets/WhatsApp.svg'; //"https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"; //'/icons/whatsapp-white.svg'; // Ícone branco para botão flutuante
export const DEVELOPER_NAME = 'Pereira Dev';
export const DEVELOPER_URL = 'https://www.linkedin.com/in/sergiopereira-br'; // https://github.com/sergioPereiraBR

// Links de Navegação Principal do Rodapé
export const navLinksData = [
  { id: 'home', href: '/#home', text: 'Início' },
  // { id: 'about', href: '/#sobre', text: 'Sobre Nós' }, // Exemplo de página interna
  { id: 'benefits', href: '/#beneficios', text: 'Benefícios' }, // Link para seção na home
  { id: 'services', href: '/#modalidades', text: 'Serviços' }, // Exemplo página interna
  { id: 'cases', href: '/#cases', text: 'Cases de Sucesso' },
  { id: 'faq', href: '/#faq', text: 'Perguntas Frequentes' },
  // { id: 'about', href: '/#sobre-devsolar', text: 'Sobre Nós' },
  // { id: 'guarantees', href: '/#garantias', text: 'Garantias' },
  { id: 'location', href: '/#location', text: 'Localização' },
  { id: 'partners', href: '/#parceiros', text: 'Parceiros' },
  { id: 'contact', href: '/#contato', text: 'Contato' },
];

// Links Úteis
export const usefulLinksData = [
  { id: 'faq', href: '/#faq', text: 'Perguntas Frequentes' },
  { id: 'terms', href: '/termos-de-uso/', text: 'Termos de Uso' }, // Exemplo página interna
  {
    id: 'privacy',
    href: '/politica-de-privacidade/',
    text: 'Política de Privacidade',
  }, // Exemplo página interna
  // { id: 'terms', href: '/termos-de-uso', text: 'Termos de Uso' }, // Exemplo página interna
  // { id: 'privacy', href: '/politica-de-privacidade', text: 'Política de Privacidade' }, // Exemplo página interna
];

const WHATSAPP_MESSAGE =
  'Olá! 👋\n\nVisitei o site da DEV Solar e gostaria de falar com um atendente.';
const WHATSAPP_MESSAGE_ENCODED = encodeURIComponent(WHATSAPP_MESSAGE);

const linkedinCompany = 'dev-solar-eficiência-energética';
// Encode da string acentuada
const encodedPath = encodeURIComponent(linkedinCompany);

// Links Sociais (mantendo FontAwesome por enquanto)
export const socialLinksData = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61562778810789',
    iconClass: 'fab fa-facebook-f',
    accessibility: 'Acesse nossa página no Facebook',
    rel: 'noopener noreferrer nofollow',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/devsolar_',
    iconClass: 'fab fa-instagram',
    accessibility: 'Acesse nosso perfil no Instagram',
    rel: 'noopener noreferrer',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: `https://www.linkedin.com/company/${encodedPath}`,
    iconClass: 'fab fa-linkedin-in',
    accessibility: 'Acesse nossa página no LinkedIn',
    rel: 'noopener noreferrer',
  },
  // { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', iconClass: 'fab fa-youtube', accessibility: 'Acesse nosso canal no YouTube' }, // Exemplo de URL real
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: `https://api.whatsapp.com/send?phone=${CONTACT_PHONE_RAW}&text=${WHATSAPP_MESSAGE_ENCODED}`,
    iconClass: 'fab fa-whatsapp',
    accessibility: 'Entre em contato conosco via WhatsApp',
    rel: 'noopener noreferrer nofollow',
  },
];
// Dados específicos do botão flutuante do WhatsApp
export const WHATSAPP_FLOAT_URL = `https://api.whatsapp.com/send?phone=${CONTACT_PHONE_RAW}&text=${WHATSAPP_MESSAGE_ENCODED}`;
