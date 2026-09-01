import Image from 'next/image';

import styles from './partner_card_ds.module.css'; // Criaremos este CSS

const PartnerCard = ({ id, id_service, logoUrl, name, description }) => {
  return (
    <div id={id} className={styles.card}>
      <div className={styles.logoContainer}>
        {/* Usamos next/image para otimização */}
        <Image
          src={logoUrl} // Ex: '/images/logos/fornecedor-a.png'
          alt={`Logo ${name}`}
          width={60} // Ajuste o tamanho base conforme necessário
          height={60}
          className={styles.logoImage} // Para estilização adicional se precisar
          // layout="responsive" // Pode ser útil dependendo do CSS
          style={{ objectFit: 'contain' }} // 'contain' geralmente funciona melhor para logos
          quality={65}
        />
      </div>
      <div id={id_service} className={styles.textContainer}>
        <p className={styles.partnerName}>{name}</p>
        <p className={styles.partnerDescription}>{description}</p>
      </div>
    </div>
  );
};

export default PartnerCard;
