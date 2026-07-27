'use client';

import { useEffect } from 'react';

import FooterDS from '../components/devsolar/estructure/body/footer/footer_ds';
import HeaderDS from '../components/devsolar/estructure/body/header/header_ds';
import NavDS from '../components/devsolar/estructure/body/header/nav_ds';
import BenefitsSectionDS from '../components/devsolar/estructure/body/main/benefits_section_ds';
import ContactSectionDS from '../components/devsolar/estructure/body/main/contact_section_ds';
import CTASectionDS from '../components/devsolar/estructure/body/main/cta_section_ds';
import FAQSectionDS from '../components/devsolar/estructure/body/main/faq_section_ds';
import LocationSectionDS from '../components/devsolar/estructure/body/main/location_ds';
import ModalitiesSectionDS from '../components/devsolar/estructure/body/main/modalities_section_ds';
import ParceirosFinanceirasSectionDS from '../components/devsolar/estructure/body/main/parceiros_financeiras_ds';
import SuccessStoriesDS from '../components/devsolar/estructure/body/main/success_stories_ds';

export default function HomePageClient() {
  // Scroll para o topo ao carregar ou recarregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" tabIndex={-1}>
      <NavDS /> {/* Navegator */}
      <HeaderDS /> {/* Hero Section */}
      <article>
        <BenefitsSectionDS /> {/* Benefits Section */}
        <ModalitiesSectionDS /> {/* Service Modalities Section */}
        <SuccessStoriesDS /> {/* Success Stories */}
        <FAQSectionDS /> {/* FAQ Section */}
        {/* About Section 
                    <section id="sobre"></section>*/}
        <LocationSectionDS /> {/* Location Section */}
        <ParceirosFinanceirasSectionDS /> {/* Partners Section */}
        {/* Terms Section
                    <section id="termos-de-uso"></section>

                    {/* Policy Section */}
        {/*
                    <section id="politica-de-privacidade"></section> */}
        <CTASectionDS /> {/* CTA Section */}
        <ContactSectionDS /> {/* Contact Section */}
      </article>
      <FooterDS /> {/* Footer Section */}
    </main>
  );
}
