'use client';

import Example from '@/components/tremor/area-chart-15'; // Confirme o caminho
import { calcularEconomiaSolar } from '@/utils/solarCalculations';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import global
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Image, Modal, Row, Spinner } from 'react-bootstrap'; // Adicionar Button, Spinner
import FaleConoscoDS from '../fale_conosco_ds'; // Confirme o caminho
import styles from './header_ds.module.css'; // Importar CSS Module

// --- Constantes de Configuração (Mover para arquivo .config.js ou similar idealmente) ---
const HERO_IMAGE_URL = '/images/photovoltaic.jpg';
const FALE_CONOSCO_BTN_CLASS = "btn btn-outline-light btn-lg mb-3"; // Classe do botão "Falar com Especialista"
const FALE_CONOSCO_MESSAGE = "Olá, quero falar com especialista.";
const FALE_CONOSCO_TAG_HERO = "#solNaEconomia";
const FALE_CONOSCO_TAG_RESULT = "#calculaEconomia"; // Tag base para resultado


// --- Componente Principal ---
function HeaderDS() {
    // Estados do Modal
    const [showInputModal, setShowInputModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [calculando, setCalculando] = useState(false);
    const [inputValueToMsg, setInputValueToMsg] = useState(0); // Valor como string para o input

    // Estado do Input (Controlado)
    const [inputValue, setInputValue] = useState(''); // Valor como string para o input
    const inputCustoMesRef = useRef(null);

    // Estado para os Resultados
    const [calculationResult, setCalculationResult] = useState(null); // Guarda todo o resultado do cálculo

    // Formatter de Moeda (Exibição)
    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
        // style: 'currency', // Opcional: Adiciona R$
        // currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Foco no input ao abrir modal
    useEffect(() => {
        if (showInputModal && inputCustoMesRef.current) {
            inputCustoMesRef.current.focus();
        }
    }, [showInputModal]);

    // Limpa input ao fechar modal
    useEffect(() => {
        if (!showInputModal && !showResultModal) {
            setInputValue('');
            setCalculationResult(null); // Limpa resultado também
        }
    }, [showInputModal, showResultModal]);

    // Handler do Input de Custo
    const handleInputChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '').substring(0, 11); // Permite apenas dígitos
        setInputValue(rawValue); // Atualiza o estado da string do input
    };

    // Função para obter o valor numérico do input
    const getNumericCost = () => {
        if (!inputValue) return 0;
        const num = parseInt(inputValue, 10);
        return num / 100; // Divide por 100 para obter o valor em Reais (ex: 12345 -> 123.45)
    };

    // Formata o valor numérico para exibição no input
    const formatValueForInput = (rawStringValue) => {
        if (!rawStringValue) return '';
        const num = parseInt(rawStringValue, 10);
        if (isNaN(num)) return '';
        return currencyFormatter.format(num / 100);
    };


    // Abre o modal de input
    const handleShowInput = () => {
        setShowInputModal(true);
    };

    // Fecha o modal de input, calcula e abre o modal de resultado
    const handleCalculateAndShowResult = async () => {
        const numericCost = getNumericCost();
        if (numericCost < 300 || numericCost > 999999999.99) return; // Não calcula se o valor for inválido

        setShowInputModal(false);
        setCalculando(true);
        setCalculationResult(null); // Limpa resultado anterior

        // Simula um pequeno atraso para o cálculo (pode remover se o cálculo for rápido)
        // ou mantenha para melhor UX visual do spinner
        await new Promise(resolve => setTimeout(resolve, 600));

        const result = calcularEconomiaSolar(numericCost); // Chama a função de cálculo refatorada
        setCalculationResult(result);

        setCalculando(false);
        if (!result.error) {
            setShowResultModal(true);
        } else {
            // Poderia mostrar um alerta de erro aqui
            console.error("Erro no cálculo:", result.error);
            alert(`Erro ao calcular: ${result.error}. Verifique o valor inserido.`); // Feedback simples
        }
    };

    // Fecha o modal de resultado
    const handleHideResult = () => {
        setShowResultModal(false);
        // O useEffect de limpeza cuidará de resetar o inputValue
    };

    // Previne envio com Enter no input de custo
    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (getNumericCost() > 0) {
                handleCalculateAndShowResult();
            }
        }
    };

    return (
        <>
            <header>
                {/* Hero Section */}
                <section id="hero" className={styles.hero}>
                    <div className="container position-relative">
                        <div className="row">
                            <div className={`col-lg-6 ${styles.textContainer}`}>
                                <h1 className="display-4 fw-bold mb-4">Transforme o Sol em Economia Real</h1>
                                <p className="lead mb-4">Descubra quanto você pode economizar com energia solar em sua casa, condomínio ou empresa. Nossos sistemas garantem até 95% de redução na sua conta de luz.</p>
                            </div>
                            <div className={`col-lg- ${styles.btnContainer}`}>
                                <div>
                                    {/* Botão Calcular Economia */}
                                    <Button
                                        variant="primary" // Use a variante customizada ou padrão do Bootstrap
                                        size="lg"
                                        className={`me-3 mb-3 ${styles.heroButtonPrimary}`} // Classe do Module
                                        onClick={handleShowInput}
                                    >
                                        <i className="fas fa-calculator me-2"></i>Calcular Economia
                                    </Button>
                                    {/* Botão Falar com Especialista */}
                                    <FaleConoscoDS
                                        textClassButton={`${FALE_CONOSCO_BTN_CLASS} ${styles.heroButtonSecondary}`} // Pode adicionar classe do module
                                        textMessage={FALE_CONOSCO_MESSAGE}
                                        textTag={FALE_CONOSCO_TAG_HERO}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroBackground}>
                        <Image
                            alt="Fazenda de painéis solares" // Alt text descritivo
                            src={HERO_IMAGE_URL}
                            layout="fill" // Ocupa o container pai
                            objectfit="cover" // Cobre a área
                            quality={85} // Qualidade da imagem
                        //priority  Carrega a imagem principal com prioridade
                        />
                        <div className={styles.heroOverlay}></div> {/* Overlay opcional */}
                    </div>
                </section>
            </header> {/* Tag header pode envolver apenas o hero ou ser removida se houver outro header global */}

            {/* --- Modal Input Custo Mensal --- */}
            <Modal show={showInputModal} onHide={() => setShowInputModal(false)} centered size="md">
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title>Quanto Posso Economizar?</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBodyInput}>
                    <p>Informe o valor médio mensal da sua conta de luz para simular sua economia - valor minímo de R$ 300,00:</p>
                    <div className="input-group mb-3">
                        <span className={`input-group-text ${styles.inputGroupText}`}>R$</span>
                        <input
                            ref={inputCustoMesRef}
                            type="text" // Mantém texto para permitir formatação/máscara fácil
                            inputMode="numeric" // Melhora UX mobile
                            className={`form-control form-control-lg ${styles.currencyInput}`}
                            id="valor-consumo"
                            name="valor-consumo"
                            value={formatValueForInput(inputValue)} // Formata para exibição
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            placeholder="0,00"
                            autoComplete="off"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button variant="secondary" onClick={() => setShowInputModal(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        className={styles.calculateButton}
                        onClick={handleCalculateAndShowResult}
                        disabled={calculando || getNumericCost() < 300} // Desabilita se calculando ou valor <= 0
                    >
                        {calculando ? (
                            <>
                                <Spinner animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                Calculando...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-calculator me-2"></i>Calcular Economia
                            </>
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* --- Modal Resultado --- */}
            <Modal show={showResultModal} onHide={handleHideResult} centered size="xl"> {/* Tamanho maior para o gráfico */}
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title>Resultado da Simulação</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBodyResult}>
                    {calculando ? ( // Mostra spinner se estiver recalculando por algum motivo (pouco provável aqui)
                        <div className="text-center p-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </Spinner>
                        </div>
                    ) : calculationResult && !calculationResult.error ? ( // Verifica se há resultado e não há erro
                        <>
                            <Row className="mb-4 text-center">
                                <Col md={4}>
                                    <div className={styles.resultHighlight}>
                                        <span className={styles.resultLabel}>Investimento Estimado</span>
                                        <span className={styles.resultValue}>R$ {currencyFormatter.format(calculationResult.investimentoEstimado)}</span>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className={styles.resultHighlight}>
                                        <span className={styles.resultLabel}>Payback Estimado</span>
                                        <span className={styles.resultValue}>{calculationResult.text_payback}</span>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className={styles.resultHighlight}>
                                        <span className={styles.resultLabel}>Potência do Sistema</span>
                                        <span className={styles.resultValue}>{currencyFormatter.format(calculationResult.potenciaEstimadaKwp)} kWp</span>
                                    </div>
                                </Col>
                            </Row>
                            {/* Passa os dados corretos (dataResume) para o gráfico */}
                            <div className={styles.chartContainer}>
                                <h5 className={styles.chartTitle}>Projeção de Economia Acumulada vs Custo Evitado ({calculationResult.projecao} Anos)</h5>
                                <Example dataProject={calculationResult} />
                            </div>
                            <p className={styles.chartDisclaimer}>*Valores e projeções são estimativas e podem variar, fale com especialista.</p>
                        </>
                    ) : (
                        <p className="text-center text-danger p-4">Não foi possível gerar o resultado. Verifique o valor informado.</p>
                    )}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button variant="secondary" onClick={handleHideResult}>
                        Fechar
                    </Button>
                    <FaleConoscoDS
                        textClassButton={`btn btn-primary ${styles.heroButtonPrimary}`} // Botão primário no resultado
                        textMessage={`Olá, vi minha simulação de economia, meu custo médio mensal é de R$ ${currencyFormatter.format(calculationResult && calculationResult.custoMensalInformado)} e quero falar com especialista.`}
                        textTag={`${FALE_CONOSCO_TAG_RESULT}`} // Tag com o valor
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default HeaderDS;