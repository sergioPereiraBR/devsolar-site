'use client';
import { useState } from 'react';
import { Button, Form, Modal, Card, Badge } from 'react-bootstrap';
import { leads } from './leads_data.js';

export default function LeadAccessModal({ show, onHide}) {
    const [mode, setMode] = useState('auth'); // Modos: auth (senha) ou view (atendimento)
    const [password, setPassword] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fontSize, setFontSize] = useState(18); // Para acessibilidade

    // Estes dados viriam do arquivo JSON que seu script Python gerou
    // leads = [
    //     { nome: "Luiz", telefone: "21992955426", consumo: "Acima de 1.000", data: "11/01/2026", notas: "Cliente com pressa, foco em 10 placas." },
    //     { nome: "Cesar Antônio", telefone: "2198885346", consumo: "500 a 700", data: "11/01/2026", notas: "Mora em Magalhães Bastos." }
    // ];

    console.log(leads);

    const handleAuth = () => {
        // Defina sua senha de acesso aqui
        if (password === 'solar123') {
            setMode('view');
        } else {
            alert('Senha incorreta!');
        }
    };

    const nextLead = () => {
        if (currentIndex < leads.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const prevLead = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const renderContent = () => {
        if (mode === 'auth') {
            return (
                <Form.Group className="mb-3">
                    <Form.Label>Digite a senha para acessar os Leads</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Senha de atendimento"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />
                    <Button variant="primary" className="w-100 mt-3" onClick={handleAuth}>
                        Liberar Acesso
                    </Button>
                </Form.Group>
            );
        }

        const lead = leads[currentIndex];

        return (
            <div style={{ fontSize: `${fontSize}px` }}>
                {/* Controles de Acessibilidade */}
                <div className="d-flex justify-content-end mb-2">
                    <Button variant="outline-secondary" size="sm" className="me-1" onClick={() => setFontSize(fontSize + 2)}>A+</Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => setFontSize(fontSize - 2)}>A-</Button>
                </div>

                <Card className="border-0 shadow-sm">
                    <Card.Body>
                        <Card.Title className="display-6">{lead.nome}</Card.Title>
                        <hr />
                        <p><strong>⚡ Consumo:</strong> <Badge bg="warning" text="dark">{lead.consumo}</Badge></p>
                        <p><strong>🗓️ Data:</strong> {lead.data}</p>
                        <p className="mt-3"><strong>Notas de Atendimento:</strong></p>
                        <div className="p-3 bg-light rounded" style={{ borderLeft: '5px solid #0d6efd' }}>
                            {lead.notas}
                        </div>
                    </Card.Body>
                </Card>

                <div className="text-center mt-4">
                    <Button 
                        variant="success" 
                        size="lg" 
                        className="w-100 py-3 shadow"
                        href={`https://wa.me/55${lead.telefone.replace(/\D/g,'')}`}
                        target="_blank"
                    >
                        FALAR NO WHATSAPP
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Modal show={show} onHide={onHide} centered size={mode === 'view' ? 'lg' : 'md'}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === 'auth' ? 'Acesso Restrito' : `Atendimento (${currentIndex + 1} de ${leads?.length || 0})`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderContent()}
            </Modal.Body>
            {mode === 'view' && (
                <Modal.Footer className="justify-content-between">
                    <Button variant="outline-primary" onClick={prevLead} disabled={currentIndex === 0}>
                        ← Anterior
                    </Button>
                    <Button variant="primary" onClick={nextLead} disabled={currentIndex === leads.length - 1}>
                        Próximo Lead →
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}