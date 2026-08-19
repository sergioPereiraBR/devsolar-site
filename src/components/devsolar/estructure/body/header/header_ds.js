'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Logo from '@/assets/logo_sm.webp'; // Importa a imagem do logo pequeno
import Photovoltaic from '@/assets/photovoltaic.webp';
import { calcularEconomiaSolar } from '@/utils/solarCalculations';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap'; // Adicionar Button, Spinner

import { trackEvent, trackWhatsAppClick } from '@/lib/analytics';

import CallWhatsapp from '@/components/devsolar/utility/call_whatsapp/CallWhatsapp';
import { FaIcon } from '@/components/devsolar/utility/fa-icon';

import styles from './header_ds.module.css'; // Importar CSS Module
import ModalCapturaLead from './ModalCapturaLead';

const Example = dynamic(() => import('@/components/tremor/area-chart-15'), {
  ssr: false,
  loading: () => (
    <Spinner animation="border" role="status" className="d-block mx-auto" />
  ),
});

// --- Constantes de Configuração (Mover para arquivo .config.js ou similar idealmente) ---
const HERO_IMAGE_URL = Photovoltaic;
const FALE_CONOSCO_BTN_CLASS = 'btn btn-outline-light btn-lg mb-3'; // Classe do botão "Falar com Especialista"
const FALE_CONOSCO_MESSAGE = 'Olá, quero falar com especialista.';
const FALE_CONOSCO_TAG_HERO = '#solNaEconomia';
const FALE_CONOSCO_TAG_RESULT = '#calculaEconomia'; // Tag base para resultado
const MIN_MONTHLY_COST = 400;

function getMonthlyBillRange(monthlyCost) {
  if (monthlyCost < 500) return '0_499';
  if (monthlyCost < 1000) return '500_999';
  if (monthlyCost < 2000) return '1000_1999';
  if (monthlyCost < 3000) return '2000_2999';
  return '3000_plus';
}

// --- Componente Principal ---
function HeaderDS() {
  const [showResultModal, setShowResultModal] = useState(false);
  const [calculando, setCalculando] = useState(false);
  const [showMinimumHint, setShowMinimumHint] = useState(false);
  // Estado do Input (Controlado)
  const [inputValue, setInputValue] = useState(''); // Valor como string para o input
  const inputCustoMesRef = useRef(null);
  const hintTimerRef = useRef(null);

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

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
      }
    };
  }, []);

  // Handler do Input de Custo
  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '').substring(0, 11); // Permite apenas dígitos

    if (!rawValue || Number(rawValue) === 0) {
      setInputValue('');
      setShowMinimumHint(false);
      return;
    }

    setInputValue(rawValue); // Atualiza o estado da string do input
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
  const isOriginalHintVisible =
    showMinimumHint && (!hasTypedValue || isBelowMinimumCost);
  const isAlternateHintVisible = !isOriginalHintVisible;

  // Formata o valor numérico para exibição no input
  const formatValueForInput = (rawStringValue) => {
    if (!rawStringValue) return '';
    const num = parseInt(rawStringValue, 10);
    if (isNaN(num) || num === 0) return '';
    return currencyFormatter.format(num / 100);
  };

  const syncMonthlyValueToState = () => {
    const numericCost = getNumericCost();
    setValorConta(currencyFormatter.format(numericCost));
    return numericCost;
  };

  // Fecha o modal de input, calcula e abre o modal de resultado
  const handleCalculateAndShowResult = async () => {
    const numericCost = syncMonthlyValueToState();
    trackEvent('calculator_submit_attempt', {
      location: 'hero_section',
      form_type: 'calculator',
      monthly_cost: numericCost,
      monthly_bill_range: getMonthlyBillRange(numericCost),
    });

    if (numericCost < MIN_MONTHLY_COST || numericCost > 999999999.99) {
      if (numericCost < MIN_MONTHLY_COST) {
        setShowMinimumHint(true);
        if (hintTimerRef.current) {
          clearTimeout(hintTimerRef.current);
        }
        hintTimerRef.current = setTimeout(() => {
          setShowMinimumHint(false);
        }, 7000);
      }

      trackEvent('calculator_validation_error', {
        location: 'hero_section',
        form_type: 'calculator',
        reason:
          numericCost < MIN_MONTHLY_COST ? 'below_minimum' : 'out_of_range',
        failed_field: 'monthly_cost',
        monthly_cost: numericCost,
        monthly_bill_range: getMonthlyBillRange(numericCost),
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
        location: 'calculator_hero',
        section: 'main',
        form_type: 'calculator',
        monthly_cost: numericCost,
        monthly_bill_range: getMonthlyBillRange(numericCost),
        property_type: 'residential',
        status: 'success',
        payback_years: result.payback,
      });
      setShowResultModal(true);
    } else {
      trackEvent('calculator_result_error', {
        location: 'hero_section',
        form_type: 'calculator',
        reason: result.error,
        failed_field: 'monthly_cost',
        monthly_bill_range: getMonthlyBillRange(numericCost),
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

  // Previne envio com Enter no input de custo e mantém o fluxo de lead
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAbrirCalculadora(e);
    }
  };

  // --- Captura Leads ---
  const [valorConta, setValorConta] = useState('');
  const [leadData, setLeadData] = useState(null);
  const [showModalLead, setShowModalLead] = useState(false);

  // Manipula o clique no botão "VER MEU RELATÓRIO DE RENTABILIDADE"
  const handleAbrirCalculadora = (e) => {
    e?.preventDefault?.();

    const numericCost = syncMonthlyValueToState();
    if (numericCost < MIN_MONTHLY_COST || numericCost > 999999999.99) {
      if (numericCost < MIN_MONTHLY_COST) {
        setShowMinimumHint(true);
        if (hintTimerRef.current) {
          clearTimeout(hintTimerRef.current);
        }
        hintTimerRef.current = setTimeout(() => {
          setShowMinimumHint(false);
        }, 7000);
      }
      return;
    }

    setShowModalLead(true);
  };

  // Executado quando o lead preenche os dados com sucesso
  const handleLeadCapturado = async (dadosLead) => {
    setShowModalLead(false);
    setLeadData(dadosLead);

    // AQUI: Dispare o evento para seu Analytics (Google Tag Manager, Meta Pixel)
    // Ex: window.gtag('event', 'generate_lead', { ... });

    const numericCost = syncMonthlyValueToState();
    await handleCalculateAndShowResult();

    // AQUI: Abra o modal com o gráfico de rentabilidade / PDF gerado
    // alert(
    //   `Sucesso! Lead ${dadosLead.nome} capturado. Exibindo relatório de rentabilidade...`,
    // );
  };

  const leadDisplayName = leadData?.nome || 'Não informado';
  const leadMonthlyValue =
    leadData?.valorContaMensal || valorConta || 'Não informado';
  const leadInstallationForecast = leadData?.previsaoTexto || 'Não informada';

  return (
    <>
      <header>
        {/* Hero Section */}
        <section id="home" className={styles.hero}>
          <div className="position-relative container mx-auto">
            <div className="row">
              <div className={`col-lg-6 ${styles.textContainer}`}>
                <h1 className="display-4 fw-bold mb-4">
                  Reduza até 85% da sua Conta de Luz com Energia Solar
                </h1>
                <h2 className="lead mb-4">
                  Proteja sua casa, condomínio ou empresa no Rio de Janeiro
                  contra aumentos tarifários. Reduza até 85% na conta de luz.
                  Solicite um orçamento!
                </h2>
              </div>
              <div className={`col-lg-6 ${styles.calculatorContainer}`}>
                <div className={styles.calculatorInline}>
                  {/* <div id="calculator-icon" className={styles.calculatorIcon}>
                    <FaIcon
                      iconClass="fas fa-calculator"
                      className={styles['figura-pulsante']}
                      style={{
                        fontSize: '22rem',
                        width: '22rem',
                        height: '22rem',
                      }}
                      aria-label="Calcular Economia"
                      aria-hidden="true"
                    />
                  </div> */}

                  <div className={styles.calculatorWrapper}>
                    <h3>SIMULE SUA ECONOMIA AGORA</h3>
                  </div>

                  <label
                    htmlFor="valor-consumo"
                    className={styles.calculatorCopy}
                  >
                    Quanto você paga de luz por mês?
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
                      placeholder="Digite o valor da conta de luz"
                      autoComplete="off"
                      aria-describedby="valor-consumo-feedback"
                    />
                  </div>

                  <Row className={styles.btnRow} style={{ gap: '6px' }}>
                    {/* Botão Calcular Economia */}
                    <Col className={styles.btnCol}>
                      <Button
                        variant="primary"
                        className={`btn w-100 ${styles.heroButtonPrimary}`}
                        //className="btn btn-warning w-100 fw-bold py-2 text-uppercase"
                        style={{ width: '100%' }}
                        //onClick={handleCalculateAndShowResult}
                        onClick={handleAbrirCalculadora}
                        disabled={calculando}
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
                              className="heroIconPrimary me-2"
                              aria-label="Calcular Economia"
                              aria-hidden="true"
                            />
                            VER MINHA ECONOMIA
                          </>
                        )}
                      </Button>
                    </Col>
                    {/* Botão Falar com um Especialista * /}
                    <Col
                      xs={12}
                      md={6}
                      className={styles.btnCol}
                      style={{
                        padding: 0,
                        flex: '0 0 calc(50% - 3px)',
                        maxWidth: 'calc(50% - 3px)',
                      }}
                    >
                      <Button
                        variant="light"
                        as="a"
                        href="https://api.whatsapp.com/send?phone=5521999677722"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={`btn ${styles.heroButtonSecondary}`}
                        onClick={() => trackWhatsAppClick('hero_section')}
                      >
                        <FaIcon
                          iconClass="fas fa-headset"
                          className="me-2 heroIconSecondary"
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
                      </div> * /}
                    </Col>*/}
                  </Row>

                  <div className={styles.validationHintWrapper}>
                    <div
                      id="valor-consumo-feedback"
                      className={`${styles.validationHint} ${
                        isOriginalHintVisible ? '' : styles.validationHintHidden
                      }`}
                      role="status"
                      aria-live="polite"
                      aria-hidden={!isOriginalHintVisible}
                    >
                      Para contas abaixo de R$ 400,00, nosso time comercial pode
                      indicar a melhor solução para sua conta de luz.
                      <a
                        href="https://api.whatsapp.com/send?phone=5521999677722&text=Ol%C3%A1!+Visitei+seu+site+e+quero+saber+como+economizar+com+Energia+Solar+com+um+sistema+adequado+para+minha+conta+de+luz."
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={styles.validationHintLink}
                        onClick={() => trackWhatsAppClick('hero_minimum_hint')}
                      >
                        Falar com o atendimento
                      </a>
                    </div>

                    <div
                      className={`${styles.validationHint} ${styles.validationHintAlt} ${
                        isAlternateHintVisible
                          ? ''
                          : styles.validationHintHidden
                      }`}
                      role="status"
                      aria-live="polite"
                      aria-hidden={!isAlternateHintVisible}
                    >
                      Parcelas que se pagam com a própria economia de luz com
                      várias formas de financiamento e carência de até 120 dias.
                      <a
                        href="https://api.whatsapp.com/send?phone=5521999677722&text=Ol%C3%A1!+Visitei+seu+site+e+quero+saber+como+economizar+com+Energia+Solar+com+um+sistema+adequado+para+minha+conta+de+luz."
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={styles.validationHintLink}
                        onClick={() => trackWhatsAppClick('hero_minimum_hint')}
                      >
                        Falar com o atendimento
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ''
          {/* <div className={styles.heroNotice}>
            <div className={styles.heroNoticeInner}>
              <p className={styles.heroNoticeText}>
                Copyright Notice: © Dev Solar, suas entidades relacionadas e
                prepostos. Todos os direitos reservados. Conheça nossos Termos e
                Condições de Uso do Site Dev Solar. DEV Eficiência Energética
                Ltda. Fale conosco pelo WhatsApp. Av. Jambeiro, 474 Loja C, Vila
                Valqueire - Rio de Janeiro - RJ Cep: 21330-300 CNPJ
                53.538.425/0001-15. Rápida** Turbo: Pedidos aprovados entre 10h
                e 17h, serão entregues em até 4h (exceto sábados, domingos e
                feriados). Rápida: Pedidos com os pagamentos aprovados até as
                10h, serão entregues no mesmo dia e pedidos com os pagamentos
                aprovados após as 10h serão entregues no dia seguinte (exceto
                domingos e feriados). *O valor do frete para o turbo é R$ 850,00
                e para a rápida é R$ 999,99.* *Essa condição ainda não estará
                disponível em todas as lojas.* *Compre pelo Whatsapp e ganhe 10%
                off nas compras acima de R$ 20000. Válido para produtos vendidos
                e entregues pela Dev Solar. Desconto não será aplicado na compra
                de inversores, painéis solares, baterias e itens em promoção.*
                Dev Solar Pay: desconto de 10% para compras no site e no app,
                produtos vendidos e entregues pela Dev Solar, válido para
                primeira compra realizada com Dev Solar Pay, levando 5 Kit's
                solares ou mais da categoria bateria, painéis, inversores e
                cabos, ou em valor acima de R$ 30k. Desconto não válido para
                compra de manutenção dos eletrônicos, limpeza de painéis e itens
                em promoção. Descontos não cumulativos.
              </p>
            </div>
          </div> */}
          <div className={styles.heroBackground}>
            <picture>
              <source
                media="(max-width: 480px)"
                srcSet="/assets/photovoltaic-400.webp"
                width={400}
                height={225}
              />
              <source
                media="(max-width: 991px)"
                srcSet="/assets/photovoltaic-800.webp"
                width={800}
                height={450}
              />
              <source
                media="(max-width: 1599px)"
                srcSet="/assets/photovoltaic-1200.webp"
                width={1200}
                height={675}
              />
              <img
                alt="Fazenda de painéis solares"
                src="/assets/photovoltaic-1920.webp"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="sync"
                loading="eager"
                // decoding="async"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </picture>
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
        fullscreen="sm-down"
      >
        {' '}
        {/* Tamanho maior para o gráfico */}
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className="w-100">
            <div className={styles.modalTitleRow}>
              <Image
                src={Logo}
                alt="Logo DEV Solar"
                width={140}
                height={38}
                className={styles.modalLogo}
              />
              <span className={styles.modalTitleText}>Rentabilidade</span>
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
              <Row className="mb-2 text-center">
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
          <CallWhatsapp
            className={`btn ${styles.heroButtonPrimaryFC}`}
            label="Fale com um Especialista"
            message={`Olá! 👋

Vi minha simulação de economia no site, meu custo mensal é de R$ ${leadMonthlyValue} e quero falar com especialista ✅

📌 Nome: ${leadDisplayName}
📌 Valor da conta mensal: R$ ${leadMonthlyValue}
📌 Previsão para instalar: ${leadInstallationForecast}`}
            onClick={() => trackWhatsAppClick('hero_result_cta')}
          />
        </Modal.Footer>
      </Modal>
      {/* Modal de Captura */}
      <ModalCapturaLead
        show={showModalLead}
        handleClose={() => setShowModalLead(false)}
        valorConta={valorConta}
        onSuccess={handleLeadCapturado}
      />
    </>
  );
}

export default HeaderDS;
