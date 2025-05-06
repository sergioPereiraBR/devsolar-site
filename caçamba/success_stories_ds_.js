'use client';

const CASA_URL = './images/casa.jpg';
const INDUSTRIA_URL = '.images/industria.jpg';
const PADARIA_URL = './images/padaria.jpg';

function SuccessStoriesDS() {
    return (
        <>
            {/* Success Stories */}
            <section id="cases" className="section">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Cases de Sucesso</h2>
                        <p className="lead">Conheça quem já está economizando com energia solar</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <div className="story-card card h-100">
                                <img src={CASA_URL} className="card-img-top" alt="Residência com painéis solares" />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Família Oliveira</h5>
                                    <p className="card-text">
                                        <span>
                                            "Reduzimos nossa conta de R$450 para apenas R$28 por mês. O investimento está se pagando muito mais rápido do que esperávamos!"
                                        </span>
                                    </p>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="me-2">
                                            <span className="badge bg-primary-custom">Residencial</span>
                                        </div>
                                        <div>
                                            <span className="badge bg-secondary-custom">Economia de 94%</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-primary-custom" data-bs-toggle="modal" data-bs-target="#caseStudyModal1" onClick={() => console.log("Detalhes...")}>
                                        <span>
                                            Ver Detalhes
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="story-card card h-100">
                                <img src={PADARIA_URL} className="card-img-top" alt="Comércio com painéis solares" />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Padaria Aroma</h5>
                                    <p className="card-text">
                                        <span>
                                            "Com o alto consumo de energia dos nossos fornos, a instalação solar reduziu nossos custos operacionais em 35% no geral."
                                        </span>
                                    </p>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="me-2">
                                            <span className="badge bg-primary-custom">Comercial</span>
                                        </div>
                                        <div>
                                            <span className="badge bg-secondary-custom">ROI em 2,5 anos</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-primary-custom" data-bs-toggle="modal" data-bs-target="#caseStudyModal2" onClick={() => console.log("detalhes...")}>
                                        <span>
                                            Ver Detalhes
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="story-card card h-100">
                                <img src={INDUSTRIA_URL} className="card-img-top" alt="Indústria com painéis solares" />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Metal Precisa Ltda.</h5>
                                    <p className="card-text">
                                        <span>
                                            "Implementamos um sistema de 120kWp que cobre 65% do nosso consumo. O impacto financeiro foi impressionante."
                                        </span>
                                    </p>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="me-2">
                                            <span className="badge bg-primary-custom">Industrial</span>
                                        </div>
                                        <div>
                                            <span className="badge bg-secondary-custom">Economia de R$28.500/mês</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-primary-custom" data-bs-toggle="modal" data-bs-target="#caseStudyModal3" onClick={() => console.log("Detalhes")}>
                                        <span>
                                            Ver Detalhes
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#moreStudiesModal" onClick={() => console.log("Mais casos de sucesso...")}>
                            <span>
                                Ver Mais Cases de Sucesso
                            </span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SuccessStoriesDS;