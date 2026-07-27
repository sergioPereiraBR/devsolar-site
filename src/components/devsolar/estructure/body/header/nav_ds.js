'use client';

// Necessário pelos hooks
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import LogoSm from '@/assets/logo_sm.webp';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import { trackEvent } from '@/lib/analytics';
import { smoothScrollTo } from '@/lib/smoothScroll';

import { FaIcon } from '@/components/devsolar/utility/fa-icon';

import styles from './nav_ds.module.css'; // Importar CSS Module
import { navLinksData } from './nav_links_ds'; // Importar dados dos links

const LeadAccessModal = dynamic(() => import('./LeadAccessModal'), {
  ssr: false,
  loading: () => null, // LeadAccessModal é renderizado via state, não precisa de placeholder
});

const LOGO_URL = LogoSm.src;
const FOCUSABLE_SELECTOR = [
  '[data-tab-entry="true"]',
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function isVisibleFocusable(element) {
  if (!(element instanceof HTMLElement)) {
    return false;
  }

  if (element.getClientRects().length === 0) {
    return false;
  }

  const style = window.getComputedStyle(element);
  return style.visibility !== 'hidden' && style.display !== 'none';
}

function NavDS() {
  const [modalShow, setModalShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const resizeTimeoutRef = useRef(null); // Ref para armazenar timeout de resize

  // --- Lógica para Scroll Padding Dinâmico (otimizado para evitar reflow) ---
  const updateScrollPadding = useCallback(() => {
    // Usar requestAnimationFrame para agrupar leituras geométricas
    requestAnimationFrame(() => {
      if (navbarRef.current) {
        const navbarHeight = navbarRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          '--scroll-padding',
          `${navbarHeight + 20}px`,
        );
        document.documentElement.style.scrollPaddingTop = `${navbarHeight + 20}px`;
      } else {
        document.documentElement.style.setProperty('--scroll-padding', `90px`);
        document.documentElement.style.scrollPaddingTop = `90px`;
      }
    });
  }, []);

  // Debounced resize handler para evitar múltiplos reflows
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      updateScrollPadding();
    }, 150); // Debounce de 150ms
  }, [updateScrollPadding]);

  useEffect(() => {
    // Define o padding inicial
    updateScrollPadding();

    // Adiciona listener para redimensionamento (com debounce)
    window.addEventListener('resize', handleResize);

    // Função de limpeza
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      document.documentElement.style.removeProperty('--scroll-padding');
      document.documentElement.style.scrollPaddingTop = '';
    };
  }, [handleResize, updateScrollPadding]);

  const focusFirstSectionControl = useCallback((sectionElement) => {
    if (!sectionElement) {
      return false;
    }

    const focusableElements = Array.from(
      sectionElement.querySelectorAll(FOCUSABLE_SELECTOR),
    );

    const firstVisibleFocusable = focusableElements.find(isVisibleFocusable);
    if (!firstVisibleFocusable) {
      return false;
    }

    firstVisibleFocusable.focus({ preventScroll: true });
    return true;
  }, []);

  const focusFirstSectionControlWithRetry = useCallback(
    (sectionElement, retriesLeft = 8) => {
      if (focusFirstSectionControl(sectionElement) || retriesLeft <= 0) {
        return;
      }

      window.setTimeout(() => {
        focusFirstSectionControlWithRetry(sectionElement, retriesLeft - 1);
      }, 120);
    },
    [focusFirstSectionControl],
  );

  // --- Handlers ---
  const handleNavLinkClick = (e) => {
    const href = e.currentTarget?.getAttribute('href') || '';
    trackEvent('navigation_click', {
      location: 'navbar',
      target: href,
    });

    if (!href.includes('#')) {
      setExpanded(false);
      return;
    }

    e.preventDefault();
    const hash = href.slice(href.indexOf('#'));
    const targetId = hash.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Agrupar leituras geométricas em um requestAnimationFrame para evitar forced reflow
      requestAnimationFrame(() => {
        const navbarHeight = navbarRef.current?.offsetHeight || 70;
        const targetTop = targetElement.getBoundingClientRect().top;
        const top = targetTop + window.scrollY - (navbarHeight + 20);
        smoothScrollTo(top);

        window.history.replaceState(null, '', hash);
        window.setTimeout(() => {
          focusFirstSectionControlWithRetry(targetElement);
        }, 420);
      });
    }

    setExpanded(false);
  };

  const handleBrandClick = (e) => {
    e.preventDefault(); // Previne a navegação padrão para '#'
    trackEvent('navigation_click', {
      location: 'navbar_brand',
      target: '#home',
    });
    setExpanded(false);
    smoothScrollTo(0); // Scroll suave para o topo
  };

  const handleShowLoginModal = () => {
    trackEvent('modal_open', {
      location: 'navbar',
      modal_name: 'lead_access',
    });
    setModalShow(true);
    setExpanded(false); // Fecha o menu mobile ao abrir o modal
  };

  return (
    <>
      <Navbar
        ref={navbarRef} // Anexa a ref à Navbar
        expand="lg"
        // Usa classe do module OU mantém as classes Bootstrap/custom
        className={`${styles.navbarCustom} bg-body-tertiary navbar-light sticky-top bg-white py-2 shadow-sm`}
        expanded={expanded}
        onToggle={setExpanded} // Simplificado: passa diretamente o setExpanded
        collapseOnSelect // Fecha o menu automaticamente ao selecionar um Nav.Link (bom para mobile)
      >
        <Container className="py-0">
          {/* Link da Logo (scroll para o topo) */}
          <Navbar.Brand
            href="/#home" // Link para o topo da página
            onClick={handleBrandClick} // Handler customizado para scroll JS
            aria-label="Ir para o topo da página"
            className={styles.navbarBrandCustom}
          >
            <Image
              className={styles.logoImg}
              src={LOGO_URL}
              alt="Logo da DEV Solar"
              width={140}
              height={38}
              quality={85} // Qualidade da imagem
              loading="eager"
            />
          </Navbar.Brand>

          {/* Botão Hamburger */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Conteúdo Colapsável */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Navegação Principal (ms-auto para alinhar à direita) */}
            <Nav className="align-items-center ms-auto">
              {/* Mapeia os links a partir dos dados */}
              {navLinksData.map((link) => (
                <Nav.Link
                  key={link.id}
                  href={link.href}
                  onClick={handleNavLinkClick} // Fecha o menu mobile
                  className={styles.navLinkCustom} // Classe do Module
                >
                  {link.text}
                </Nav.Link>
              ))}

              {/* Botão de Login/Entrar */}
              <Button
                variant="outline-secondary" // Ou use uma cor customizada
                className={`${styles.loginButton} ms-lg-3 mt-lg-0 mt-2`} // Margem e espaçamento responsivo
                aria-label="Entrar ou acessar área do cliente"
                onClick={handleShowLoginModal}
                disabled={false}
              >
                <FaIcon
                  iconClass="fas fa-user"
                  className="me-lg-2 me-1"
                  aria-label="Entrar"
                  aria-hidden="true"
                />{' '}
                {/* Ícone */}
                <span className="d-inline-block">Entrar</span>{' '}
                {/* Span para controle */}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Autenticação */}
      {/* Garanta que o caminho de importação esteja correto! */}
      {/*<AuthModal show={modalShow} onHide={() => setModalShow(false)} /> */}

      {/* Componente de Atendimento via Local Storage */}
      {modalShow ? (
        <LeadAccessModal show={modalShow} onHide={() => setModalShow(false)} />
      ) : null}
      {/*<LoginPage  show={modalShow} onHide={() => setModalShow(false)} /> */}
    </>
  );
}

export default NavDS;
