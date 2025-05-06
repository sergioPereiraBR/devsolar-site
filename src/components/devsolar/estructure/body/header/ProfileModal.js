'use client';

import { useState } from 'react';
import AuthModal from './AuthModal';

export default function ProfileModal({ show, onHide }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdate = async () => {
        // Chame a API de atualização de perfil (implementada no backend)
        console.log({ name, password });
        onHide();
    };

    return (
        <AuthModal
            title="Editar Perfil"
            show={show}
            onHide={onHide}
            onSubmit={handleUpdate}
        >
            <div className="mb-3">
                <label>Nome</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Nova Senha</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </AuthModal>
    );
}