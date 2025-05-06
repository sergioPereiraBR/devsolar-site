// components/AuthModal.js
'use client';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function AuthModal({ show, onHide }) {
    const [mode, setMode] = useState('login'); // Controla o modo: login, register, forgot-password, profile
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        await signIn('credentials', { email: formData.email, password: formData.password });
        onHide();
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem');
            return;
        }
        console.log('Dados de cadastro:', formData);
        onHide();
    };

    const handleForgotPassword = async () => {
        console.log('Recuperar senha para:', formData.email);
        onHide();
    };

    const handleUpdateProfile = async () => {
        console.log('Atualizar perfil:', formData);
        onHide();
    };

    const renderContent = () => {
        switch (mode) {
            case 'login':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <div className="text-center mb-3">
                            <a href="#" onClick={() => setMode('forgot-password')}>
                                Esqueci minha senha
                            </a>
                        </div>
                        <div className="text-center">
                            <Button variant="outline-dark" className="w-100 mb-2" onClick={() => signIn('google')}>
                                Entrar com Google
                            </Button>
                            <Button variant="outline-primary" className="w-100 mb-2" onClick={() => signIn('facebook')}>
                                Entrar com Facebook
                            </Button>
                            <Button variant="outline-info" className="w-100" onClick={() => signIn('linkedin')}>
                                Entrar com LinkedIn
                            </Button>
                        </div>
                        <p className="mt-3 text-center">
                            Não tem conta?{' '}
                            <a href="#" onClick={() => setMode('register')}>
                                Crie uma agora
                            </a>
                        </p>
                    </>
                );

            case 'register':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <p className="mt-3 text-center">
                            Já tem conta?{' '}
                            <a href="#" onClick={() => setMode('login')}>
                                Entrar agora
                            </a>
                        </p>
                    </>
                );

            case 'forgot-password':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <p className="mt-3 text-center">
                            Lembrei minha senha!{' '}
                            <a href="#" onClick={() => setMode('login')}>
                                Entrar agora
                            </a>
                        </p>
                    </>
                );

            case 'profile':
                return (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nova Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar Nova Senha</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </>
                );

            default:
                return null;
        }
    };

    const handleSubmit = () => {
        if (mode === 'login') handleLogin();
        if (mode === 'register') handleRegister();
        if (mode === 'forgot-password') handleForgotPassword();
        if (mode === 'profile') handleUpdateProfile();
    };

    function signIn() {

    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar Conta' : mode === 'forgot-password' ? 'Recuperar Senha' : 'Editar Perfil'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderContent()}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}