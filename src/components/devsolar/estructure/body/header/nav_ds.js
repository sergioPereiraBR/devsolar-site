'use client';

// Necessário pelos hooks
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import LogoSm from '@/assets/logo_sm.webp';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import { FaIcon } from '@/components/devsolar/utility/fa-icon';

import styles from './nav_ds.module.css'; // Importar CSS Module
import { navLinksData } from './nav_links_ds'; // Importar dados dos links

const LeadAccessModal = dynamic(() => import('./LeadAccessModal'), {
  ssr: false,
});

const LOGO_URL = LogoSm.src;

function NavDS() {
  const [modalShow, setModalShow] = useState(false);
  const [expanded, setExpanded] = useState(false); // Estado do menu hamburger
  const navbarRef = useRef(null); // Ref para a Navbar

  const smoothScrollTo = useCallback((targetY) => {
    const startY = window.scrollY;
    const distance = targetY - startY;

    if (Math.abs(distance) < 2) {
      return;
    }

    const duration = Math.min(900, Math.max(350, Math.abs(distance) * 0.35));
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, Math.round(startY + distance * eased));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  // --- Lógica para Scroll Padding Dinâmico ---
  const updateScrollPadding = useCallback(() => {
    if (navbarRef.current) {
      const navbarHeight = navbarRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        '--scroll-padding',
        `${navbarHeight + 20}px`,
      );
      // Aplica diretamente também para garantir compatibilidade
      document.documentElement.style.scrollPaddingTop = `${navbarHeight + 20}px`;
    } else {
      // Fallback se a navbar não for encontrada imediatamente
      document.documentElement.style.setProperty('--scroll-padding', `90px`);
      document.documentElement.style.scrollPaddingTop = `90px`;
    }
  }, []); // useCallback sem dependências, pois navbarRef.current não deve ser dependência

  useEffect(() => {
    // Define o padding inicial
    updateScrollPadding();

    // Adiciona listener para redimensionamento
    window.addEventListener('resize', updateScrollPadding);

    // Função de limpeza para remover o listener e o estilo
    return () => {
      window.removeEventListener('resize', updateScrollPadding);
      document.documentElement.style.removeProperty('--scroll-padding');
      document.documentElement.style.scrollPaddingTop = '';
    };
  }, [updateScrollPadding]); // Depende da função memoizada

  // --- Handlers ---
  const handleNavLinkClick = (e) => {
    const href = e.currentTarget?.getAttribute('href') || '';
    if (!href.includes('#')) {
      setExpanded(false);
      return;
    }

    e.preventDefault();
    const hash = href.slice(href.indexOf('#'));
    const targetId = hash.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = navbarRef.current?.offsetHeight || 70;
      const top =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        (navbarHeight + 20);
      smoothScrollTo(top);
    }

    setExpanded(false); // Fecha o menu mobile ao clicar em um link
  };

  const handleBrandClick = (e) => {
    e.preventDefault(); // Previne a navegação padrão para '#'
    setExpanded(false);
    smoothScrollTo(0); // Scroll suave para o topo
  };

  const handleShowLoginModal = () => {
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
