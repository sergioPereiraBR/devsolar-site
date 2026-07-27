'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Logo from '@/assets/logo_sm.webp'; // Importa a imagem do logo pequeno
import Photovoltaic from '@/assets/photovoltaic.webp';
import { calcularEconomiaSolar } from '@/utils/solarCalculations';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap'; // Adicionar Button, Spinner

import { trackEvent, trackWhatsAppClick } from '@/lib/analytics';

import { FaIcon } from '@/components/devsolar/utility/fa-icon';

import FaleConoscoDS from '../fale_conosco_ds'; // Confirme o caminho
import styles from './header_ds.module.css'; // Importar CSS Module

const Example = dynamic(() => import('@/components/tremor/area-chart-15'), {
  ssr: false,
});

// --- Constantes de Configuração (Mover para arquivo .config.js ou similar idealmente) ---
const HERO_IMAGE_URL = Photovoltaic;
const FALE_CONOSCO_BTN_CLASS = 'btn btn-outline-light btn-lg mb-3'; // Classe do botão "Falar com Especialista"
const FALE_CONOSCO_MESSAGE = 'Olá, quero falar com especialista.';
const FALE_CONOSCO_TAG_HERO = '#solNaEconomia';
const FALE_CONOSCO_TAG_RESULT = '#calculaEconomia'; // Tag base para resultado
const MIN_MONTHLY_COST = 400;

// --- Componente Principal ---
function HeaderDS() {
  const [showResultModal, setShowResultModal] = useState(false);
  const [calculando, setCalculando] = useState(false);
  const [showMinimumHint, setShowMinimumHint] = useState(false);
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

  // Limpa input ao fechar modal
  useEffect(() => {
    if (!showResultModal) {
      setInputValue('');
      setCalculationResult(null); // Limpa resultado também
      setShowMinimumHint(false);
    }
  }, [showResultModal]);

  // Handler do Input de Custo
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '').substring(0, 11); // Permite apenas dígitos

    if (!rawValue || Number(rawValue) === 0) {
      setInputValue('');
      setShowMinimumHint(false);
      return;
    }

    setInputValue(rawValue); // Atualiza o estado da string do input

    if (parseInt(rawValue, 10) / 100 >= MIN_MONTHLY_COST) {
      setShowMinimumHint(false);
    }
  };

  // Função para obter o valor numérico do input
  const getNumericCost = () => {
    if (!inputValue) return 0;
    const num = parseInt(inputValue, 10);
    return num / 100; // Divide por 100 para obter o valor em Reais (ex: 12345 -> 123.45)
  };

  const numericCost = getNumericCost();
  const hasTypedValue = inputValue.length > 0;
  const isBelowMinimumCost = numericCost > 0 && numericCost < MIN_MONTHLY_COST;

  // Formata o valor numérico para exibição no input
  const formatValueForInput = (rawStringValue) => {
    if (!rawStringValue) return '';
    const num = parseInt(rawStringValue, 10);
    if (isNaN(num) || num === 0) return '';
    return currencyFormatter.format(num / 100);
  };

  // Fecha o modal de input, calcula e abre o modal de resultado
  const handleCalculateAndShowResult = async () => {
    const numericCost = getNumericCost();
    trackEvent('calculator_submit_attempt', {
      location: 'hero_section',
      monthly_cost: numericCost,
    });

    if (numericCost < MIN_MONTHLY_COST || numericCost > 999999999.99) {
      if (numericCost < MIN_MONTHLY_COST) {
        setShowMinimumHint(true);
      }

      trackEvent('calculator_validation_error', {
        location: 'hero_section',
        reason:
          numericCost < MIN_MONTHLY_COST ? 'below_minimum' : 'out_of_range',
        monthly_cost: numericCost,
      });
      return;
    } // Não calcula se o valor for inválido

    setCalculando(true);
    setCalculationResult(null); // Limpa resultado anterior

    // Simula um pequeno atraso para o cálculo (pode remover se o cálculo for rápido)
    // ou mantenha para melhor UX visual do spinner
    await new Promise((resolve) => setTimeout(resolve, 600));

    const result = calcularEconomiaSolar(numericCost); // Chama a função de cálculo refatorada
    setCalculationResult(result);

    setCalculando(false);
    if (!result.error) {
      trackEvent('calculator_result_generated', {
        location: 'hero_section',
        monthly_cost: numericCost,
        payback_years: result.payback,
      });
      setShowResultModal(true);
    } else {
      trackEvent('calculator_result_error', {
        location: 'hero_section',
        reason: result.error,
      });
      // Poderia mostrar um alerta de erro aqui
      //console.error("Erro no cálculo:", result.error);
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
        <section id="home" className={styles.hero}>
          <div className="position-relative container">
            <div className="row">
              <div className={`col-lg-6 ${styles.textContainer}`}>
                <h1 className="display-4 fw-bold mb-4">
                  Transforme o Sol do Rio de Janeiro em Economia Real com
                  Energia Solar
                </h1>
                <h2 className="lead mb-4">
                  Reduza a conta de luz da sua casa, empresa ou condomínio em
                  até 95% e proteja-se dos aumentos de tarifa.
                </h2>
              </div>
              <div className={`col-lg-6 ${styles.calculatorContainer}`}>
                <div className={styles.calculatorInline}>
                  <label
                    htmlFor="valor-consumo"
                    className={styles.calculatorCopy}
                  >
                    Informe o valor médio mensal da sua conta de energia
                    elétrica:
                  </label>

                  <div className="input-group mb-3">
                    <span
                      className={`input-group-text ${styles.inputGroupText}`}
                    >
                      R$
                    </span>
                    <input
                      ref={inputCustoMesRef}
                      type="text"
                      inputMode="numeric"
                      className={`form-control form-control-lg ${styles.currencyInput} ${
                        isBelowMinimumCost ? styles.inputWarning : ''
                      }`}
                      id="valor-consumo"
                      name="valor-consumo"
                      value={formatValueForInput(inputValue)}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                      placeholder="Digite o valor (mínimo R$ 400,00)"
                      autoComplete="off"
                      aria-describedby="valor-consumo-feedback"
                    />
                  </div>

                  {showMinimumHint && hasTypedValue && isBelowMinimumCost && (
                    <div
                      id="valor-consumo-feedback"
                      className={styles.validationHint}
                      role="status"
                      aria-live="polite"
                    >
                      Para contas abaixo de R$ 400,00, nosso time comercial pode
                      indicar a melhor solução para o seu perfil.
                      <a
                        href="https://wa.me/5521999677722"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.validationHintLink}
                        onClick={() => trackWhatsAppClick('hero_minimum_hint')}
                      >
                        Falar com o atendimento
                      </a>
                    </div>
                  )}

                  <Row className={`g-2 ${styles.btnRow}`}>
                    {/* Botão Calcular Economia */}
                    <Col xs={12} sm="auto" className={styles.btnCol}>
                      <Button
                        variant="warning"
                        className={`btn ${styles.heroButtonPrimary}`}
                        onClick={handleCalculateAndShowResult}
                        disabled={calculando || numericCost < MIN_MONTHLY_COST}
                      >
                        {calculando ? (
                          <>
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Calculando...
                          </>
                        ) : (
                          <>
                            <FaIcon
                              iconClass="fas fa-calculator"
                              className="me-2"
                              aria-label="Calcular Economia"
                              aria-hidden="true"
                            />
                            Calcular Economia
                          </>
                        )}
                      </Button>
                    </Col>
                    {/* Botão Falar com um Especialista */}
                    <Col xs={12} sm="auto" className={styles.btnCol}>
                      <Button
                        variant="light"
                        as="a"
                        href="https://wa.me/5521999677722"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${styles.heroButtonSecondary}`}
                        onClick={() => trackWhatsAppClick('hero_section')}
                      >
                        <FaIcon
                          iconClass="fas fa-headset"
                          className="me-2"
                          aria-label="Falar com um Especialista"
                          aria-hidden="true"
                        />
                        Falar com um Especialista
                      </Button>
                      {/* <div
                      // className={`col-lg-4 text-lg-end ${styles.buttonContainer}`}
                      // className={`btn ${styles.heroButtonSecondary}`}
                      >
                        <FaleConoscoDS
                          // Passando as classes CSS (incluindo a customizada do module)
                          //   textClassButton={buttonClasses}
                          textClassButton={`${FALE_CONOSCO_BTN_CLASS} ${styles.heroButtonSecondary}`}
                          // Mantém as outras props
                          textMessage="Olá, quero falar com especialista sobre avaliação gratuita." // Mensagem pode ser mais específica
                          textTag="#avaliacaoGratuitaCTA" // Tag pode ser mais específica
                          trackingContext="cta_section"
                        />
                      </div> */}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          ''
          <div className={styles.heroBackground}>
            <Image
              alt="Fazenda de painéis solares" // Alt text descritivo
              src={HERO_IMAGE_URL}
              fill // Ocupa o container pai
              style={{ objectFit: 'cover' }} // Cobre a área
              quality={65} // Qualidade da imagem
              fetchPriority="high"
              priority
              loading="eager" // LCP: carregar eager para melhorar LCP
            />
            <div className={styles.heroOverlay}></div> {/* Overlay opcional */}
          </div>
        </section>
      </header>{' '}
      {/* --- Modal Resultado --- */}
      <Modal
        show={showResultModal}
        onHide={handleHideResult}
        centered
        size="xl"
      >
        {' '}
        {/* Tamanho maior para o gráfico */}
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className="w-100">
            <div className="position-relative d-flex align-items-center w-100">
              <Image src={Logo} alt="Logo DEV Solar" width={140} height={38} />
              <span
                className="position-absolute start-50 translate-middle-x text-center"
                style={{ fontSize: '2rem', fontWeight: '500' }}
              >
                CÁLCULO DE INVESTIMENTO
              </span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBodyResult}>
          {calculando ? ( // Mostra spinner se estiver recalculando por algum motivo (pouco provável aqui)
            <div className="p-5 text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Carregando...</span>
              </Spinner>
            </div>
          ) : calculationResult && !calculationResult.error ? ( // Verifica se há resultado e não há erro
            <>
              <Row className="mb-4 text-center">
                <Col md={4}>
                  <div className={styles.resultHighlight}>
                    <span className={styles.resultLabel}>
                      Investimento Estimado
                    </span>
                    <span className={styles.resultValue}>
                      R${' '}
                      {currencyFormatter.format(
                        calculationResult.investimentoEstimado,
                      )}
                    </span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.resultHighlight}>
                    <span className={styles.resultLabel}>Payback Estimado</span>
                    <span className={styles.resultValue}>
                      {calculationResult.text_payback}
                    </span>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.resultHighlight}>
                    <span className={styles.resultLabel}>
                      Potência do Sistema
                    </span>
                    <span className={styles.resultValue}>
                      {currencyFormatter.format(
                        calculationResult.potenciaEstimadaKwp,
                      )}{' '}
                      kWp
                    </span>
                  </div>
                </Col>
              </Row>
              {/* Passa os dados corretos (dataResume) para o gráfico */}
              <div className={styles.chartContainer}>
                {/* <h5 className={styles.chartTitle}>
                  Projeção de Economia Acumulada vs Custo Evitado (
                  {calculationResult.projecao} Anos)
                </h5> */}
                <Example dataProject={calculationResult} />
              </div>
              <p className={styles.chartDisclaimer}>
                *Valores simulados e projeções são estimativas e podem variar
                conforme o caso, para um valor mais preciso fale com
                especialista.
              </p>
            </>
          ) : (
            <p className="text-danger p-4 text-center">
              Não foi possível gerar o resultado. Verifique o valor informado.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="secondary" onClick={handleHideResult}>
            Fechar
          </Button>
          <FaleConoscoDS
            textClassButton={`btn ${styles.heroButtonPrimaryFC}`}
            textMessage={`Olá, vi minha simulação de economia, meu custo médio mensal é de R$ ${currencyFormatter.format(calculationResult && calculationResult.custoMensalInformado)} e quero falar com especialista.`}
            textTag={`${FALE_CONOSCO_TAG_RESULT}`} // Tag com o valor
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HeaderDS;
