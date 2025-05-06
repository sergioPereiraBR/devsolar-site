'use client';

//import { signIn } from 'next-auth/react';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function LoginModal({ show, onHide }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await signIn('credentials', { email, password });
        onHide();
    };

    function signIn(x) {
        console.log(x);
    }

    return (
        <AuthModal
            title="Entrar"
            show={show}
            onHide={onHide}
            onSubmit={handleLogin}
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
            <a href="#" onClick={() => onHide(() => openModal('forgot-password'))}>
                Esqueci minha senha
            </a>
            <div className="mt-3">
                <button className="btn btn-outline-dark w-100" onClick={() => signIn('google')}>
                    Entrar com Google
                </button>
                <button className="btn btn-outline-primary w-100 mt-2" onClick={() => signIn('facebook')}>
                    Entrar com Facebook
                </button>
                <button className="btn btn-outline-info w-100 mt-2" onClick={() => signIn('linkedin')}>
                    Entrar com LinkedIn
                </button>
            </div>
        </AuthModal>
    );
}