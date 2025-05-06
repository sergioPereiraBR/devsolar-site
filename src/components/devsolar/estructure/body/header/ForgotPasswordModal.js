'use client';

//import { useState } from 'react';
import AuthModal from "./authModal";

export default function ForgotPasswordModal({ show, onHide }) {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        // Chame a API de recuperação de senha (implementada no backend)
        console.log({ email });
        onHide();
    };

    return (
        <AuthModal
            title="Recuperar Senha"
            show={show}
            onHide={onHide}
            onSubmit={handleForgotPassword}
        >
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
        </AuthModal>
    );
}