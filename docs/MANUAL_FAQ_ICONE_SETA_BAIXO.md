# Manual de Edicao Visual do Icone de Seta para Baixo no FAQ

## Objetivo
Este manual explica como alterar manualmente, com seguranca, toda a aparencia dos elementos ligados ao icone de seta para baixo do acordeao da secao FAQ.

Escopo:
- Icone fechado (seta para baixo)
- Icone aberto (comentarios)
- Disco (container circular do icone)
- Borda, fundo, sombra e cores por estado
- Regras de visibilidade aberto/fechado
- Ajustes responsivos
- Evitar conflitos com o icone nativo do Bootstrap

## Arquivos envolvidos
1. src/components/devsolar/estructure/body/main/faq_section_ds.js
2. src/components/devsolar/estructure/body/main/faq_section_ds.module.css

## Mapa de componentes (JSX)
No arquivo faq_section_ds.js, cada item do acordeao usa:

- Container do icone:
  span com className styles.toggleIcon
- Icone de estado fechado:
  FontAwesomeIcon com className styles.toggleIconClosed
  icone atual: faCircleDown
- Icone de estado aberto:
  FontAwesomeIcon com className styles.toggleIconOpen
  icone atual: faComments

Esses 3 elementos sao a base de toda a customizacao visual.

## Mapa de seletores (CSS)
No arquivo faq_section_ds.module.css, os seletores principais sao:

1. .toggleIcon
Controla o disco (tamanho, formato circular, fundo, alinhamento, sombra).

2. .toggleIconClosed
Controla estilo do icone fechado (seta para baixo).

3. .toggleIconOpen
Controla estilo do icone aberto.

4. .messageHeader :global(.accordion-button) .toggleIconClosed
5. .messageHeader :global(.accordion-button) .toggleIconOpen
Controlam visibilidade no estado aberto (accordion-button sem .collapsed).

6. .messageHeader :global(.accordion-button.collapsed) .toggleIconClosed
7. .messageHeader :global(.accordion-button.collapsed) .toggleIconOpen
Controlam visibilidade no estado fechado.

8. .messageHeader :global(.accordion-button)::after
Desliga a seta nativa do Bootstrap para nao aparecer junto com o icone custom.

9. @media (max-width: 576px) com .toggleIcon
Ajusta tamanho e posicao no mobile.

## Matriz de estado (comportamento esperado)
Estado FECHADO:
- .accordion-button.collapsed presente
- .toggleIconClosed visivel
- .toggleIconOpen oculto
- Disco usa estilo de fechado

Estado ABERTO:
- .accordion-button sem .collapsed
- .toggleIconClosed oculto
- .toggleIconOpen visivel
- Disco usa estilo base (ou estilo de aberto, se definido)

## Valores atuais de referencia
Abaixo estao os pontos que normalmente voce vai editar:

- Disco base:
  .toggleIcon
  - width / height
  - background-color
  - border
  - border-radius
  - box-shadow

- Escala do icone:
  .toggleIconClosed, .toggleIconOpen
  .toggleIconClosed com var --faq-toggle-size

- Estado fechado:
  .messageHeader :global(.accordion-button.collapsed) .toggleIcon
  .messageHeader :global(.accordion-button.collapsed) .toggleIconClosed

- Mobile:
  @media (max-width: 576px) -> .toggleIcon e --faq-toggle-size

## Como alterar sem erro
## 1) Mudar apenas a cor do icone fechado (seta)
Edite somente:
- .messageHeader :global(.accordion-button.collapsed) .toggleIconClosed

Exemplo de intencao:
- color: #ff9e00;

Nao altere os seletores de visibilidade.

## 2) Mudar apenas a cor de fundo do disco fechado
Edite somente:
- .messageHeader :global(.accordion-button.collapsed) .toggleIcon

Exemplo de intencao:
- background-color: ...

## 3) Mudar apenas a borda do disco fechado
Edite somente:
- .messageHeader :global(.accordion-button.collapsed) .toggleIcon

Exemplo de intencao:
- border: ...

## 4) Mudar tamanho do disco
Edite:
- .toggleIcon -> width e height (desktop)
- @media (max-width: 576px) .toggleIcon -> width e height (mobile)

## 5) Mudar tamanho do icone
Edite:
- .toggleIconClosed, .toggleIconOpen (font-size)
- se usar variavel, ajuste --faq-toggle-size em desktop e mobile

## 6) Trocar o icone da seta para baixo
No arquivo faq_section_ds.js:
1. ajuste o import em @fortawesome/free-solid-svg-icons
2. ajuste a prop icon do FontAwesomeIcon que usa className styles.toggleIconClosed

Nao altere className, para nao quebrar CSS.

## Regras que nao devem ser removidas
1. Remocao da seta nativa do Bootstrap:
- .messageHeader :global(.accordion-button)::after { display: none; ... }

2. Visibilidade por estado:
- aberto mostra apenas .toggleIconOpen
- fechado mostra apenas .toggleIconClosed

3. Espaco lateral para nao sobrepor texto e disco:
- .questionRow padding-right
- max-width dos baloes via --faq-bubble-max-width

## Checklist de validacao visual
Apos qualquer alteracao, validar:

1. Desktop
- Item fechado: so seta para baixo aparece
- Item aberto: so icone de aberto aparece
- Nenhum segundo icone aparece junto
- Nao aparece seta nativa do Bootstrap

2. Mobile (largura <= 576px)
- Disco continua alinhado
- Texto da pergunta nao invade o disco
- Nao existe corte do icone dentro do disco

3. Estados
- Abrir e fechar varios itens
- Confirmar que a troca de icones ocorre em todos

## Problemas comuns e correcao rapida
Problema: aparece um icone antigo junto
- Causa: regra ::after do Bootstrap ativa
- Correcao: garantir .messageHeader :global(.accordion-button)::after com display none e background-image none

Problema: icone errado aparece no estado fechado
- Causa: regra de visibilidade invertida
- Correcao: collapsed deve mostrar .toggleIconClosed e ocultar .toggleIconOpen

Problema: texto da pergunta cobre o disco
- Causa: falta de espaco lateral
- Correcao: revisar .questionRow padding-right e max-width dos baloes

Problema: estilo muda no mobile
- Causa: ajuste so no desktop
- Correcao: replicar ajuste em @media (max-width: 576px)

## Fluxo recomendado para edicoes futuras
1. Alterar um aspecto por vez (cor, tamanho, borda, icone)
2. Salvar e validar desktop
3. Validar mobile
4. So depois passar para o proximo ajuste

Assim voce evita regressao e identifica rapidamente o que cada mudanca impactou.
