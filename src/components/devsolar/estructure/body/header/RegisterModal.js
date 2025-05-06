'use client';

import { useState } from 'react';
import AuthModal from './AuthModal';

export default function RegisterModal({ show, onHide }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        // Chame a API de registro (implementada no backend)
        console.log({ name, email, password });
        onHide();
    };

    return (
        <AuthModal
            title="Criar Conta"
            show={show}
            onHide={onHide}
            onSubmit={handleRegister}
        >
            <div className="mb-3">
                <label>Nome</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Senha</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
        </AuthModal>
    );
}