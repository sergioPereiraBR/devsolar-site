// 'use client';

// import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// import {
//   faFacebookF,
//   faGoogle,
//   faInstagram,
//   faLinkedinIn,
//   faTwitter,
//   faWhatsapp,
// } from '@fortawesome/free-brands-svg-icons';
// import { faSmile } from '@fortawesome/free-regular-svg-icons';
// import {
//   faBolt,
//   faBriefcase,
//   faBuilding,
//   faCalculator,
//   faChartLine,
//   faEnvelope,
//   faFileInvoiceDollar,
//   faGlobe,
//   faHandshake,
//   faHeadset,
//   faHouse,
//   faInfoCircle,
//   faLeaf,
//   faLocationDot,
//   faPaperPlane,
//   faPhoneAlt,
//   faPiggyBank,
//   faShieldAlt,
//   faStoreAlt,
//   faTools,
//   faUser,
//   faUsers,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const iconMap: Record<string, IconDefinition> = {
//   'fas fa-bolt': faBolt,
//   'fas fa-building': faBuilding,
//   'fas fa-briefcase': faBriefcase,
//   'fas fa-calculator': faCalculator,
//   'fas fa-chart-line': faChartLine,
//   'fas fa-envelope': faEnvelope,
//   'fas fa-globe': faGlobe,
//   'fas fa-handshake': faHandshake,
//   'fas fa-headset': faHeadset,
//   'fa-solid fa-house': faHouse,
//   'fas fa-info-circle': faInfoCircle,
//   'fas fa-leaf': faLeaf,
//   'fas fa-paper-plane': faPaperPlane,
//   'fas fa-phone-alt': faPhoneAlt,
//   'fas fa-piggy-bank': faPiggyBank,
//   'fas fa-shield-alt': faShieldAlt,
//   'fas fa-tools': faTools,
//   'fas fa-users': faUsers,
//   'fas fa-store-alt': faStoreAlt,
//   'fas fa-file-invoice-dollar': faFileInvoiceDollar,
//   'fas fa-user': faUser,
//   'fab fa-facebook-f': faFacebookF,
//   'fa fa-facebook-f': faFacebookF,
//   'fab fa-instagram': faInstagram,
//   'fab fa-linkedin-in': faLinkedinIn,
//   'fa fa-linkedin-in': faLinkedinIn,
//   'fab fa-whatsapp': faWhatsapp,
//   'fa fa-google': faGoogle,
//   'fa fa-twitter': faTwitter,
//   'fab fa-twitter': faTwitter,
//   'far fa-smile': faSmile,
//   'fas fa-location-dot': faLocationDot,
// };

// export interface FaIconProps {
//   iconClass: string;
//   className?: string;
//   title?: string;
//   'aria-label'?: string;
//   [key: string]: any;
// }

// export function FaIcon({ iconClass, className, ...props }: FaIconProps) {
//   const icon = iconMap[iconClass];

//   if (!icon) {
//     console.warn(`FaIcon: ícone não mapeado para '${iconClass}'`);
//     return null;
//   }

//   return <FontAwesomeIcon icon={icon} className={className} {...props} />;
// }
'use client';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebookF,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import {
  faBolt,
  faBriefcase,
  faBuilding,
  faCalculator,
  faChartLine,
  faEnvelope,
  faFileInvoiceDollar,
  faGlobe,
  faHandshake,
  faHeadset,
  faHouse,
  faInfoCircle,
  faLeaf,
  faLocationDot,
  faPaperPlane,
  faPhone, // Atualizado de faPhoneAlt (v6+)
  faPiggyBank,
  faShieldHalved, // Atualizado de faShieldAlt (v6+)
  faStore, // Atualizado de faStoreAlt (v6+)
  faTools,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Mapeamento blindado aceitando variações clássicas (fas) e modernas (fa-solid)
const iconMap: Record<string, IconDefinition> = {
  'fas fa-bolt': faBolt,
  'fa-solid fa-bolt': faBolt,
  'fas fa-building': faBuilding,
  'fa-solid fa-building': faBuilding,
  'fas fa-briefcase': faBriefcase,
  'fa-solid fa-briefcase': faBriefcase,
  'fas fa-calculator': faCalculator,
  'fa-solid fa-calculator': faCalculator,
  'fas fa-chart-line': faChartLine,
  'fa-solid fa-chart-line': faChartLine,
  'fas fa-envelope': faEnvelope,
  'fa-solid fa-envelope': faEnvelope,
  'fas fa-globe': faGlobe,
  'fa-solid fa-globe': faGlobe,
  'fas fa-handshake': faHandshake,
  'fa-solid fa-handshake': faHandshake,
  'fas fa-headset': faHeadset,
  'fa-solid fa-headset': faHeadset,
  'fas fa-house': faHouse,
  'fa-solid fa-house': faHouse,
  'fas fa-info-circle': faInfoCircle,
  'fa-solid fa-info-circle': faInfoCircle,
  'fas fa-leaf': faLeaf,
  'fa-solid fa-leaf': faLeaf,
  'fas fa-paper-plane': faPaperPlane,
  'fa-solid fa-paper-plane': faPaperPlane,
  'fas fa-phone-alt': faPhone,
  'fa-solid fa-phone': faPhone,
  'fas fa-piggy-bank': faPiggyBank,
  'fa-solid fa-piggy-bank': faPiggyBank,
  'fas fa-shield-alt': faShieldHalved,
  'fa-solid fa-shield': faShieldHalved,
  'fas fa-tools': faTools,
  'fa-solid fa-tools': faTools,
  'fas fa-users': faUsers,
  'fa-solid fa-users': faUsers,
  'fas fa-store-alt': faStore,
  'fa-solid fa-store': faStore,
  'fas fa-file-invoice-dollar': faFileInvoiceDollar,
  'fa-solid fa-file-invoice-dollar': faFileInvoiceDollar,
  'fas fa-user': faUser,
  'fa-solid fa-user': faUser,
  'fab fa-facebook-f': faFacebookF,
  'fa fa-facebook-f': faFacebookF,
  'fab fa-instagram': faInstagram,
  'fab fa-linkedin-in': faLinkedinIn,
  'fa fa-linkedin-in': faLinkedinIn,
  'fab fa-whatsapp': faWhatsapp,
  'fa fa-google': faGoogle,
  'fa fa-twitter': faTwitter,
  'fab fa-twitter': faTwitter,
  'far fa-smile': faSmile,
  'fas fa-location-dot': faLocationDot,
  'fa-solid fa-location-dot': faLocationDot,
};

export interface FaIconProps {
  iconClass: string;
  className?: string;
  title?: string;
  'aria-label'?: string;
  [key: string]: any;
}

export function FaIcon({ iconClass, className = '', ...props }: FaIconProps) {
  // 1. Isola e extrai apenas as duas primeiras palavras da string (o identificador real do ícone)
  const partes = iconClass.trim().split(/\s+/);
  const classeIconeReal = partes.slice(0, 2).join(' ');

  // 2. Coleta qualquer classe de CSS extra que sobrou na string original
  const classesCssDoBanco = partes.slice(2).join(' ');

  // 3. Busca o ícone correspondente no mapa através da classe limpa
  const icon = iconMap[classeIconeReal];

  if (!icon) {
    console.warn(`FaIcon: ícone não mapeado para '${classeIconeReal}'`);
    return null;
  }

  // 4. Junta as propriedades de classe originais com as classes extras trazidas do banco
  const classeFinal = `${classesCssDoBanco} ${className}`.trim();

  return <FontAwesomeIcon icon={icon} className={classeFinal} {...props} />;
}
