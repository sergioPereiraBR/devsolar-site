# Manual de Alteracao da Ordem de Foco com TAB e Manutencao dos Testes

## 1. Objetivo
Este manual descreve como:

- Alterar a ordem de navegacao por teclado (TAB e Shift+TAB) com seguranca.
- Preservar acessibilidade e previsibilidade da interface.
- Atualizar e manter a suite de testes E2E de foco.

Escopo principal atual:

- Cabecalho (desktop e mobile com menu hamburguer).
- Hero e CTA principais.
- FAQ.
- Secao de contato.
- Rodape e newsletter.

## 2. Arquivos-chave do fluxo de foco
Arquivos que normalmente serao alterados quando a ordem de foco mudar:

- [src/components/devsolar/estructure/body/header/nav_ds.js](src/components/devsolar/estructure/body/header/nav_ds.js)
- [src/components/devsolar/estructure/body/header/nav_links_ds.js](src/components/devsolar/estructure/body/header/nav_links_ds.js)
- [src/components/devsolar/estructure/body/main/faq_section_ds.js](src/components/devsolar/estructure/body/main/faq_section_ds.js)
- [src/components/devsolar/estructure/body/footer/footer_ds.js](src/components/devsolar/estructure/body/footer/footer_ds.js)

Arquivos de teste e configuracao:

- [tests/e2e/focus-order.spec.ts](tests/e2e/focus-order.spec.ts)
- [playwright.config.ts](playwright.config.ts)
- [package.json](package.json)

## 3. Como a ordem TAB e definida (regra base)
Em HTML/React, a ordem natural de foco vem de:

1. Ordem dos elementos focaveis no DOM.
2. Elementos nativamente focaveis (a[href], button, input, textarea, select, etc).
3. Regras de exibicao/ocultacao (elemento oculto deve sair da navegacao).

Regra de ouro:

- Prefira controlar a ordem pelo DOM e pela estrutura dos componentes.
- Evite tabIndex positivo (tabIndex > 0), pois costuma quebrar previsibilidade e manutencao.
- Use tabIndex somente quando houver justificativa forte e documentada.

## 4. Fluxo recomendado para alterar a ordem de foco

### 4.1 Planejar a nova ordem
Antes de editar codigo, descreva a sequencia alvo para:

- Desktop (TAB).
- Mobile menu fechado (TAB).
- Mobile menu aberto (TAB).
- Fluxo reverso com Shift+TAB.

Sugestao de formato:

- Passo 1: topo/logo
- Passo 2: navegacao principal
- Passo 3: CTA hero
- Passo 4: secoes de conteudo
- Passo 5: contato e rodape

### 4.2 Alterar componentes
Ajuste primeiro o codigo da UI:

- Reordenando elementos no JSX quando necessario.
- Mantendo links e botoes semanticamente corretos.
- Garantindo que elementos ocultos nao fiquem focaveis.

Boas praticas:

- Se o menu mobile estiver colapsado, links internos colapsados nao devem entrar no TAB.
- Ao expandir menu mobile por teclado, os links devem voltar para a trilha de foco.
- Evite transformar div em controle interativo; prefira button/a.

### 4.3 Garantir acessibilidade minima
Sempre revisar:

- aria-label claro para botoes sem texto visivel.
- Texto discernivel em links/botoes.
- Foco visivel (nao remover outline sem substituicao adequada).

## 5. Como atualizar os testes de foco

A suite atual esta em [tests/e2e/focus-order.spec.ts](tests/e2e/focus-order.spec.ts), com blocos:

- Forward TAB flow
- Reverse Shift+TAB flow

### 5.1 Estrategia de assercao usada
Os testes usam metadados do elemento ativo, em vez de somente nome acessivel, para reduzir ambiguidade:

- tag
- href
- aria
- id
- text
- placeholder

Motivo:

- Ha rotulos duplicados na pagina (exemplo: navbar e rodape), o que pode causar validacoes fragis se usar apenas texto.

### 5.2 Quando editar o teste
Edite o teste quando houver mudanca em:

- Ordem da navbar.
- Menu mobile/toggle.
- CTA da hero.
- FAQ (ordem de perguntas, campo de pergunta, botao emoji).
- Contato (ordem de campos e links).
- Rodape/newsletter.

### 5.3 Como editar com seguranca
Passo a passo:

1. Ajuste primeiro o componente de UI.
2. Rode localmente e confirme o comportamento com TAB manualmente.
3. Atualize predicados do teste apenas onde a mudanca realmente ocorreu.
4. Mantenha assercoes robustas por href/aria/id/tag.
5. Rode a suite completa de foco.

## 6. Comandos operacionais
Instalar dependencias (se necessario):

```bash
npm install
```

Rodar somente suite de foco:

```bash
npm run test:focus
```

Rodar todos os E2E:

```bash
npm run test:e2e
```

Rodar UI do Playwright para depuracao:

```bash
npm run test:e2e:ui
```

Abrir relatorio HTML do ultimo run:

```bash
npx playwright show-report
```

## 7. Checklist obrigatorio antes de PR

1. Fluxo TAB desktop validado.
2. Fluxo TAB mobile (menu fechado e aberto) validado.
3. Fluxo Shift+TAB validado para rodape/contato/FAQ.
4. Nenhum elemento oculto recebendo foco indevido.
5. Suite [tests/e2e/focus-order.spec.ts](tests/e2e/focus-order.spec.ts) 100% verde.
6. Mudanca documentada neste manual quando alterar regra estrutural.

## 8. Troubleshooting rapido

### 8.1 Falha em ordem esperada no mobile
Sintoma comum:

- Primeiro item do menu aberto nao bate com esperado.

Causas frequentes:

- Enter nao foi disparado no botao toggle focado.
- Menu nao entrou em estado expandido antes do proximo TAB.

Mitigacao:

- Validar foco no toggle antes de abrir.
- Validar classe de expansao do container do menu antes da sequencia.

### 8.2 Flakiness por texto duplicado
Sintoma comum:

- Assert por nome acessivel encontra multiplos elementos equivalentes.

Mitigacao:

- Trocar assert para href, aria-label, id e tag do elemento ativo.

### 8.3 Mudanca legitima da UI que quebrou teste
Processo correto:

1. Confirmar manualmente que a nova ordem esta correta para usuario.
2. Atualizar o predicado do teste para o novo contrato.
3. Manter rastreabilidade na descricao do commit/PR.

## 9. Politica de mudanca de contrato de foco
Toda mudanca de ordem de foco deve ter:

1. Justificativa funcional ou de acessibilidade.
2. Atualizacao de teste correspondente.
3. Nota curta neste manual (secao de historico).

## 10. Historico de manutencao

- 2026-07-22: suite consolidada com cobertura forward (desktop/mobile/FAQ-contato-rodape) e reverse (Shift+TAB).

## 11. Modelo de PR (copiar e preencher)

Titulo sugerido:

- A11y: ajuste de ordem TAB em <secao>

Descricao sugerida:

1. Contexto
- Qual problema de navegacao por teclado existia.

2. Mudanca aplicada
- Quais componentes mudaram e como a ordem ficou.

3. Impacto em testes
- Quais testes foram atualizados em [tests/e2e/focus-order.spec.ts](tests/e2e/focus-order.spec.ts).

4. Evidencias
- Resultado de npm run test:focus.
- (Opcional) screenshot/video do Playwright em caso de fluxo sensivel.
