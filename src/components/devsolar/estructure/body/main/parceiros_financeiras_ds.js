'use client';

import Bv from '@/assets/bv.webp';
import Canadian from '@/assets/canadian.webp';
import Intelbras from '@/assets/intelbras.webp';
import Santander from '@/assets/santander.webp';
import Solagora from '@/assets/solagora.webp';
import Weg from '@/assets/weg.webp';

import styles from './parceiros_financeiras_ds.module.css'; // Criaremos este CSS
import PartnerCard from './partner_card_ds'; // Ajuste o caminho se necessário

// --- Dados de Exemplo (Substitua pelos seus dados reais) ---
const fornecedoresData = [
  {
    id: '#fornecedor-intelbras',
    id_service: '#produtos-intelbras',
    name: 'Intelbras Solar',
    logoUrl: Intelbras, // Coloque os logos em public/images/logos/
    description:
      'Soluções completas em equipamentos para energia solar fotovoltaica.',
  },
  {
    id: '#fornecedor-weg',
    id_service: '#produtos-weg',
    name: 'WEG Solar',
    logoUrl: Weg,
    description:
      'Tecnologia e eficiência em inversores, módulos e kits solares.',
  },
  {
    id: '#fornecedor-canadian',
    id_service: '#produtos-canadian',
    name: 'Canadian Solar',
    logoUrl: Canadian,
    description:
      'Módulos fotovoltaicos de alta qualidade e performance global.',
  },
  // Adicione mais fornecedores...
];

const financeirasData = [
  {
    id: '#financeira-santander',
    id_service: '#financiamento-santander',
    name: 'Santander (Financiamentos)',
    logoUrl: Santander,
    description:
      'Linhas de crédito especiais para projetos de energia solar. Até 100% financiado.',
  },
  {
    id: '#financeira-bv',
    id_service: '#financiamento-bv',
    name: 'BV Financeira',
    logoUrl: Bv,
    description:
      'Facilidade e agilidade no financiamento do seu sistema solar. Até 120 dias para a 1ª parcela',
  },
  {
    id: '#financeira-solagora',
    id_service: '#financiamento-solagora',
    name: 'Sol Agora (Creditas)',
    logoUrl: Solagora,
    description:
      'Financiamento solar rápido. Aprovação 100% digital e sem burocracia',
  },
  // Adicione mais financeiras...
];

const formasPagamentoData = [
  {
    id: '#pag-pix',
    name: 'Pix',
    logoUrl: Santander,
    description:
      'Pagamento imediato, seguro e com confirmação instantânea para sua compra.',
  },
  {
    id: '#pag-boleto',
    name: 'Boleto Bancário',
    logoUrl: Bv,
    description:
      'Opção tradicional com vencimento definido e praticidade para o cliente.',
  },
  {
    id: '#pag-cartao',
    name: 'Cartão de Crédito',
    logoUrl: Solagora,
    description:
      'Parcelamento em até várias vezes, conforme a disponibilidade da operadora.',
  },
  // Adicione mais formas de pagamento...
];
// --- Fim dos Dados de Exemplo ---

function ParceirosFinanceirasSectionDS() {
  return (
    <>
      {/* Parceiros e Financeiras Section */}
      {/* Use a classe CSS Module ou a classe global 'section bg-light' */}
      <section id="parceiros" className={`${styles.sectionPartners}`}>
        <div className="container">
          <div className="mb-5 text-center">
            <h2 className={`${styles.sectionTitle} fw-bold`}>
              Conheça nossos parceiros, financeiras e formas de pagamento
            </h2>
            <p className={`${styles.sectionSubtitle} lead`}>
              Somos uma rede que colabora para o benefício dos nossos clientes.
            </p>
          </div>

          {/* Subseção Fornecedores */}
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Nossos fornecedores</h3>
            <div className={styles.partnerGrid}>
              {fornecedoresData.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  id={partner.id}
                  logoUrl={partner.logoUrl}
                  name={partner.name}
                  description={partner.description}
                />
              ))}
            </div>
          </div>

          {/* Subseção Financeiras */}
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Nossas financeiras</h3>
            <div className={styles.partnerGrid}>
              {financeirasData.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  id={partner.id}
                  logoUrl={partner.logoUrl}
                  name={partner.name}
                  description={partner.description}
                />
              ))}
            </div>
          </div>

          {/* Subseção Formas de Pagamento */}
          {/* <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Formas de pagamento</h3>
            <div className={styles.partnerGrid}>
              {formasPagamentoData.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  id={partner.id}
                  logoUrl={partner.logoUrl}
                  name={partner.name}
                  description={partner.description}
                />
              ))}
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default ParceirosFinanceirasSectionDS;
