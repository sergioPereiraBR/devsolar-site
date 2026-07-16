'use client';

import { useState } from 'react';

// Simulação dos dados que seu script Python gerou e você subiu como JSON
const leadsData = [
  { id: 1, nome: "Luiz", telefone: "21992955426", consumo: "Acima de 1.000", data: "11/01/2026", notas: "Interessado em 10 placas." },
  // ... outros leads
];

const AtendimentoApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Função Simples de Login
  const handleLogin = () => {
    if (password === 'SUA_SENHA_AQUI') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '24px' }}>
        <h2>Acesso Restrito</h2>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '10px', fontSize: '20px' }}
        />
        <button onClick={handleLogin} style={{ padding: '10px 20px', marginLeft: '10px' }}>Entrar</button>
      </div>
    );
  }

  const leadAtual = leadsData[currentIndex];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#f4f4f4', borderRadius: '15px' }}>
      <h2 style={{ fontSize: '32px' }}>Foco no Atendimento</h2>
      <hr />
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <p><strong>Nome:</strong> <span style={{ fontSize: '24px' }}>{leadAtual.nome}</span></p>
        <p><strong>⚡ Consumo:</strong> {leadAtual.consumo}</p>
        <p><strong>🗓️ Agendamento:</strong> {leadAtual.data}</p>
        <p><strong>📝 Notas:</strong> {leadAtual.notas}</p>
        
        <a href={`https://wa.me/55${leadAtual.telefone}`} target="_blank" rel="noreferrer">
          <button style={{ width: '100%', padding: '20px', backgroundColor: '#25D366', color: 'white', fontSize: '20px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            ABRIR WHATSAPP
          </button>
        </a>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} style={{ padding: '15px' }}>Anterior</button>
        <button onClick={() => setCurrentIndex(prev => Math.min(leadsData.length - 1, prev + 1))} style={{ padding: '15px' }}>Próximo Lead</button>
      </div>
    </div>
  );
};

export default AtendimentoApp;
