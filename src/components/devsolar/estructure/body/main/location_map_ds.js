'use client';

import { trackEvent } from '@/lib/analytics';

import styles from './location_map_ds.module.css';

function LocationMap() {
  return (
    <div className={styles.mapContainer}>
      <iframe
        title="Mapa de localização da DEV Solar"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1837.9307572125454!2d-43.37119743344199!3d-22.88157360163847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9963a865267047%3A0xe012023a2b57908d!2sDEV%20Solar%20Efici%C3%AAncia%20Energ%C3%A9tica!5e0!3m2!1spt-BR!2sbr!4v1788013492026!5m2!1spt-BR!2sbr"
        width="100%"
        height="450"
        style={{ border: 0, display: 'block' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-popups-to-escape-sandbox allow-popups allow-same-origin allow-scripts"
      />
      <div className={styles.addressText}>
        <h4>Av. Jambeiro, 474 - Lj C - Vila Valqueire,</h4>
        <h4>Rio de Janeiro - RJ, 21330-300</h4>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=DEV+Solar+Vila+Valqueire"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={styles.directionsButton}
          data-tab-entry="true"
          onClick={() =>
            trackEvent('outbound_click', {
              location: 'location_section',
              link_type: 'maps_directions',
              destination: 'google_maps_directions',
            })
          }
        >
          Ver Rotas no Google Maps
        </a>
      </div>
    </div>
  );
}

export default LocationMap;
