# Manual de configuração do Google Analytics via GTM para o site DEV Solar

## 1. Objetivo

Este manual descreve como configurar e manter o envio de eventos e parâmetros para o Google Analytics 4 (GA4) usando exclusivamente o Google Tag Manager (GTM). O site envia eventos para o `dataLayer`; o GTM é responsável por encaminhá-los ao GA4.

---

## 2. Arquivos principais envolvidos

O rastreamento do site está centralizado em dois pontos principais:

- src/lib/analytics.js

  - Contém a função principal de envio de eventos para o GA4.
  - Também implementa o rastreamento global de cliques em elementos interativos.

- src/app/layout.js

  - Carrega exclusivamente o container do Google Tag Manager.

- src/lib/analytics.js
  - Publica eventos como objetos no `dataLayer`, no formato esperado pelo GTM.

---

## 3. Configuração inicial do GTM e GA4

### 3.1. Configure o container no GTM

O container usado pelo site é `GTM-T5L82K9C`. No painel do GTM:

1. Crie uma variável constante com o ID de medição do GA4, por exemplo `G-XXXXXXXXXX`.
2. Crie uma tag **Google Analytics: evento do GA4**.
3. Na tag, use a variável integrada `{{Event}}` como nome do evento.
4. Configure os parâmetros necessários como variáveis de camada de dados, usando os mesmos nomes enviados pelo site.
5. Crie um acionador **Evento personalizado** com `Nome do evento` igual a `.*` e habilite a correspondência por expressão regular, ou crie acionadores específicos para os eventos relevantes.
6. Associe o acionador à tag e publique a versão do container.

O GA4 não deve ser carregado diretamente no código. Não adicione `NEXT_PUBLIC_GA_ID` ao ambiente da aplicação.

### 3.2. Verifique se o GTM está sendo carregado

O arquivo `src/app/layout.js` carrega o container GTM em todas as rotas:

1. O site carrega o container `GTM-T5L82K9C`.
2. A função `trackEvent` publica um objeto no `dataLayer`.
3. O acionador de evento personalizado do GTM identifica o campo `event`.
4. A tag GA4 do GTM encaminha o evento ao Google Analytics.

---

## 4. Como os dados são enviados ao GTM

O envio de eventos é feito por meio da função abaixo, localizada em src/lib/analytics.js:

```js
export function trackEvent(eventName, params = {}) {
  if (!eventName) return;
  window.dataLayer.push({ event: eventName, ...params });
}
```

Isso significa que qualquer evento enviado deve seguir esta estrutura:

```js
trackEvent('nome_do_evento', {
  parametro_1: 'valor',
  parametro_2: 'valor',
});
```

O resultado no `dataLayer` será equivalente a:

```js
{
  event: 'nome_do_evento',
  parametro_1: 'valor',
  parametro_2: 'valor',
}
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

### 6.1. Tabela de variáveis de rastreamento

| Variável             | Descrição                                                                                   | Fase no funil            |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------ |
| `location`           | Identifica onde a interação ocorreu, como hero, footer, contact_section ou calculator_hero. | Atração / Engajamento    |
| `section`            | Indica a seção do site em que o evento aconteceu.                                           | Atração / Engajamento    |
| `label`              | Rótulo do CTA ou ação, útil para identificar botões e links.                                | Consideração / Conversão |
| `path`               | Caminho da página atual no navegador.                                                       | Atração / Análise        |
| `form_type`          | Tipo de formulário envolvido, como contact, specialist ou calculator.                       | Consideração / Conversão |
| `status`             | Estado do evento: attempt, success, error ou click.                                         | Conversão / Atrito       |
| `failed_field`       | Campo que gerou erro ou atrito na validação.                                                | Atrito / Queda           |
| `monthly_bill_range` | Faixa estimada de valor da conta de luz para qualificar o lead sem expor dados pessoais.    | Qualificação             |
| `property_type`      | Tipo de imóvel associado ao lead, como residential, commercial ou condominium.              | Qualificação             |
| `contact_channel`    | Canal de contato utilizado, como whatsapp, phone ou email.                                  | Conversão                |
| `monthly_cost`       | Valor mensal usado na calculadora.                                                          | Qualificação             |
| `payback_years`      | Tempo estimado de retorno do investimento.                                                  | Qualificação / Conversão |
| `reason`             | Motivo do erro ou falha de validação.                                                       | Atrito / Queda           |
| `target`             | Destino do clique de navegação.                                                             | Engajamento              |
| `href`               | URL alvo do elemento clicado.                                                               | Engajamento / Conversão  |
| `id`                 | Identificador do elemento HTML.                                                             | Engajamento              |
| `class_name`         | Classe CSS do elemento, útil para análise técnica.                                          | Engajamento              |
| `element`            | Tipo de elemento clicado (button, a, input etc.).                                           | Engajamento              |
| `message_length`     | Tamanho da mensagem enviada em fluxos de FAQ ou WhatsApp.                                   | Engajamento              |
| `faq_id`             | Identificador da pergunta do FAQ aberta.                                                    | Consideração             |
| `faq_question`       | Texto da pergunta do FAQ.                                                                   | Consideração             |
| `network`            | Rede social ou canal externo clicado.                                                       | Engajamento              |
| `destination`        | URL de destino do clique externo.                                                           | Engajamento              |
| `modal_name`         | Nome do modal aberto.                                                                       | Consideração / Conversão |
| `opened`             | Estado de abertura/fechamento de um componente.                                             | Engajamento              |

### 6.2. Funil de conversão recomendado

A estrutura ideal para análise de CRO é seguir o fluxo abaixo:

1. Atração / Engajamento

   - Eventos de clique, navegação, abertura de modal e interação com CTAs.
   - Exemplo: `user_click`, `navigation_click`, `modal_open`.

2. Consideração

   - Interações que mostram interesse, como abrir FAQ, abrir modal de contato e iniciar formulários.
   - Exemplo: `faq_item_open`, `specialist_form_submit_attempt`, `contact_form_submit_attempt`.

3. Conversão

   - Ações com maior intenção de lead, como envio de formulário e clique em canais diretos.
   - Exemplo: `contact_form_submit_success`, `specialist_form_submit_success`, `contact_click`.

4. Qualificação / Atrito
   - Eventos que ajudam a entender se o lead está bem qualificado ou se há barreiras de conversão.
   - Exemplo: `calculator_result_generated`, `calculator_validation_error`, `contact_form_validation_error`.

Essa estrutura permite identificar não só se a pessoa converteu, mas também onde ela abandonou ou teve atrito.

### 6.3. Parâmetros específicos por fluxo

Exemplos:

- contact_channel

  - whatsapp, telefone, email

- form_type

  - contact, specialist, newsletter

- status

  - success, error, attempt

- error_message

  - mensagem do erro de validação

- failed_field

  - campo que causou a falha de validação, como phone_number ou email

- monthly_bill_range

  - faixa de valor da conta de luz, útil para entender a qualificação do lead sem expor dados pessoais

- property_type
  - tipo de imóvel, como residential, commercial ou condominium

Exemplo recomendado para a calculadora:

```js
trackEvent('calculator_result_generated', {
  monthly_bill_range: '500_1000',
  property_type: 'residential',
  location: 'calculator_hero',
});
```

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

- failed_field

  - campo que causou a falha de validação, como phone_number ou email

- monthly_bill_range

  - faixa de valor da conta de luz, útil para entender a qualificação do lead sem expor dados pessoais

- property_type
  - tipo de imóvel, como residential, commercial ou condominium

Exemplo recomendado para a calculadora:

```js
trackEvent('calculator_result_generated', {
  monthly_bill_range: '500_1000',
  property_type: 'residential',
  location: 'calculator_hero',
});
```

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
- failed_field
- monthly_bill_range
- property_type

### 7.3. Defina corretamente o tipo de dimensão

Use:

- Dimension scope: Event

Isso faz com que a dimensão seja aplicada ao evento enviado.

### 7.4. Marque eventos principais para CRO

Para maximizar a análise de conversão, configure no GA4 os eventos de sucesso como Eventos Principais (Key Events). Isso permite medir melhor a taxa de conversão e entender quais passos do funil têm maior impacto.

Eventos recomendados para marcar como principais:

- contact_form_submit_success
- specialist_form_submit_success
- calculator_result_generated
- contact_click quando contact_channel for whatsapp

Ação prática no GA4:

1. Acesse Admin > Events.
2. Localize os eventos acima.
3. Marque-os como Eventos Principais.

Esses eventos devem ser tratados como conversões prioritárias, principalmente em campanhas de captação de leads e contatos qualificados.

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
- Priorize o rastreamento do funil de conversão: attempt → success/error.
- Use atributos data-analytics-\* para identificar CTAs, blocos e seções que geram mais contatos.
- Acompanhe fricção de conversão com eventos de erro e detalhes de campo falho.

---

## 11. Como validar se o rastreamento está funcionando

### 11.1. Verifique o ambiente local

1. Abra o site localmente.
2. Acesse a ferramenta de desenvolvedor do navegador.
3. Vá até a aba Rede ou Console.
4. Clique em elementos do site.
5. Confirme que o evento aparece no console ou que o payload é enviado para a camada dataLayer.

### 11.2. Use o modo de pré-visualização do GTM

No GTM, abra **Visualizar** e conecte ao site:

1. Abra o container `GTM-T5L82K9C`.
2. Inicie o modo de pré-visualização.
3. Interaja com o site.
4. Confirme que os eventos aparecem como eventos personalizados.
5. Confirme que a tag GA4 é acionada e recebe os parâmetros.

Depois, no GA4:

1. Acesse **Relatórios > Tempo real**.
2. Interaja com o site.
3. Confirme se os eventos aparecem.

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

- [ ] o container GTM correto está publicado
- [ ] a tag GA4 está configurada dentro do GTM
- [ ] o acionador de evento personalizado está configurado
- [ ] os eventos principais estão sendo disparados
- [ ] os parâmetros importantes foram definidos como dimensões personalizadas
- [ ] os nomes dos eventos seguem um padrão consistente
- [ ] o site foi testado em ambiente real

---

## 13. Troubleshooting

### O evento não aparece no GA4

Possíveis causas:

- o ID do container GTM ou do GA4 está incorreto
- o container GTM não foi publicado
- o navegador bloqueou o script
- a função trackEvent não foi chamada corretamente
- não existe uma tag GA4 do GTM associada ao acionador

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

1. mantenha o container GTM correto publicado;
2. mantenha o ID de medição apenas na configuração da tag do GTM;
3. use eventos padronizados e legíveis;
4. envie parâmetros úteis como location, section, label e path;
5. configure dimensões personalizadas no GA4;
6. teste os fluxos principais antes de publicar.
