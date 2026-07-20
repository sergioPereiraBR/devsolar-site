'use client';

import styles from './location_map_ds.module.css'; // Opcional: para estilização

function LocationMap() {
    return (
        <div className={styles.mapContainer}>
            {/* <h3 className={styles.mapTitle}>Nossa Localização</h3> */}
            <iframe
                title="Mapa de localização da DEV Solar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.118130595175!2d-43.37059842468548!3d-22.90897007925271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997bf1462a02f9%3A0x10336504dfc62b21!2sAv.%20Jambeiro%2C%20474%20-%20C%20-%20Vila%20Valqueire%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2021330-300!5e0!3m2!1spt-BR!2sbr!4v1716489334614!5m2!1spt-BR!2sbr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            <div className={styles.addressText}>
                <h4>Av. Jambeiro, 474 - Loja C - Vila Valqueire</h4>
                <h4>Rio de Janeiro - RJ</h4>
                <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Av.+Jambeiro,+474+-+C+-+Vila+Valqueire,+Rio+de+Janeiro+-+RJ,+21330-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directionsButton}
                >
                    Ver Rotas no Google Maps
                </a>
            </div>
        </div>
    );
}

export default LocationMap;