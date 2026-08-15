import { FaIcon } from '@/components/devsolar/utility/fa-icon';

import styles from './call_whatsapp.module.css';

type CallWhatsappProps = {
  className?: string;
  label?: string;
  phone?: string;
  message?: string;
  iconClass?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
};

export default function CallWhatsapp({
  className,
  label = 'Marcar uma Visita Técnica',
  phone = '5521999677722',
  message = 'Olá! fiz a simulação no site e quero agendar minha vistoria técnica',
  iconClass = 'fas fa-headset',
  buttonType = 'button',
  onClick,
  disabled = false,
}: CallWhatsappProps) {
  const handleClick = () => {
    onClick?.();

    const encodedMessage = encodeURIComponent(message);
    const hasFaqPrefix = message.includes('FAQ do site:');

    if (!hasFaqPrefix) {
      window.open(
        `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`,
        '_blank',
        'noopener,noreferrer,nofollow',
      );
    } else {
      window.open(
        `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`,
        '_blank',
        'noopener,noreferrer,nofollow',
      );
    }
  };

  return (
    <button
      type={buttonType}
      className={className ? `${className} ${styles.button}` : styles.button}
      onClick={handleClick}
      disabled={disabled}
      style={{ minWidth: '250px' }}
    >
      <FaIcon
        iconClass={iconClass}
        className={styles.icon}
        aria-label={label}
      />
      <span>{label}</span>
    </button>
  );
}
