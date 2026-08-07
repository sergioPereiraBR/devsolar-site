# Checklist de 1 Tela — E-mail / Formulários

## Objetivo

Verificar rapidamente se o fluxo de envio de formulário está funcionando corretamente.

## Checklist Rápido

### 1. Formulário

- [ ] O formulário carrega sem erro.
- [ ] Os campos obrigatórios aparecem corretamente.
- [ ] O botão de envio fica habilitado quando o formulário está válido.

### 2. reCAPTCHA

- [ ] O reCAPTCHA aparece quando estiver habilitado.
- [ ] O token é gerado corretamente.
- [ ] O envio não é feito sem o token quando o passo é obrigatório.

### 3. Envio

- [ ] O submit dispara a requisição.
- [ ] A API responde com sucesso.
- [ ] A mensagem de sucesso aparece para o usuário.

### 4. Backend / API

- [ ] A rota de API recebe os dados corretamente.
- [ ] Os campos chegam no formato esperado.
- [ ] Não há erro de configuração de ambiente.
- [ ] O endpoint de envio está ativo.

### 5. Provedor de E-mail

- [ ] A chave/configuração do provedor está válida.
- [ ] O remetente está correto.
- [ ] O destinatário está correto.
- [ ] A mensagem foi entregue ou foi rejeitada por política de spam.

### 6. Validação Final

- [ ] A mensagem chegou ao inbox.
- [ ] Caso não tenha chegado, verificou-se spam, filtro e reputação do domínio.

## Resumo de Decisão

- Se o formulário falha antes do envio: revisar front-end e validações.
- Se o formulário envia mas não chega: revisar API, provedor e filtros de spam.
- Se tudo funciona: finalizar e registrar a validação.
