'use client';

{/*===================================================================== 2 - Modal Sustentabilidade */ }

{/* Modal de  Sustentabilidade*/ }
<Modal show={showSustentabilidade} onHide={handleCloseSustentabilidade} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Sustentabilidade com Energia Solar</Modal.Title>
    </Modal.Header>
    <Modal.Body className="row g-4 m-0">
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowResidenciaSustainability(true)}
        >
            {/* <Card className="col-md-4 feature-card card shadow-sm h-120 p-4"> */}
            <Card.Body className="text-center">
                <i className="fa-solid fa-house feature-icon"></i>
                <Card.Title className="fw-bold">Residência</Card.Title>
                <Card.Text>
                    Contribua ativamente para um futuro mais verde, utilizando uma fonte de energia limpa e renovável, reduzindo sua pegada de carbono e o impacto ambiental.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowCondominioSustainability(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-building feature-icon"></i>
                <Card.Title className="fw-bold">Condomínio</Card.Title>
                <Card.Text>
                    Demonstre o compromisso do seu condomínio com a sustentabilidade em larga escala, tornando-se um exemplo de responsabilidade ambiental para toda a comunidade.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowEmpresaSustainability(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-briefcase feature-icon"></i>
                <Card.Title className="fw-bold">Empresa</Card.Title>
                <Card.Text>
                    Fortaleça a imagem da sua marca como uma empresa ecologicamente responsável, atraindo clientes e investidores conscientes e alinhando-se com as práticas ESG.
                </Card.Text>
            </Card.Body>
        </Card>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSustentabilidade}>
            <i className="fas fa-headset me-2"></i><span>Falar com Especialista</span>
        </Button>
    </Modal.Footer>
</Modal>



{/*===================================================================== 3 - Modal Valorização Imobiliária */ }

{/* Modal de Valorização Imobiliária */ }
<Modal show={showValorizacao} onHide={handleCloseValorizacao} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Valorização Imobiliária com Energia Solar</Modal.Title>
    </Modal.Header>
    <Modal.Body className="row g-4 m-0">
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowResidenciaValorizacao(true)}
        >
            <Card.Body className="text-center">
                <i className="fa-solid fa-house feature-icon"></i>
                <Card.Title className="fw-bold">Residência</Card.Title>
                <Card.Text>
                    Aumente o valor de mercado do seu imóvel. Casas com sistemas de energia solar instalados são mais atrativas para compradores e podem ser vendidas por um preço mais alto.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowCondominioValorizacao(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-building feature-icon"></i>
                <Card.Title className="fw-bold">Condomínio</Card.Title>
                <Card.Text>
                    Valorize todas as unidades do condomínio, tornando-o mais desejável para potenciais compradores e inquilinos, além de reduzir os custos para os moradores atuais.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowEmpresaValorizacao(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-briefcase feature-icon"></i>
                <Card.Title className="fw-bold">Empresa</Card.Title>
                <Card.Text>
                    Seu imóvel comercial com energia solar se torna um ativo mais valioso e competitivo no mercado imobiliário, além de reduzir seus custos operacionais.
                </Card.Text>
            </Card.Body>
        </Card>
    </Modal.Body>
    <Modal.Footer>
        <div className="mb-2 btn-consumo mt-2">
            <button type="button" className="btn btn-primary-custom btn-lg" onClick={() => handleCloseValorizacao(false)}>
                <i className="fas fa-headset me-2"></i><span>Falar com Especialista</span>
            </button>
        </div>
    </Modal.Footer>
</Modal>



{/*===================================================================== 4 - Modal Baixa Manutenção */ }

{/* Modal de Baixa Manutenção */ }
<Modal show={showManutencao} onHide={handleCloseManutencao} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Baixa Manutenção do Sistema de Energia Solar</Modal.Title>
    </Modal.Header>
    <Modal.Body className="row g-4 m-0">
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowResidenciaManutencao(true)}
        >
            <Card.Body className="text-center">
                <i className="fa-solid fa-house feature-icon"></i>
                <Card.Title className="fw-bold">Residência</Card.Title>
                <Card.Text>
                    Os sistemas solares requerem pouca manutenção, geralmente apenas limpezas periódicas dos painéis para garantir a máxima eficiência. Desfrute de energia limpa sem grandes preocupações.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowCondominioManutencao(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-building feature-icon"></i>
                <Card.Title className="fw-bold">Condomínio</Card.Title>
                <Card.Text>
                    Com sistemas duráveis e de baixa manutenção, os custos e o trabalho de conservação são mínimos, otimizando os recursos do condomínio a longo prazo.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowEmpresaManutencao(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-briefcase feature-icon"></i>
                <Card.Title className="fw-bold">Empresa</Card.Title>
                <Card.Text>
                    Sistemas solares são projetados para durar e exigem pouca intervenção, permitindo que sua empresa foque no core business sem se preocupar com manutenções constantes.
                </Card.Text>
            </Card.Body>
        </Card>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseManutencao}>
            <i className="fas fa-headset me-2"></i><span>Falar com Especialista</span>
        </Button>
    </Modal.Footer>
</Modal>



{/*===================================================================== 5 - Modal Proteção contra Aumentos */ }

{/* Modal de Proteção contra Aumentos */ }
<Modal show={showProtecao} onHide={handleCloseProtecao} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Proteção contra Aumentos na Conta de Luz com Energia Solar</Modal.Title>
    </Modal.Header>
    <Modal.Body className="row g-4 m-0">
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowResidenciaProtecao(true)}
        >
            <Card.Body className="text-center">
                <i className="fa-solid fa-house feature-icon"></i>
                <Card.Title className="fw-bold">Residência</Card.Title>
                <Card.Text>
                    Proteja seu orçamento familiar contra as constantes elevações nas tarifas de energia elétrica. Com a energia solar, você tem mais controle sobre seus gastos.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowCondominioProtecao(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-building feature-icon"></i>
                <Card.Title className="fw-bold">Condomínio</Card.Title>
                <Card.Text>
                    Reduza a vulnerabilidade do condomínio aos aumentos tarifários, garantindo uma despesa mais estável e previsível para todos os moradores.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowEmpresaProtecao(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-briefcase feature-icon"></i>
                <Card.Title className="fw-bold">Empresa</Card.Title>
                <Card.Text>
                    Minimize o impacto das flutuações e aumentos nos custos de energia, tornando seu planejamento financeiro mais seguro e competitivo a longo prazo.
                </Card.Text>
            </Card.Body>
        </Card>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProtecao}>
            <i className="fas fa-headset me-2"></i><span>Falar com Especialista</span>
        </Button>
    </Modal.Footer>
</Modal>


{/*===================================================================== 6 - Modal Financiamento Facilitado */ }

{/* Modal de Financiamento Facilitado */ }
<Modal show={showFinanciamento} onHide={handleCloseFinanciamento} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Financiamento Facilitado para Energia Solar</Modal.Title>
    </Modal.Header>
    <Modal.Body className="row g-4 m-0">
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowResidenciaFinanciamento(true)}
        >
            <Card.Body className="text-center">
                <i className="fa-solid fa-house feature-icon"></i>
                <Card.Title className="fw-bold">Residência</Card.Title>
                <Card.Text>
                    Aproveite diversas opções de financiamento com condições facilitadas e taxas atrativas para tornar a energia solar acessível para o seu lar.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowCondominioFinanciamento(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-building feature-icon"></i>
                <Card.Title className="fw-bold">Condomínio</Card.Title>
                <Card.Text>
                    Explore linhas de crédito e financiamentos especiais para condomínios, tornando o investimento em energia solar viável e com retorno garantido para todos.
                </Card.Text>
            </Card.Body>
        </Card>
        <Card
            className="mx-auto feature-card card shadow-sm h-120 p-4 mx-1"
            style={{ width: '32%', cursor: 'pointer' }} // Largura ajustável via estado ou prop
            onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
            onClick={() => setShowEmpresaFinanciamento(true)}
        >
            <Card.Body className="text-center">
                <i className="fas fa-briefcase feature-icon"></i>
                <Card.Title className="fw-bold">Empresa</Card.Title>
                <Card.Text>
                    Descubra as diversas linhas de financiamento e incentivos fiscais disponíveis para empresas que investem em energia solar, facilitando a implementação do sistema.
                </Card.Text>
            </Card.Body>
        </Card>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseFinanciamento}>
            <i className="fas fa-headset me-2"></i><span>Falar com Especialista</span>
        </Button>
    </Modal.Footer>
</Modal>


// Política de Privacidade Termos de Serviço Mapa do Site
// Copyright © 2025 Open Education LLC. Todos os direitos reservados.

// Este site é protegido por reCAPTCHA e a Política de Privacidade e os Termos de Serviço do Google se aplicam.