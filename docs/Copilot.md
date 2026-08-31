# Configuração correta do GitHub Copilot

Este guia mostra como configurar o GitHub Copilot de forma eficiente no VS Code, com foco em produtividade, segurança e qualidade do código. A ideia não é apenas instalar a extensão, mas habilitar o Copilot de maneira que ele funcione bem com o seu projeto e com sua rotina de desenvolvimento.

## 1. Pré-requisitos

Antes de configurar o Copilot, verifique os itens abaixo:

- conta no GitHub ativa;
- acesso ao plano do Copilot (grátis, Pro, Business ou Enterprise, conforme o seu ambiente);
- VS Code instalado;
- acesso ao repositório/projeto no computador;
- permissões adequadas em organizações/empresas, caso o uso seja corporativo.

Se você estiver em uma organização, a administração pode bloquear ou limitar o uso do Copilot. Em alguns casos, o tenant exige que o administrador habilite a funcionalidade antes que os usuários consigam usá-la.

## 2. Instalar as extensões corretas

No VS Code:

1. Abra a aba de Extensões (ícone de blocos no menu lateral esquerdo).
2. Procure por "GitHub Copilot".
3. Instale a extensão "GitHub Copilot".
4. Instale também a extensão "GitHub Copilot Chat" (quando disponível no seu ambiente), porque ela adiciona recursos de conversa, explicação e revisão no editor.
5. Reinicie o VS Code se a instalação solicitar.

Importante: em ambientes corporativos, pode haver diferença entre a extensão pública e a versão disponível para organização. Sempre confirme se a sua conta está autorizada a usar o serviço.

## 3. Fazer login com a conta correta

Depois de instalar as extensões:

1. Clique no ícone de conta no canto inferior esquerdo do VS Code.
2. Selecione "Sign in to GitHub" ou equivalente.
3. Autorize o VS Code a acessar sua conta GitHub.
4. Verifique se o email e a conta correspondem ao plano de Copilot que você deseja usar.

Se o login falhar:

- confirme se você está conectado ao GitHub correto;
- confira se o Copilot está habilitado para a sua conta ou organização;
- atualize o VS Code e as extensões;
- tente sair e entrar novamente.

## 4. Habilitar o Copilot nas configurações

O Copilot normalmente já vem habilitado após login, mas vale confirmar.

No VS Code, abra as Configurações e procure por:

- GitHub Copilot: Enabled
- GitHub Copilot: Chat
- GitHub Copilot: Inline Suggestions

Você também pode alterar as preferências em settings.json. Exemplo:

```json
{
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true,
    "yaml": true,
    "json": true
  },
  "github.copilot.inlineSuggest.enable": true,
  "editor.inlineSuggest.enabled": true,
  "github.copilot.chat.localeOverride": "pt-BR"
}
```

Essas configurações ajudam a garantir que:

- o Copilot esteja ativo em arquivos relevantes;
- sugestões inline funcionem no editor;
- a interface de chat esteja em português se preferir;
- o editor não fique inundado de sugestões em tipos de arquivo que você não quer.

## 5. Configurar o projeto para funcionar melhor

O Copilot funciona melhor quando o projeto fornece contexto. O máximo de contexto que o repositório expõe, melhor será a qualidade das respostas.

### 5.1. Criar instruções do projeto

Crie um arquivo em `.github/copilot-instructions.md` na raiz do projeto. Isso ajuda o Copilot a seguir padrões do seu time.

Exemplo:

```md
# Instruções para o Copilot

- Use TypeScript e mantenha a tipagem estrita.
- Prefira nomes claros e descritivos para variáveis e funções.
- Siga a arquitetura atual do projeto.
- Não faça alterações fora do escopo solicitado.
- Sempre que possível, escreva testes para funções críticas.
- Nunca inclua segredos, chaves, tokens ou credenciais em código.
- Use padrões de estilo já presentes no projeto.
```

Esse arquivo é um dos melhores pontos de configuração para melhorar a qualidade das respostas. Ele atua como “memória do projeto”.

### 5.2. Usar editorconfig e regras de lint

Se o projeto tiver:

- `.editorconfig`
- `eslint.config.js` ou `.eslintrc`
- `tsconfig.json`
- `prettier.config.*`

o Copilot tende a gerar código mais consistente com o padrão do time. É importante manter esses arquivos atualizados.

### 5.3. Definir contexto do código

Sempre abra a pasta certa do projeto no VS Code, e não apenas um arquivo isolado. Quando o workspace estiver bem estruturado, o Copilot consegue entender melhor:

- arquitetura;
- convenções de nomenclatura;
- módulos e dependências;
- padrões de testes e estilo.

## 6. Escolher o modelo correto

Quando você abre o chat do Copilot, normalmente pode escolher entre vários modelos. A escolha depende do caso de uso:

- modelo rápido: melhor para sugestões simples, refatoração básica e explicações curtas;
- modelo mais robusto: melhor para análise mais profunda, correções complexas e revisão de código;
- modelo de raciocínio: útil para tarefas mais difíceis, especialmente com múltiplos arquivos ou requisitos complexos.

Se o seu plano permitir, teste modelos diferentes e escolha o que oferece melhor acurácia para o tipo de projeto que você trabalha.

## 7. Como fazer prompts melhores

Uma configuração correta não depende só da extensão; depende também da qualidade dos prompts. O Copilot produz melhores respostas quando o contexto é claro.

### Prompts bons

- "Explique por que este código falha e sugira uma correção segura."
- "Crie uma função em TypeScript para validar emails e retornar erros específicos."
- "Revise este componente React e me diga se ele segue os padrões do projeto."
- "Adicione testes unitários para este cenário de borda usando Vitest."

### Prompts ruins

- "Arruma isso"
- "Faz o código funcionar"
- "Melhora esse arquivo"

Esses prompts são vagos porque não definem objetivo, contexto, linguagem, limite de escopo nem critério de validação.

## 8. Melhores práticas de uso no dia a dia

### 8.1. Dar contexto explícito

Inclua:

- linguagem e framework;
- comportamento esperado;
- erro real ou requisito;
- arquivo ou função alvo;
- estilo do projeto.

Exemplo:

> "Neste projeto em Node.js com TypeScript, preciso de uma função que valide um payload de cadastro. Ela deve retornar erros específicos para email inválido, senha curta e nome vazio. Use a convenção do projeto e mantenha a resposta compatível com Express.”

### 8.2. Pedir revisão e não execução automática

O Copilot pode sugerir soluções, mas você deve revisar o código antes de aceitar. Sempre verifique:

- segurança;
- performance;
- compatibilidade com a arquitetura atual;
- testes existentes;
- impactos colaterais.

### 8.3. Usar o Copilot para estudar e não apenas para gerar

Além de escrever código, o Copilot é útil para:

- explicar trechos complexos;
- resumir módulos grandes;
- sugerir melhorias de design;
- apontar possíveis bugs;
- gerar testes para cenários não cobertos.

## 9. Segurança e privacidade

Mesmo com Copilot habilitado, o uso responsável é essencial.

### Regras importantes

- nunca cole segredos, tokens, chaves de API, credenciais ou dados pessoais sensíveis em prompts;
- nunca aceite código sem revisar;
- verifique se a solução respeita as políticas de segurança da empresa;
- trate o Copilot como assistente, não como autoridade final;
- confirme o que ele sugere antes de subir para produção.

Se você estiver em uma empresa, confira também as políticas internas de uso de IA e armazenamento de prompts. Isso pode afetar como o Copilot se comporta no ambiente corporativo.

## 10. Validação do código gerado

Depois que o Copilot gerar algo, sempre valide:

1. execute testes;
2. rode lint e build;
3. verifique se não houve regressões;
4. confirme se o código atende ao padrão do projeto;
5. revise se a solução realmente resolve o problema, e não apenas parece funcionar.

Arquivo de referência:

```bash
npm test
npm run lint
npm run build
```

Ou os comandos equivalentes do seu projeto.

## 11. Solução de problemas comuns

### Copilot não aparece no VS Code

Verifique:

- se a extensão está instalada e ativada;
- se você está logado com a conta correta;
- se o plano do Copilot está ativo;
- se a organização não bloqueou o uso;
- se o VS Code está atualizado.

### Sugestões não aparecem

Verifique:

- configuração de `editor.inlineSuggest.enabled`;
- extensão ativa;
- projeto aberto corretamente;
- limitações do ambiente ou organização.

### Respostas ruins ou irrelevantes

Melhore o contexto:

- forneça mais detalhes do problema;
- mostre o erro real;
- mencione linguagem, framework e regra do projeto;
- use prompts bem definidos.

### Erros de autenticação

- saia da conta do GitHub no VS Code;
- remova e reinstale as extensões;
- efetue login novamente;
- confirme que seu token/conta ainda é válido.

## 12. Checklist final de configuração

Antes de usar o Copilot com eficiência, confirme:

- [ ] conta do GitHub vinculada ao Copilot;
- [ ] extensões instaladas e atualizadas;
- [ ] VS Code autenticado;
- [ ] projeto aberto corretamente;
- [ ] regras do projeto definidas em `.github/copilot-instructions.md`;
- [ ] lint/test/build funcionando;
- [ ] prompts específicos e bem escritos;
- [ ] revisão humana do código antes de aceitar a resposta.

## 13. Recomendação prática

A melhor configuração de Copilot não é apenas “instalar e usar”. O ideal é combinar:

- autenticação correta;
- extensões ativas;
- projeto com contexto;
- instruções claras do time;
- prompts bem definidos;
- revisão crítica do código.

Quando essas condições existem, o Copilot deixa de ser apenas uma ferramenta de autocomplete e passa a funcionar como um parceiro de desenvolvimento útil, estável e seguro.

## 14. Conclusão

Configurar o Copilot corretamente é mais simples do que parece, mas exige atenção a alguns pontos que fazem toda a diferença: conta, extensão, autenticação, contexto do workspace, instruções do projeto e revisão do código gerado. Com esse setup básico, você terá uma experiência muito mais consistente e produtiva.

Se você quiser, pode transformar este guia em uma versão específica para:

- JavaScript/TypeScript;
- Python;
- Java;
- .NET;
- projetos corporativos com políticas internas;
- uso com VS Code + GitHub Enterprise.
