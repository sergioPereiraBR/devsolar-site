'use client'; // Necessário pelos hooks

import 'bootstrap/dist/css/bootstrap.min.css'; // Import global do Bootstrap CSS
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import AuthModal from './AuthModal-03'; // VERIFICAR ESTE CAMINHO!
import styles from './nav_ds.module.css'; // Importar CSS Module
import { navLinksData } from './nav_links_ds'; // Importar dados dos links

const LOGO_URL = './images/logo_sm.png'; // Manter como constante

function NavDS() {
    const [modalShow, setModalShow] = useState(false);
    const [expanded, setExpanded] = useState(false); // Estado do menu hamburger
    const navbarRef = useRef(null); // Ref para a Navbar

    // --- Lógica para Scroll Padding Dinâmico ---
    const updateScrollPadding = useCallback(() => {
        if (navbarRef.current) {
            const navbarHeight = navbarRef.current.offsetHeight;
            document.documentElement.style.setProperty('--scroll-padding', `${navbarHeight + 20}px`);
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
        // Prevenção não é mais necessária se usarmos CSS para smooth scroll
        // e.preventDefault();
        setExpanded(false); // Fecha o menu mobile ao clicar em um link
        // O scroll suave agora é tratado pelo CSS (`scroll-behavior: smooth`)
    };

    const handleBrandClick = (e) => {
        e.preventDefault(); // Previne a navegação padrão para '#'
        setExpanded(false);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave para o topo via JS
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
                className={`${styles.navbarCustom} bg-body-tertiary navbar-light bg-white shadow-sm py-2 sticky-top`}
                expanded={expanded}
                onToggle={setExpanded} // Simplificado: passa diretamente o setExpanded
                collapseOnSelect // Fecha o menu automaticamente ao selecionar um Nav.Link (bom para mobile)
            >
                <Container className="py-0">
                    {/* Link da Logo (scroll para o topo) */}
                    <Navbar.Brand
                        href="#" // Link para o topo da página
                        onClick={handleBrandClick} // Handler customizado para scroll JS
                        aria-label="Ir para o topo da página"
                        className={styles.navbarBrandCustom}
                    >
                        <Image
                            className={styles.logo} // Classe do Module para estilização
                            src={LOGO_URL}
                            alt="Logo da DEV Solar"
                            width={150} // Mantenha ou ajuste
                            height={38}  // Mantenha ou ajuste
                            // style={{ objectfit: "contain", width: "auto", height: "38px" }}
                            priority={true} // Boa prática para logo acima da dobra
                        />
                    </Navbar.Brand>

                    {/* Botão Hamburger */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Conteúdo Colapsável */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Navegação Principal (ms-auto para alinhar à direita) */}
                        <Nav className="ms-auto align-items-center">
                            {/* Mapeia os links a partir dos dados */}
                            {navLinksData.map(link => (
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
                                className={`${styles.loginButton} ms-lg-3 mt-2 mt-lg-0`} // Margem e espaçamento responsivo
                                aria-label="Entrar ou acessar área do cliente"
                                onClick={handleShowLoginModal}
                                disabled={true}
                            >
                                <i className="fas fa-user me-1 me-lg-2"></i> {/* Ícone */}
                                <span className="d-inline-block">Entrar</span> {/* Span para controle */}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal de Autenticação */}
            {/* Garanta que o caminho de importação esteja correto! */}
            <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
}

export default NavDS;