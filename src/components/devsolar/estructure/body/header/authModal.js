'use client';

// import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function AuthModal({ title, children, show, onHide, onSubmit }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}