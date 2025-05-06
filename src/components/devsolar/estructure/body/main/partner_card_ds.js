import Image from 'next/image';
import styles from './partner_card_ds.module.css'; // Criaremos este CSS

const PartnerCard = ({ logoUrl, name, description }) => {
    return (
        <div className={styles.card}>
            <div className={styles.logoContainer}>
                {/* Usamos next/image para otimização */}
                <Image
                    src={logoUrl} // Ex: '/images/logos/fornecedor-a.png'
                    alt={`Logo ${name}`}
                    width={60} // Ajuste o tamanho base conforme necessário
                    height={60}
                    className={styles.logoImage} // Para estilização adicional se precisar
                    // layout="responsive" // Pode ser útil dependendo do CSS
                    objectfit="contain" // 'contain' geralmente funciona melhor para logos
                />
            </div>
            <div className={styles.textContainer}>
                <h5 className={styles.partnerName}>{name}</h5>
                <p className={styles.partnerDescription}>{description}</p>
            </div>
        </div>
    );
};

export default PartnerCard;