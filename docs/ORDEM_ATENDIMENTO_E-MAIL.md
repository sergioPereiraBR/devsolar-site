# Ordem de Atendimento do Sistema de E-mail

## Objetivo

Este documento serve como uma lista rápida de verificação para atender problemas de envio ou recebimento de e-mails no site.

---

## 1. Confirmar se o formulário foi enviado

- verificar se o usuário clicou no botão de envio
- confirmar se o frontend exibiu sucesso ou erro
- observar se houve alguma validação impedindo o submit

---

## 2. Validar o payload

Verificar se os dados enviados estão completos:

- nome
- e-mail
- telefone
- mensagem
- assunto
- replyTo

Arquivo principal para revisar:

- [src/components/devsolar/utility/email/SendEmail.ts](src/components/devsolar/utility/email/SendEmail.ts)

---

## 3. Validar o reCAPTCHA

Se o formulário estiver com reCAPTCHA habilitado:

- confirmar se o widget carregou
- verificar se o token foi gerado
- validar se o token foi enviado junto com os dados

Arquivos relacionados:

- [src/components/devsolar/utility/recapcha/RecaptchaField.jsx](src/components/devsolar/utility/recapcha/RecaptchaField.jsx)
- [src/components/devsolar/estructure/body/main/contact_section_ds.js](src/components/devsolar/estructure/body/main/contact_section_ds.js)
- [src/components/devsolar/estructure/body/header/ModalCapturaLead.jsx](src/components/devsolar/estructure/body/header/ModalCapturaLead.jsx)

---

## 4. Verificar a API

Checar se a rota respondeu corretamente:

- [src/app/api/contact/route.ts](src/app/api/contact/route.ts)

O que observar:

- sucesso ou erro retornado
- presença de payload correto
- evento de envio realizado

---

## 5. Validar configuração do provedor

Revisar as variáveis de ambiente em:

- [src/lib/email-config.ts](src/lib/email-config.ts)

Itens principais:

- endpoint correto
- chave de acesso válida
- destinatário configurado
- remetente configurado

---

## 6. Verificar se o e-mail foi entregue ou caiu em spam

Se o envio ocorreu, porém a mensagem não chegou corretamente:

- conferir a caixa de spam
- revisar reputação do remetente
- confirmar verificação do domínio
- testar com outro provedor, se necessário

---

## 7. Teste mínimo para isolamento do problema

Se ainda não tiver certeza da causa:

1. usar um formulário simples
2. enviar apenas dados básicos
3. testar sem campos extras
4. testar com e-mail de teste
5. verificar se o problema persiste

---

## 8. Prioridades de atendimento

1. Problema no formulário
2. Problema no payload
3. Problema no reCAPTCHA
4. Problema na API
5. Problema no provedor
6. Problema de entrega/spam

---

## Resumo

A ordem ideal de atendimento é:

1. validar o formulário
2. validar o payload
3. validar o reCAPTCHA
4. validar a API
5. validar o provedor
6. validar entrega e spam
