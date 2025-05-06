'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

// Funções auxiliares (getDigits, formatCep) permanecem as mesmas
const getDigits = (value = '') => value.replace(/\D/g, '');

const formatCep = (digits) => {
    if (!digits) return '';
    const cepLength = digits.length;
    if (cepLength <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
};

// Adicionamos a prop 'name' para flexibilidade
const CustomCepInput = forwardRef(
    ({ initialValue = "", isRequired = true, onCepChange, name = "cep", stylesComp }, ref) => {

        const formatInitial = (val) => formatCep(getDigits(val));

        const [cep, setCep] = useState(() => formatInitial(initialValue));
        const [cepValid, setCepValid] = useState(true);
        const [cepTouched, setCepTouched] = useState(false);
        const inputRef = useRef(null);

        const validateCep = (formattedCep) => {
            if (!isRequired && formattedCep.trim() === '') return true;
            const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
            return cepRegex.test(formattedCep);
        };

        useEffect(() => {
            const formattedInitial = formatInitial(initialValue);
            setCep(formattedInitial);
            setCepValid(validateCep(formattedInitial));
        }, [initialValue, isRequired]);

        const handleChange = (event) => {
            const rawValue = event.target.value;
            const digits = getDigits(rawValue);
            const nextFormattedValue = formatCep(digits);

            // Só atualiza se o valor formatado realmente mudou
            // Isso pode ajudar a evitar loops ou conflitos com autofill
            if (nextFormattedValue !== cep) {
                setCep(nextFormattedValue);

                if (onCepChange) {
                    onCepChange(nextFormattedValue);
                }

                if (cepTouched) {
                    setCepValid(validateCep(nextFormattedValue));
                }
            }
        };

        const handleBlur = () => {
            setCepTouched(true);
            setCepValid(validateCep(cep));
        };

        const showError = cepTouched && !cepValid;

        // Gera um ID único ou usa o nome para o controlId, se não fornecido explicitamente
        const inputId = `customCep-${name}`;


        return (
            // Usar o ID gerado ou o nome para associar label e input
            <Form.Group className="mb-3" controlId={inputId}>
                <Form.Label style={stylesComp.formLabel}>CEP</Form.Label>
                <Form.Control
                    ref={inputRef}
                    type="text" // Mantém text
                    placeholder="_____-___"
                    value={cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={isRequired}
                    style={stylesComp.formControl}
                    isInvalid={showError}
                    maxLength={9}
                    inputMode="numeric"

                    // --- Atributos Chave para Autofill ---
                    name={name} // Nome semântico para o campo
                    autoComplete="postal-code" // Dica padrão para CEP/Código Postal
                // --- Fim dos Atributos de Autofill ---
                />
                <Form.Control.Feedback type="invalid">
                    {isRequired && cep.trim() === '' && cepTouched
                        ? 'O CEP é obrigatório.'
                        : 'Por favor, insira um CEP válido no formato 12345-678.'}
                </Form.Control.Feedback>
            </Form.Group>
        );
    }
);

CustomCepInput.displayName = 'CustomCepInput';

export default CustomCepInput;