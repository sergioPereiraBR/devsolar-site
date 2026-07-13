'use client';
import { useState } from 'react';
import { Button, Form, Modal, Card, Badge } from 'react-bootstrap';
import { useEffect } from 'react';

export default function LoginPage({ show, onHide}) {
	const [mode, setMode] = useState('auth'); // Modos: auth (senha) ou view (atendimento)
	const [password, setPassword] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fontSize, setFontSize] = useState(18); // Para acessibilidade
  const [suggestedProvider, setSuggestedProvider] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    // 1. Verificar sessão ativa ou provedor anterior
    const lastProvider = localStorage.getItem('last_login_provider');
    if (lastProvider) {
      setSuggestedProvider(lastProvider);
      setShowSuggestion(true);
      // Opcional: Iniciar um "silent check" com o provedor sugerido
      // para verificar se a sessão ainda é válida.
    } else {
      // Se não houver provedor anterior, mostrar as opções de login
      setShowSuggestion(false);
    }

    // 2. Configurar FedCM ou Google One Tap, se aplicável
    // A configuração do FedCM ou One Tap geralmente é feita aqui.
    // O callback de sucesso desses métodos deve lidar com o login.

  }, []);

  const handleConfirmLogin = () => {
    // Iniciar o fluxo de login com o provedor sugerido
    console.log(`Logando com ${suggestedProvider}...`);
    // Chamar a função de login apropriada para o provedor (Google, Facebook, etc.)
  };

  const handleChooseAnotherAccount = () => {
    // Ocultar a sugestão e mostrar as opções de login
    setShowSuggestion(false);
    setSuggestedProvider(null);
  };

  return (
    <Form.Group className="mb-3">
      {showSuggestion && suggestedProvider ? (
        <div>
          <Form.Label>Entrar no seu site</Form.Label>
          <Form.Label>Detectamos seu acesso anterior via {suggestedProvider}.</Form.Label>
          <Button onClick={handleConfirmLogin}>Continuar como [Nome do Usuário]</Button>
          <Button onClick={handleChooseAnotherAccount}>Entrar com outra conta</Button>
        </div>
      ) : (
        <div>
          <Form.Label>Escolha como deseja entrar</Form.Label>
          {/* Botões de login para Google, Facebook, etc. */}
          <Button onClick={() => console.log('Login com Google')}>Entrar com Google</Button>
          <Button onClick={() => console.log('Login com Facebook')}>Entrar com Facebook</Button>
          {/* Adicionar outros provedores conforme necessário */}
        </div>
      )}
    </Form.Group>
  );
};
