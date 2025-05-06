import FooterDS from "../components/devsolar/estructure/body/footer/footer_ds";
import HeaderDS from "../components/devsolar/estructure/body/header/header_ds";
import NavDS from "../components/devsolar/estructure/body/header/nav_ds";
import BenefitsSectionDS from "../components/devsolar/estructure/body/main/benefits_section_ds";
import ContactSectionDS from "../components/devsolar/estructure/body/main/contact_section_ds";
import CTASectionDS from "../components/devsolar/estructure/body/main/cta_section_ds";
import FAQSectionDS from "../components/devsolar/estructure/body/main/faq_section_ds";
import LocationSectionDS from '../components/devsolar/estructure/body/main/location_ds';
import CalculatorSectionDS from "../components/devsolar/estructure/body/main/modalities_section_ds";
import ParceirosFinanceirasSectionDS from '../components/devsolar/estructure/body/main/parceiros_financeiras_ds';
import SuccessStoriesDS from '../components/devsolar/estructure/body/main/success_stories_ds';


// Metadados ESPECÍFICOS para esta página (sobrescrevem ou complementam o layout.js)
export const metadata = {
    title: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro', // Sobrescreve o título padrão
    description: 'Instalação de painéis solares para residências, condomínios e empresas no RJ. Reduza sua conta de luz em até 95%. Orçamento gratuito!', // Descrição específica
    alternates: {
        canonical: '/', // Canonical para a homepage
    },
    openGraph: {
        title: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro', // Título OG específico
        description: 'Economia garantida e sustentabilidade com energia solar. Peça seu orçamento.', // Descrição OG específica
        url: '/', // URL OG específica
        type: 'website',
        //fb:app_id: '61562778810789',
        images: [ // Pode usar uma imagem OG específica para a home
            {
                url: './images/logo_sm.png', // Caminho relativo à pasta PUBLIC
                width: 1200,
                height: 630,
                alt: 'A DEV Solar atua nas modalidades de produção de energia própria, compartilhada e para negócios',
            },
        ],
    },
    twitter: { // Pode sobrescrever twitter tags também se necessário
        title: 'DEV Solar - Energia Solar Fotovoltaica no Rio de Janeiro',
        description: 'Economia garantida e sustentabilidade com energia solar. Peça seu orçamento.',
        images: ['./images/logo_sm.png'],
    },
};


export default function HomePage() {
    return (
        <>
            <noscript>
                <p>Habilite o JavaScript para este site funcionar corretamente.</p>
                <p>You need to enable JavaScript to run this app.</p>
            </noscript>
            {/* Navegator */}
            <NavDS />

            {/* Hero Section */}
            <HeaderDS />

            <main>
                <article>
                    {/* Benefits Section */}
                    <BenefitsSectionDS />

                    {/* Calculator Section */}
                    <CalculatorSectionDS />

                    {/* Success Stories */}
                    <SuccessStoriesDS />

                    {/* FAQ Section */}
                    <FAQSectionDS />

                    {/* About Section */}
                    <section id="sobre"></section>

                    {/* Location Section */}
                    <LocationSectionDS />

                    {/* Partners Section */}
                    <ParceirosFinanceirasSectionDS />

                    {/* Terms Section */}
                    <section id="termos-de-uso"></section>

                    {/* Policy Section */}
                    <section id="politica-de-privacidade"></section>

                    {/* CTA Section */}
                    <CTASectionDS />

                    {/* Contact Section */}
                    <ContactSectionDS />
                </article>
            </main>

            {/* Footer Section */}
            <FooterDS />
        </>
    );
}
