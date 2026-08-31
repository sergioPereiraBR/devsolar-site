# SITE

## TODO - IMPORTANTE e URGENTE

- [ ] a página da dev solar inicia em benefícios quando é carregada ou recarregada
- [x] Corrigir o mapa da localidade, não está renderizando
- [ ] Corrigir a interação do botão Falar com Especialista
- [x] Corrigir aparência do botão Economizar Energia

## TODO - IMPORTANTE

- [x] Melhorar a tela de Cálculo de Investimento com título responsivo
- [ ] Ativar texto de resposta para leitura através do botão recolhido para ver se melhora na acessibilidade
- [ ] Ajusta responsividade do rodapé e limitação da distância da borda
- [ ] Corrigir mensagem do botão Entrar de cliente para atendimento remoto

## TODO - MELHORIAS

- [ ] Na tela de Cálculo de Investimento fazer um modal com um botão Orçamento:
- [x] Telefone
- [x] Nome
- [x] CEP
- [ ] Tipo de Cobertura (Telhado): [Cerâmica, Fibrocimento, Metálica]
- [ ] Área disponível no telhado: 5x10m²
- [ ] Potência prevista:
- [ ] Nº de Placas solares previsto: 40
- [ ] Forma de Investimento: Cartão de Crédito
- [ ] Forma de Pagamento: 24x
- [ ] Previsão de Instalação: 1 mês
- [ ] Outras propostas em mãos: Sim
- [ ] Melhorar a tela de Cálculo de Investimento para ter mais interatividade e para cada modalidade de cliente e serviço
- [ ] Ativar rotação automática no tablet e verificar no celular

---

Descrição
URLs que não possuem o cabeçalho de resposta HSTS. O cabeçalho de resposta HTTP Strict-Transport-Security (HSTS) instrui os navegadores a acessarem o site somente por HTTPS, e não por HTTP. Se um site aceita uma conexão HTTP antes de ser redirecionado para HTTPS, os visitantes inicialmente se comunicarão por HTTP. O cabeçalho HSTS instrui o navegador a nunca carregar o conteúdo via HTTP e a converter automaticamente todas as solicitações para HTTPS.

Como corrigir

- [x] O cabeçalho HSTS deve ser usado em todas as páginas para instruir o navegador a sempre solicitar páginas via HTTPS, em vez de HTTP.
- [x] Referrer-Policy e Content-Security-Policy.

---

Descrição
URLs que não possuem as políticas 'no-referrer-when-downgrade', 'strict-origin-when-cross-origin', 'no-referrer' ou 'strict-origin' no cabeçalho Referrer-Policy. Ao usar HTTPS, é importante que as URLs não apresentem vazamento de informações em solicitações que não sejam HTTPS. Isso pode expor os usuários a ataques "homem no meio", já que qualquer pessoa na rede pode visualizá-los.

Como corrigir

- [x] Considere definir uma política de referenciador com o valor strict-origin-when-cross-origin. Isso preserva grande parte da utilidade do referenciador, mitigando o risco de vazamento de dados entre origens diferentes.

---

Descrição
URLs que não possuem o cabeçalho de resposta Content-Security-Policy. Esse cabeçalho permite que um site controle quais recursos são carregados em uma página. Essa política pode ajudar a proteger contra ataques de cross-site scripting (XSS) que exploram a confiança do navegador no conteúdo recebido do servidor. O SEO Spider verifica apenas a existência do cabeçalho e não analisa as políticas encontradas dentro dele para determinar se estão configuradas corretamente para o site. Isso deve ser feito manualmente.

Como corrigir

- [x] Defina um cabeçalho de resposta Content-Security-Policy estrito em todas as páginas para ajudar a mitigar ataques de cross-site scripting (XSS) e injeção de dados.

---

Descrição
URLs internas com erro do lado do cliente. Isso indica que ocorreu um problema com a solicitação da URL e pode incluir respostas como 400 (Solicitação Inválida), 403 (Proibido), 404 (Página Não Encontrada), 410 (Removido), 429 (Muitas Solicitações) e outras. O erro 404 (Página Não Encontrada) é o mais comum e geralmente é chamado de link quebrado. Visualize as URLs que apontam para erros usando a guia "Links Internos" na parte inferior e exporte-as em massa através de "Exportação em Massa > Códigos de Resposta > Internos > Links Internos com Erro do Cliente (4xx)".

Como Corrigir
Idealmente, todos os links em um site devem resolver para URLs com código 200 (OK). Erros como 404 ou 410 devem ser atualizados para seus locais corretos, removidos e redirecionados quando apropriado. Um erro 403 (Proibido) ocorre quando um servidor web nega o acesso à solicitação do SEO Spider e geralmente pode ser resolvido alterando o user-agent para Chrome em 'Configurações > User-Agent' e realizando um novo rastreamento.

---

Descrição
Imagens grandes acima de um limite de tamanho. A velocidade da página é extremamente importante para os usuários e para o SEO, e recursos grandes, como imagens, são frequentemente um dos problemas mais comuns que tornam as páginas da web lentas. Este filtro serve como uma regra geral para ajudar a identificar imagens com tamanho de arquivo relativamente grande e que podem demorar mais para carregar. Essas imagens devem ser consideradas para otimização, juntamente com as oportunidades identificadas na guia PageSpeed, que usa a API PSI e o Lighthouse para auditar a velocidade. Isso pode ajudar a identificar imagens que não foram otimizadas em tamanho, carregam fora da tela, estão desbalanceadas etc.

Como corrigir
Imagens não compactadas aumentam o tamanho das páginas com bytes desnecessários, portanto, certifique-se de que as imagens estejam otimizadas com compactação, dimensionadas corretamente e usando o melhor formato de imagem para reduzir o tamanho do arquivo sempre que possível.

---

Descrição
O texto desta página é muito difícil de ler e, de acordo com a fórmula de legibilidade de Flesch, é mais bem compreendido por pessoas com formação universitária. Textos com frases longas e palavras complexas geralmente são mais difíceis de ler e entender.

Como corrigir
Considere melhorar a legibilidade do texto para o seu público-alvo. Textos com frases mais curtas e palavras menos complexas costumam ser mais fáceis de ler e entender.

---

Descrição
Páginas com múltiplos <h2>s. Isso não é um problema, pois os padrões HTML permitem múltiplos <h2>s quando usados ​​em uma estrutura de cabeçalho hierárquica lógica. No entanto, este filtro pode ajudar você a verificar rapidamente se eles estão sendo usados ​​corretamente.

Como corrigir
Certifique-se de que os <h2>s sejam usados ​​em uma estrutura de cabeçalho hierárquica lógica e atualize-os quando necessário, utilizando toda a classificação de cabeçalho (h3 - h6) para cabeçalhos adicionais.

---

Descrição
Páginas que possuem <h2>s que excedem o limite configurado. Não há um limite rígido para o número de caracteres em um <h2>, porém eles devem ser claros e concisos para os usuários, e títulos longos podem ser menos úteis.

Como corrigir
Escreva <h2>s concisos para os usuários, incluindo palavras-chave relevantes sempre que forem naturais para eles — sem excesso de palavras-chave.

---

Descrição
Páginas com títulos abaixo do limite configurado. Isso não é necessariamente um problema, mas indica que pode haver espaço para incluir palavras-chave adicionais ou comunicar seus diferenciais competitivos.

Como corrigir
Considere atualizar o título da página para aproveitar o espaço disponível e incluir palavras-chave adicionais ou diferenciais competitivos.

---

Descrição
Páginas com títulos muito mais curtos do que o limite de pixels estimado pelo Google. Isso não é necessariamente um problema, mas indica que pode haver espaço para incluir palavras-chave adicionais ou comunicar seus diferenciais competitivos.

Como corrigir
Considere atualizar o título da página para aproveitar o espaço disponível e incluir palavras-chave adicionais ou diferenciais competitivos.

---
