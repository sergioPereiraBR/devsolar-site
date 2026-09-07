# Manual de implementação e manutenção do PWA

## Visão geral

Este projeto utiliza um Progressive Web App (PWA) para permitir que o site da DEV Solar seja instalado como aplicativo no navegador e, em parte, mantenha comportamento offline e de melhoria de experiência em dispositivos móveis.

O PWA do projeto é composto por:

- manifest em `/public/manifest.json`
- service worker em `/public/sw.js`
- registro do service worker em `src/components/pwa/ServiceWorkerRegistration.js`
- utilitário de recuperação em `src/components/pwa/serviceWorkerRecovery.js`
- metadados do app em `src/app/layout.js`

## Objetivo

O objetivo do PWA é:

- permitir que o site seja adicionado à tela inicial
- manter aparência e navegação parecidas com um app nativo
- conservar caches de recursos críticos
- reduzir falhas de uso em conexões instáveis
- evitar loops de recuperação em versões antigas do service worker

## Arquitetura atual

### 1. Manifest

O arquivo de manifest define o nome do app, tema, ícones, startup URL e comportamento em tela cheia.

Arquivo principal:

- `/public/manifest.json`

Principais propriedades:

- `name`: nome completo do app
- `short_name`: nome curto exibido em atalhos
- `start_url`: URL inicial ao abrir o app
- `display`: `standalone`
- `scope`: escopo de navegação do app
- `theme_color`: cor temática do navegador
- `background_color`: plano de fundo do splash
- `icons`: conjunto de ícones em tamanhos variados

### 2. Service worker

Arquivo principal:

- `/public/sw.js`

O service worker é o responsável por:

- registrar cache de recursos críticos
- limpar caches antigos
- responder requisições em navegação
- servir fallback para páginas e assets em cenários offline
- permitir atualização segura do worker

A rotina principal do worker:

- instala cache do shell do app
- ativa e remove caches antigos
- intercepta requisições GET
- tenta servir o conteúdo em cache quando a rede não está disponível
- salva respostas recentes de recursos estáticos

### 3. Registro do service worker

Arquivo:

- `src/components/pwa/ServiceWorkerRegistration.js`

Esse módulo roda no cliente e:

- verifica se o ambiente é `production`
- verifica suporte a `navigator.serviceWorker`
- registra o service worker em `/sw.js`
- remove workers antigos que estejam em estado inconsistente
- tenta reconfigurar o worker com guard de recuperação para evitar reinicializações em loop
- dispara aviso manual quando a recuperação automática falhar

### 4. Recuperação e proteção de loop

Arquivo:

- `src/components/pwa/serviceWorkerRecovery.js`

Esse módulo mantém uma chave em `sessionStorage` para impedir que a recuperação automática do PWA execute repetidamente em um curto intervalo.

A lógica é:

- se ainda não houve tentativa recente, permite recuperação
- se a última tentativa foi em menos de 5 minutos, bloqueia nova tentativa
- isso reduz loops de reload em produção

## Como o PWA é iniciado

A configuração principal fica em `src/app/layout.js`.

Ele expõe:

- `manifest: '/manifest.json'`
- ícones do app
- favicon e temas

O componente `ServiceWorkerRegistration` também é renderizado globalmente no layout para ativar o PWA no cliente.

## Regras de funcionamento

### Requisições que devem entrar no cache

O service worker considera como recursos passíveis de cache:

- páginas HTML
- fontes
- imagens
- scripts
- folhas de estilo
- manifest e outros assets do domínio

### Regras de fallback

Quando a rede falha:

- navegações tentam usar cache da página
- a home `'/` é usada como fallback
- recursos estáticos também tentam cair no cache quando disponíveis

## Boas práticas e manutenção

### 1. Atualizar cache quando houver mudança visual ou funcional

Sempre que houver alteração em:

- layout principal
- manifest
- ícones
- arquivos CSS/JS críticos
- home ou páginas principais

revise a estratégia de cache do service worker.

Recomendado:

- trocar o nome do cache, por exemplo `devsolar-shell-v4`
- atualizar a nova versão no service worker
- validar a tela do navegador em produção após deploy

### 2. Não usar reload agressivo em cada atualização

O código do PWA deve evitar:

- `window.location.reload()` em loop em cada atualização de service worker
- remoção repetitiva de workers sem controle
- tentativas de recuperação em cascata

A recuperação deve ser única e temporizada.

### 3. Validar em produção depois de cada deploy

Sempre testar após publicar:

- service worker registrado
- app carregando em HTTPS
- ícones e manifest acessíveis
- instalação do app na tela inicial
- funcionamento normal com rede estável
- comportamento com rede instável

### 4. Se houver problema de staleness

Quando uma instalação antiga do PWA ficar travada:

- limpar dados do site no navegador
- remover o atalho do aplicativo
- recarregar ou reinstalar a página
- verificar se o worker foi atualizado

## Checklist de validação

Use esta checklist após qualquer mudança no PWA:

### Implementação

- [ ] `manifest.json` existe e está acessível
- [ ] `sw.js` está em `/public`
- [ ] `ServiceWorkerRegistration` está montado no layout
- [ ] o browser detecta `navigator.serviceWorker`
- [ ] o app registra o worker em produção

### Funcionamento

- [ ] página carrega normalmente em HTTPS
- [ ] item para instalar na tela inicial aparece
- [ ] app abre em standalone
- [ ] shell principal funciona offline após primeiro carregamento
- [ ] não há loop de reload
- [ ] atualização de versão do worker não trava a sessão

### Recuperação

- [ ] worker antigo é removido quando necessário
- [ ] guard de recuperação evita reinícios repetidos
- [ ] aviso manual aparece apenas em falha real

## Como testar no navegador

### Chrome / Edge

1. Abrir o site em produção
2. abrir DevTools
3. ir em Application > Service Workers
4. verificar se há worker registrado
5. verificar o escopo e a URL do worker
6. conferir Manifest e instalação
7. testar rede offline após carregar a página

### Verificações úteis

- `navigator.serviceWorker.controller`
- `navigator.serviceWorker.getRegistrations()`
- `window.location.reload()` não repetir em loop
- `Manifest` presente e sem erros

## Painel de diagnóstico rápido

Se o PWA quebrar, verificar nesta ordem:

1. `navigator.serviceWorker`
2. registro do service worker
3. status de `active`, `waiting` e `installing`
4. cache atual em Application > Storage
5. manifest e ícones
6. falhas de rede e offline
7. se o worker está em loop de atualização ou reload

## Observações importantes

- O service worker só funciona em HTTPS em produção.
- Em desenvolvimento local, o comportamento pode diferir do ambiente real.
- O caso offline completo de “cold start” depende do navegador e da forma como o app foi cacheado.
- Para um PWA mais robusto, a estratégia ideal é cachear o shell completo e manter em localStorage dados importantes do fluxo, como simulações e resultados recentes.

## Help de utilização

### Para desenvolvedores

Se forem feitas alterações no app, siga este fluxo:

1. alterar manifest ou service worker
2. atualizar nome do cache quando necessário
3. testar em produção em HTTPS
4. limpar cache do navegador se necessário
5. validar se o app instala corretamente

### Para operação/manutenção

Se o site parecer travado:

- testar no navegador em modo normal
- abrir DevTools
- confirmar se o service worker está ativo
- limpar dados do site
- remover atalho do app e reinstalar
- validar a versão de produção após deploy

### Para usuários finais

Se o site abrir com comportamento estranho, o recomendado é:

- fechar a guia do app
- remover o atalho do app da tela inicial
- abrir o site em navegador novamente
- reinstalar o PWA se necessário

## Resumo

O PWA atual do DEV Solar foi implementado com:

- manifest funcional
- registro de service worker
- cache de shell inicial
- proteção contra loops de recuperação
- fallback manual para cenários de worker antigo

A manutenção principal é garantir que qualquer alta mudança no app reflita no cache do worker e que o deploy em produção seja validado no navegador real.
