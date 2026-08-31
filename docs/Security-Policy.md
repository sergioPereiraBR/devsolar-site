# Política de Segurança e Checklist do Site

## Objetivo

Este documento consolida o checklist de melhorias de segurança, desempenho e acessibilidade para o site da DevSolar. Ele serve como referência para garantir que a aplicação siga boas práticas de proteção contra vulnerabilidades comuns, além de melhorar a qualidade de entrega e a experiência do usuário.

## Visão geral do projeto

O site é implantado como saída estática e usa configuração de servidor Apache para aplicar cabeçalhos HTTP em nível de hosting. Em ambiente estático, a regra de segurança mais relevante é aplicada em public/.htaccess, com suporte paralelo em next.config.mjs para builds sem exportação estática.

---

## Checklist completo

### 1) HSTS - HTTP Strict-Transport-Security

Descrição:
URLs que não possuem o cabeçalho de resposta HSTS. Esse cabeçalho instrui o navegador a acessar o site somente via HTTPS, evitando que o usuário seja redirecionado ou carregado por HTTP em conexões iniciais.

Recomendação:

- Definir o cabeçalho HSTS em todas as páginas.
- Usar a política: max-age=31536000; includeSubDomains; preload

Status do projeto:

- ✅ Implementado
- Configuração atual: Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
- Local: public/.htaccess

Impacto:

- Evita downgrade forçado para HTTP.
- Reduz risco de ataques de interceptação e manipulação de tráfego.

---

### 2) Referrer-Policy

Descrição:
URLs que não possuem as políticas no-referrer-when-downgrade, strict-origin-when-cross-origin, no-referrer ou strict-origin no cabeçalho Referrer-Policy. Isso ajuda a evitar vazamento de informações sensíveis em requisições entre origens diferentes.

Recomendação:

- Definir uma política de referência compatível com o uso do site.
- Valor recomendado: strict-origin-when-cross-origin

Status do projeto:

- ✅ Implementado
- Configuração atual: Header always set Referrer-Policy "strict-origin-when-cross-origin"
- Local: public/.htaccess

Impacto:

- Mantém utilidade do referer para navegação internas.
- Reduz vazamento de dados entre domínios e origens diferentes.

---

### 3) Content-Security-Policy (CSP)

Descrição:
URLs que não possuem o cabeçalho de resposta Content-Security-Policy. Esse cabeçalho limita quais recursos podem ser carregados em uma página e ajuda a mitigar falhas de XSS e injeção de dados.

Recomendação:

- Definir uma política CSP estrita em todas as páginas.
- Permitir apenas recursos essenciais ao site.
- Revisar regras de script, estilo, imagens, fontes, frames e conexão.

Status do projeto:

- ✅ Implementado
- A política atual inclui regras para script, style, img, font, connect, frame, manifest e upgrade-insecure-requests.
- Local: public/.htaccess

Impacto:

- Reduz risco de XSS.
- Controla fontes externas permitidas.
- Melhora a integridade da página e o nível de proteção do navegador.

---

### 4) Erros de cliente e links quebrados (4xx)

Descrição:
URLs internas com erro do lado do cliente, como 400, 403, 404, 410 e 429, normalmente indicam links quebrados ou rota mal configurada.

Recomendação:

- Garantir que todos os links internos resolvam para código 200.
- Corrigir ou remover links quebrados.
- Aplicar redirecionamentos quando necessário.
- Verificar especialmente páginas 404 e 410.

Status do projeto:

- ⚠️ Revisar periodicamente
- O site já possui regra de not found e redirecionamentos em Apache, mas ainda é necessário validar links internos e rotas públicas.

Ações recomendadas:

- Validar links internos em rotas importantes.
- Confirmar páginas de ajuda, políticas, páginas de conteúdo e botões de navegação.
- Verificar redirecionamentos do WhatsApp e páginas de destino.

---

### 5) Imagens grandes e excesso de peso

Descrição:
Imagens grandes acima do limite recomendado aumentam o tempo de carregamento da página e afetam velocidade, experiência do usuário e SEO.

Recomendação:

- Compactar imagens.
- Usar formatos modernos, como WebP e AVIF quando apropriado.
- Redimensionar imagens para o tamanho real de exibição.
- Evitar carregamento de assets fora da tela.

Status do projeto:

- ⚠️ Necessita otimização contínua

Ações recomendadas:

- Revisar imagens em hero banners, carrosséis, cards e galerias.
- Medir tamanho em KB/MB por imagem.
- Verificar comportamentos em mobile e tablet.

---

### 6) Legibilidade e readability

Descrição:
Textos muito difíceis de ler, com frases longas e vocabulário complexo, prejudicam acessibilidade e entendimento do público.

Recomendação:

- Usar frases curtas e objetivas.
- Simplificar termos técnicos quando possível.
- Melhorar contrastes, espaçamento e estrutura textual.
- Revisar textos em blocos de destaque, seções de explicação e call-to-action.

Status do projeto:

- ⚠️ Revisar conteúdo editorial

Ações recomendadas:

- Simplificar textos em áreas de conversão.
- Reduzir densidade de informação por bloco.
- Garantir que as mensagens principais sejam claras e diretas.

---

## Política de implementação aplicada

### Cabeçalhos ativos no servidor

O site já aplica os seguintes headers em todos os acessos via Apache:

- Content-Security-Policy
- Strict-Transport-Security
- Cross-Origin-Opener-Policy
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy

Esses cabeçalhos estão configurados em public/.htaccess e são a base para a proteção do site em produção.

### Redirecionamento HTTPS

O servidor já força o uso de HTTPS mediante regras de rewrite em Apache. Esse comportamento evita que o site seja acessado em HTTP em uma configuração insegura.

---

## Status final do checklist

| Item                    | Status                 |
| ----------------------- | ---------------------- |
| HSTS                    | ✅ Implementado        |
| Referrer-Policy         | ✅ Implementado        |
| Content-Security-Policy | ✅ Implementado        |
| Links quebrados / 4xx   | ⚠️ Revisão contínua    |
| Imagens grandes         | ⚠️ Otimização pendente |
| Legibilidade            | ⚠️ Revisão contínua    |

---

## Observação final

A parte crítica de segurança do site já está coberta pelos headers do servidor e pela política de HTTPS forçada. O que permanece é manutenção contínua de conteúdo, links e otimização visual para melhorar desempenho, acessibilidade e confiabilidade geral da experiência do usuário.
