# Plano de 1 Sprint: Ordem de Foco com TAB

## Objetivo
Garantir navegacao por teclado previsivel, sem regressao, em todos os fluxos criticos da home.

## Resultado esperado ao final da sprint
- Ordem de TAB validada para navegacao principal e secoes de conversao.
- Modais com foco preso (focus trap) e retorno de foco ao gatilho.
- Pipeline com teste E2E para detectar regressao de foco.

## Escopo desta sprint
- Pagina inicial (`/`) e componentes de maior impacto:
  - Navbar
  - Hero (acoes principais)
  - FAQ (accordion e area de pergunta)
  - Formulario de contato
  - Footer e CTA flutuante
  - Modais de calculo e contato

## Backlog tecnico priorizado
1. Corrigir semantica de interacao
- Usar `button`, `a`, `input`, `select`, `textarea` para elementos interativos.
- Evitar `div` clicavel sem suporte a teclado.

2. Padrao de foco em componentes complexos
- Modal: foco inicial util + focus trap + restaurar foco ao fechar.
- Accordion: foco no botao do cabecalho; conteudo nao deve entrar no TAB se nao interativo.

3. Ordem natural de TAB
- Manter ordem de DOM alinhada a ordem visual/logica.
- Evitar `tabindex` positivo.
- Usar `tabindex="0"` apenas para interativos customizados.
- Usar `tabindex="-1"` apenas para foco programatico.

4. Conteudo condicional/lazy
- Elementos ocultos nao devem entrar na sequencia.
- Ao renderizar, devem entrar em posicao consistente.

## Checklist de PR (obrigatorio)
- [ ] Nao foi usado `tabindex` positivo.
- [ ] Nao ha `div`/`span` clicavel sem papel e suporte de teclado.
- [ ] Modal com focus trap e retorno de foco ao gatilho.
- [ ] Fluxo principal de TAB nao teve quebra na home.
- [ ] Teste E2E de foco atualizado quando houve mudanca estrutural.

## Execucao de testes
```bash
npm run test:focus
```

```bash
npm run test:e2e
```

## Evidencias esperadas na review
- Video/screenshot do teste E2E passando.
- Lista curta de alteracoes de foco impactadas.
- Resultado de teste antes e depois (se houve bugfix).

## Riscos comuns
- Foco indo para elementos fora de modal aberto.
- Ordem de TAB alterada por mudanca visual sem ajuste de DOM.
- Widgets de terceiros (ex.: captcha) adicionando focos inesperados.

## Mitigacao
- Validar foco por papel/rotulo (nao por seletor fragil).
- Cobrir ao menos um teste de focus trap por modal critico.
- Revisar sequencia em desktop e mobile antes de merge.
