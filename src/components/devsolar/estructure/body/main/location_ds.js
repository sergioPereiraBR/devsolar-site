'use client';

import { Row } from 'react-bootstrap';
import LocationMap from './location_map_ds';
import styles from './location_map_ds.module.css'; // Importar CSS Module


function LocationSectionDS() {
    return (
        <>
            {/* Location Section */}
            {/* <section id="location" className={`${styles.sectionTitle} fw-bold`}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Nossa Localização</h2>
                        <p className="lead">Vamos marcar, encontre um rota mais fácil para falar com a gente!</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <LocationMap />
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Location Section */}
            <section id="location" className={`${styles.sectionLocation}`} aria-labelledby="benefits-title">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 id="location-title" className={`${styles.sectionTitle} fw-bold`}>Nossa Localização</h2>
                        <p className={`${styles.sectionSubtitle} lead`}>Vamos marcar, encontre sua rota para vir falar com a gente!</p>
                    </div>
                    {/* Renderiza os cards de benefícios principais */}
                    <Row className="g-4 justify-content-center">
                        <div className="col-lg-9">
                            <LocationMap />
                        </div>
                    </Row>
                </div>
            </section>
        </>
    );
}

export default LocationSectionDS;