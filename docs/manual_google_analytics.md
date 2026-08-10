# Manual de configuração do Google Analytics para o site DEV Solar

## 1. Objetivo

Este manual descreve como configurar e manter o envio de eventos e parâmetros para o Google Analytics 4 (GA4) no projeto da DEV Solar. O objetivo é garantir que interações importantes do usuário sejam registradas de forma consistente, legível e útil para análise.

---

## 2. Arquivos principais envolvidos

O rastreamento do site está centralizado em dois pontos principais:

- src/lib/analytics.js

  - Contém a função principal de envio de eventos para o GA4.
  - Também implementa o rastreamento global de cliques em elementos interativos.

- src/app/layout.js
  - Carrega o script do Google Analytics e inicializa o GA4 no projeto.
  - Espera a variável de ambiente NEXT_PUBLIC_GA_ID.

---

## 3. Configuração inicial do GA4

### 3.1. Defina o ID de medição

No ambiente do projeto, defina a variável abaixo:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Use este valor no arquivo de ambiente local ou de produção, por exemplo:

- .env.local
- .env.production

### 3.2. Verifique se o script está sendo carregado

No arquivo src/app/layout.js, o script do GA4 é carregado de forma assíncrona e só é inicializado quando existe um ID válido.

O fluxo é:

1. O site lê a variável NEXT_PUBLIC_GA_ID.
2. O script do Google Analytics é carregado no navegador.
3. O GA4 é inicializado com o ID de medição.

Se o ID estiver vazio, o rastreamento não será ativado.

---

## 4. Como os dados são enviados

O envio de eventos é feito por meio da função abaixo, localizada em src/lib/analytics.js:

```js
export function trackEvent(eventName, params = {}) {
  if (!eventName) return;
  queueGtagCall('event', eventName, params);
}
```

Isso significa que qualquer evento enviado deve seguir esta estrutura:

```js
trackEvent('nome_do_evento', {
  parametro_1: 'valor',
  parametro_2: 'valor',
});
```

Exemplo real:

```js
trackEvent('contact_click', {
  contact_channel: 'whatsapp',
  location: 'footer',
  label: 'whatsapp_contact',
});
```

---

## 5. Eventos já configurados no projeto

O projeto já envia eventos para diferentes ações do usuário. Abaixo está a lista dos principais eventos implementados ou compatíveis com o rastreamento atual.

### 5.1. Rastreamento global de cliques

O arquivo src/lib/analytics.js também dispara automaticamente um evento para qualquer clique em elementos interativos:

```js
trackEvent('user_click', {
  element,
  label,
  href,
  id,
  class_name,
  location,
  section,
  path,
});
```

Esse evento é disparado para:

- links
- botões
- inputs
- selects
- textareas
- summaries
- elementos com role button/link/menuitem
- elementos com onclick ou tabindex=0

### 5.2. Eventos de contato

- contact_click
  - Usado para cliques em canais de contato, como WhatsApp ou telefone.

### 5.3. Eventos de navegação

- navigation_click
  - Usado ao clicar em links de navegação do cabeçalho, rodapé ou menus.

### 5.4. Eventos de formulário

- contact_form_submit_attempt
- contact_form_submit_success
- contact_form_submit_error

- specialist_form_submit_attempt
- specialist_form_validation_error

- newsletter_submit_attempt
- newsletter_submit_success
- newsletter_submit_error

### 5.5. Eventos de cálculo / simulador

- calculator_submit_attempt
- calculator_validation_error
- calculator_result_generated
- calculator_result_error

### 5.6. Eventos de FAQ e modal

- faq_question_submit
- faq_item_open
- faq_emoji_picker_toggle
- modal_open
- modal_close
- outbound_click
- social_click

---

## 6. Parâmetros recomendados para enviar

Para facilitar a análise, o ideal é padronizar os parâmetros enviados com cada evento.

### 6.1. Parâmetros genéricos

Os mais úteis para o projeto são:

- location

  - Identifica a seção ou bloco onde a interação ocorreu.
  - Exemplos: header, footer, hero, faq, contact

- section

  - Define a área semântica do site.
  - Exemplos: main, contact, benefits, success_stories

- label

  - Nome amigável para o elemento ou CTA.
  - Exemplos: whatsapp_contact, abrir_modal, ver_mais

- path

  - Caminho da página atual.
  - Ajuda a segmentar por URL.

- href

  - URL destino do clique, se houver.

- id

  - Identificador do elemento.

- class_name
  - Classe do elemento, útil para depuração.

### 6.2. Parâmetros específicos por fluxo

Exemplos:

- contact_channel

  - whatsapp, telefone, email

- form_type

  - contact, specialist, newsletter

- status

  - success, error, attempt

- error_message
  - mensagem do erro de validação

---

## 7. Como configurar campos personalizados no GA4

No GA4, os parâmetros enviados no evento podem ser utilizados como dados de análise, mas é recomendável configurá-los como campos personalizados para facilitar a visualização em relatórios.

### 7.1. Acesse o GA4

1. Entre no Google Analytics.
2. Vá em Admin.
3. Acesse Custom definitions.
4. Clique em Create custom dimensions.

### 7.2. Crie dimensões personalizadas para os parâmetros mais importantes

Recomendação para este projeto:

- location
- section
- label
- contact_channel
- path
- form_type
- status

### 7.3. Defina corretamente o tipo de dimensão

Use:

- Dimension scope: Event

Isso faz com que a dimensão seja aplicada ao evento enviado.

---

## 8. Como adicionar um novo evento ao projeto

### 8.1. Importe a função de rastreamento

```js
import { trackEvent } from '@/lib/analytics';
```

### 8.2. Dispare o evento no ponto certo do fluxo

Exemplo:

```js
trackEvent('button_click', {
  location: 'hero',
  section: 'home',
  label: 'saiba_mais',
});
```

### 8.3. Use nomes consistentes

Recomendações:

- usar snake_case para nomes de eventos
- manter nomes curtos e descritivos
- evitar variações aleatórias de texto

Exemplos corretos:

- contact_click
- newsletter_submit_success
- modal_open

Exemplos a evitar:

- ContactClick
- newsletterSubmitSuccess
- abrirModal

---

## 9. Como marcar elementos para melhorar o rastreamento

O rastreamento global já tenta inferir dados automaticamente, mas você pode melhorar a qualidade dos eventos adicionando atributos específicos aos elementos HTML.

### 9.1. data-analytics-label

Use para definir um rótulo explícito.

```html
<button data-analytics-label="contratar_agora">Contratar agora</button>
```

### 9.2. data-analytics-location

Use para informar onde o elemento está localizado.

```html
<button data-analytics-location="hero">Solicitar orçamento</button>
```

### 9.3. data-analytics-section

Use para informar a seção do site.

```html
<button data-analytics-section="home">Solicitar orçamento</button>
```

### 9.4. data-analytics-ignore="true"

Use para ignorar elementos que não devem gerar rastreamento.

```html
<button data-analytics-ignore="true">Não rastrear</button>
```

---

## 10. Boas práticas de rastreamento

- Evite enviar muitas informações irrelevantes.
- Prefira parâmetros padronizados.
- Mantenha consistência entre eventos e nomes de parâmetros.
- Não envie dados pessoais sensíveis.
- Use eventos para ações importantes, não para cada detalhe de interface.
- Teste sempre em ambiente de desenvolvimento antes de publicar.

---

## 11. Como validar se o rastreamento está funcionando

### 11.1. Verifique o ambiente local

1. Abra o site localmente.
2. Acesse a ferramenta de desenvolvedor do navegador.
3. Vá até a aba Rede ou Console.
4. Clique em elementos do site.
5. Confirme que o evento aparece no console ou que o payload é enviado para a camada dataLayer.

### 11.2. Use o modo de depuração do GA4

No Google Analytics, você pode verificar se os eventos estão chegando em tempo real:

1. Abra o GA4.
2. Entre em Reports.
3. Acesse Realtime.
4. Interaja com o site.
5. Confirme se os eventos aparecem.

### 11.3. Teste fluxos principais

Teste pelo menos:

- clique em botão de WhatsApp
- clique em navegação do header
- envio de formulário de contato
- envio da newsletter
- abertura de modal
- clique em links externos

---

## 12. Checklist de implantação

Antes de publicar alterações de rastreamento, confirme:

- [ ] a variável NEXT_PUBLIC_GA_ID está definida corretamente
- [ ] o GA4 está carregando sem erro
- [ ] os eventos principais estão sendo disparados
- [ ] os parâmetros importantes foram definidos como dimensões personalizadas
- [ ] os nomes dos eventos seguem um padrão consistente
- [ ] o site foi testado em ambiente real

---

## 13. Troubleshooting

### O evento não aparece no GA4

Possíveis causas:

- o ID de medição está incorreto
- o script não carregou corretamente
- o navegador bloqueou o script
- a função trackEvent não foi chamada corretamente
- o evento foi disparado antes do GA4 estar pronto

### O evento aparece, mas sem os parâmetros esperados

Possíveis causas:

- o parâmetro foi nomeado diferente do esperado
- a dimensão personalizada não foi criada no GA4
- o valor do parâmetro está vazio

### O rastreamento global dispara demais

Se isso acontecer, use:

- data-analytics-ignore="true"
- marcadores mais específicos para elementos importantes
- eventos manuais mais precisos em vez de depender apenas do clique global

---

## 14. Resumo

Para manter o Google Analytics bem configurado neste projeto:

1. mantenha o ID de medição correto;
2. use eventos padronizados e legíveis;
3. envie parâmetros úteis como location, section, label e path;
4. configure dimensões personalizadas no GA4;
5. teste os fluxos principais antes de publicar.
