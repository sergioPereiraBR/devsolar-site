'use client';

// import FaleConoscoDS from '../fale_conosco_ds';


// function CTASectionDS() {
//     return (
//         <>
//             {/* CTA Section */}
//             <section className="py-5 bg-primary-custom text-white">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-lg-8 mb-4 mb-lg-0">
//                             <h2 className="fw-bold">Pronto para começar a economizar?</h2>
//                             <p className="lead mb-0">Solicite agora mesmo uma avaliação gratuita para seu imóvel.</p>
//                         </div>
//                         <div className="col-lg-4 text-lg-end">
//                             {/*   <button className="btn btn-light btn-lg" data-bs-toggle="modal" data-bs-target="#contactModal" onClick={() => console.log("Fala Aí!")}>
//                                 <i className="fas fa-headset me-2"></i><span>Falar com Especialista</span>
//                             </button> */}
//                             <FaleConoscoDS
//                                 textClassButton="btn btn-light btn-lg mb-3"
//                                 textMessage="Olá, quero falar com especialista."
//                                 textTag="#avaliaçãoGratuita"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </section >
//         </>
//     );
// }

// export default CTASectionDS;

import FaleConoscoDS from '../fale_conosco_ds'; // Confirme o caminho
import styles from './cta_section_ds.module.css'; // Importe o CSS Module

// Opcional: Importe um ícone se for usar SVG ou uma biblioteca
// import { FaBolt } from 'react-icons/fa'; // Exemplo com react-icons

function CTASectionDS() {
    // Defina a classe do botão aqui ou use diretamente na prop
    const buttonClasses = `${styles.ctaButton} mb-3`; // Combina estilo do module com margem do Bootstrap

    return (
        // Removido o Fragmento desnecessário
        <section className={styles.ctaSection} aria-labelledby="cta-headline"> {/* Usando classe do module */}
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8 mb-4 mb-lg-0">
                        <h2 id="cta-headline" className={styles.headline}>
                            {/* Opcional: Adicionar Ícone */}
                            {/* <FaBolt className={styles.headlineIcon} /> */}
                            <i className={`fas fa-bolt ${styles.headlineIcon}`}></i> {/* Exemplo com FontAwesome */}
                            <span>Pronto para começar a economizar?</span>
                        </h2>
                        <p className={styles.subtext}>
                            Solicite agora mesmo uma avaliação gratuita para seu imóvel.
                        </p>
                    </div>
                    <div className={`col-lg-4 text-lg-end ${styles.buttonContainer}`}>
                        <FaleConoscoDS
                            // Passando as classes CSS (incluindo a customizada do module)
                            textClassButton={buttonClasses}
                            // Mantém as outras props
                            textMessage="Olá, quero falar com especialista sobre avaliação gratuita." // Mensagem pode ser mais específica
                            textTag="#avaliacaoGratuitaCTA" // Tag pode ser mais específica
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTASectionDS;