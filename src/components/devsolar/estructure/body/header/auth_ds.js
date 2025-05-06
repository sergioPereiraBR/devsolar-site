'use client';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
import { useState } from 'react';

export default function AuthModal() {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const handleSignupLinkClick = () => {
        setShowSignup(true);
    };

    const handleLoginLinkClick = () => {
        setShowSignup(false);
    };

    return (
        <>

            <div className="container mt-5">
                {/*<button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#authModal"
                        >
                        </button>

                        <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">  {/* showLogin, setShowLogin */}
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div id="loginForm" style={{ display: showSignup ? 'none' : 'block' }}>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Senha</label>
                                        <input type="password" className="form-control" id="password" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                                <div className="mt-3">
                                    <a href="#" id="forgotPasswordLink">Esqueci minha senha</a> | <a href="#" id="signupLink" onClick={handleSignupLinkClick}>Fazer cadastro</a>
                                </div>
                            </div>
                            <div id="signupForm" style={{ display: showSignup ? 'block' : 'none' }}>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nome</label>
                                        <input type="text" className="form-control" id="name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="signupEmail" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="signupEmail" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="signupPassword" className="form-label">Senha</label>
                                        <input type="password" className="form-control" id="signupPassword" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirmar Senha</label>
                                        <input type="password" className="form-control" id="confirmPassword" required />
                                    </div>
                                    <button type="submit" className="btn btn-success">Cadastrar</button>
                                </form>
                                <div className="mt-3">
                                    <a href="#" id="loginLink" onClick={handleLoginLinkClick}>Voltar para o Login</a>
                                </div>
                            </div>
                            <div id="socialLogin" className="mt-3">
                                <p>Ou faça login com:</p>
                                <div className="social-login inline">
                                    <button className="btn btn-outline-primary m-1"><i className="fa fa-google"></i> Google</button>
                                    <button className="btn btn-outline-primary m-1"><i className="fa fa-facebook-f"></i> Facebook</button>
                                    <button className="btn btn-outline-primary m-1"><i className="fa fa-linkedin-in"></i> LinkedIn</button>
                                    <button className="btn btn-outline-primary m-1"><i className="fa fa-twitter"></i> X</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    );
}