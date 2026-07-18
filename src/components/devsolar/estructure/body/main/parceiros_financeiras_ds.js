'use client';

import styles from './parceiros_financeiras_ds.module.css'; // Criaremos este CSS
import PartnerCard from './partner_card_ds'; // Ajuste o caminho se necessário

import Bv from '@/assets/bv.webp';
import Canadian from '@/assets/canadian.webp';
import Intelbras from '@/assets/intelbras.webp';
import Santander from '@/assets/santander.webp';
import Solagora from '@/assets/solagora.webp';
import Weg from '@/assets/weg.webp';

// --- Dados de Exemplo (Substitua pelos seus dados reais) ---
const fornecedoresData = [
    {
        id: 'f1',
        name: 'Intelbras Solar',
        logoUrl: Intelbras, // Coloque os logos em public/images/logos/
        description: 'Soluções completas em equipamentos para energia solar fotovoltaica.',
    },
    {
        id: 'f2',
        name: 'WEG Solar',
        logoUrl: Weg,
        description: 'Tecnologia e eficiência em inversores, módulos e kits solares.',
    },
    {
        id: 'f3',
        name: 'Canadian Solar',
        logoUrl: Canadian,
        description: 'Módulos fotovoltaicos de alta qualidade e performance global.',
    },
    // Adicione mais fornecedores...
];

const financeirasData = [
    {
        id: 'fin1',
        name: 'Santander (Financiamentos)',
        logoUrl: Santander,
        description: 'Linhas de crédito especiais para projetos de energia solar.',
    },
    {
        id: 'fin2',
        name: 'BV Financeira',
        logoUrl: Bv,
        description: 'Facilidade e agilidade no financiamento do seu sistema solar.',
    },
    {
        id: 'fin3',
        name: 'Sol Agora (Creditas)',
        logoUrl: Solagora,
        description: 'Financiamento solar rápido, digital e sem burocracia.',
    },
    // Adicione mais financeiras...
];
// --- Fim dos Dados de Exemplo ---


function ParceirosFinanceirasSectionDS() {
    return (
        <>
            {/* Parceiros e Financeiras Section */}
            {/* Use a classe CSS Module ou a classe global 'section bg-light' */}
            <section id="parceiros" className={`${styles.sectionPartners}`}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={`${styles.sectionTitle} fw-bold`}>Conheça Nossos Parceiros e Financeiras</h2>
                        <p className={`${styles.sectionSubtitle} lead`}>Somos uma rede que colabora para o benefício dos nossos clientes.</p>
                    </div>

                    {/* Subseção Fornecedores */}
                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Nossos Fornecedores</h3>
                        <div className={styles.partnerGrid}>
                            {fornecedoresData.map(partner => (
                                <PartnerCard
                                    key={partner.id}
                                    logoUrl={partner.logoUrl}
                                    name={partner.name}
                                    description={partner.description}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Subseção Financeiras */}
                    <div className={styles.subsection}>
                        <h3 className={styles.subsectionTitle}>Nossas Financeiras</h3>
                        <div className={styles.partnerGrid}>
                            {financeirasData.map(partner => (
                                <PartnerCard
                                    key={partner.id}
                                    logoUrl={partner.logoUrl}
                                    name={partner.name}
                                    description={partner.description}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default ParceirosFinanceirasSectionDS;