'use client';

import { useEffect } from 'react';

import { smoothScrollTo } from '@/lib/smoothScroll';

import FooterDS from '../components/devsolar/estructure/body/footer/footer_ds';
import HeaderDS from '../components/devsolar/estructure/body/header/header_ds';
import NavDS from '../components/devsolar/estructure/body/header/nav_ds';
// import DevSolarAboutSectionDS from '../components/devsolar/estructure/body/main/devsolar_abaut';
// import AboutDevSolar from '../components/devsolar/estructure/body/main/abaut_devsolar_section_ds';
import BenefitsSectionDS from '../components/devsolar/estructure/body/main/benefits_section_ds';
import ContactSectionDS from '../components/devsolar/estructure/body/main/contact_section_ds';
import CTASectionDS from '../components/devsolar/estructure/body/main/cta_section_ds';
import FAQSectionDS from '../components/devsolar/estructure/body/main/faq_section_ds';
import LocationSectionDS from '../components/devsolar/estructure/body/main/location_ds';
import ModalitiesSectionDS from '../components/devsolar/estructure/body/main/modalities_section_ds';
import ParceirosFinanceirasSectionDS from '../components/devsolar/estructure/body/main/parceiros_financeiras_ds';
import SuccessStoriesDS from '../components/devsolar/estructure/body/main/success_stories_ds';

const PENDING_HOME_SECTION_KEY = 'pendingHomeSection';

export default function HomePageClient() {
  // Scroll para o topo ao carregar ou recarregar a página
  useEffect(() => {
    const pendingHash = window.sessionStorage.getItem(PENDING_HOME_SECTION_KEY);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    };

    const scrollToPendingSection = (hash, attemptsLeft = 8) => {
      const targetId = hash.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 70;
        const targetTop = targetElement.getBoundingClientRect().top;
        const top = targetTop + window.scrollY - (navbarHeight + 20);

        smoothScrollTo(top);
        window.history.replaceState(null, '', hash);
        window.sessionStorage.removeItem(PENDING_HOME_SECTION_KEY);
        return;
      }

      if (attemptsLeft > 0) {
        window.setTimeout(() => {
          scrollToPendingSection(hash, attemptsLeft - 1);
        }, 120);
      } else {
        window.sessionStorage.removeItem(PENDING_HOME_SECTION_KEY);
      }
    };

    // Adiciona delay para garantir renderização completa
    const scrollTimer = window.setTimeout(() => {
      scrollToTop();

      if (pendingHash) {
        window.setTimeout(() => {
          scrollToPendingSection(pendingHash);
        }, 150);
      }
    }, 100);

    return () => window.clearTimeout(scrollTimer);
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
        {/* <AboutDevSolar /> {/* About DevSolar Section */}
        {/* <DevSolarAboutSectionDS /> {/*  About Section */}
        {/* <GarantiasSectionDS />  Guarantees Section */}
        <LocationSectionDS /> {/* Location Section */}
        {/* <AppointmentSectionDS /> {/* Appointment Section */}
        <ParceirosFinanceirasSectionDS /> {/* Partners Section */}
        <CTASectionDS /> {/* CTA Section */}
        <ContactSectionDS /> {/* Contact Section */}
      </article>
      <FooterDS /> {/* Footer Section */}
    </main>
  );
}
