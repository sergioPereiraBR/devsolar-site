import LegalPageLayout from '@/components/devsolar/estructure/body/main/legal_page_layout';

export const metadata = {
  title: 'Política de Privacidade',
  description:
    'Entenda como a DEV Solar coleta, utiliza, armazena e protege seus dados pessoais em nosso site, em conformidade com a LGPD.',
  metadataBase: new URL('https://www.devsolar.com.br/'),
  alternates: {
    canonical: 'politica-de-privacidade/',
  },
  keywords: [
    'politica de privacidade dev solar',
    'protecao de dados dev solar',
    'lgpd dev solar',
    'privacidade dev solar',
    'dev solar',
  ],
  authors: [{ name: 'DEV Solar Eficiência Energética Ltda.' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Política de Privacidade | DEV Solar',
    description:
      'Entenda como a DEV Solar trata e protege seus dados pessoais de acordo com as normas de privacidade e LGPD.',
    url: 'https://www.devsolar.com.br/politica-de-privacidade/',
    siteName: 'DEV Solar',
    locale: 'pt_BR',
    type: 'website',
  },
  other: {
    publisher: 'DEV Solar Eficiência Energética Ltda.',
    copyright: '© 2026 DEV Solar - Todos os direitos reservados.',
  },
};

// const sections = [
//   {
//     title: '1. Informações que coletamos',
//     content: (
//       <>
//         <p>
//           Coletamos informações fornecidas diretamente por você, como nome,
//           e-mail, telefone, mensagem e dados de navegação necessários para
//           melhorar sua experiência em nosso site.
//         </p>
//       </>
//     ),
//   },
//   {
//     title: '2. Como usamos suas informações',
//     content: (
//       <>
//         <p>
//           Utilizamos seus dados para responder solicitações, oferecer
//           orçamentos, enviar comunicações relevantes, melhorar nossos serviços e
//           cumprir obrigações legais.
//         </p>
//       </>
//     ),
//   },
//   {
//     title: '3. Compartilhamento de dados',
//     content: (
//       <>
//         <p>
//           Seus dados podem ser compartilhados com parceiros e prestadores de
//           serviço que atuam em nossa operação, sempre sob obrigações de
//           confidencialidade e segurança.
//         </p>
//       </>
//     ),
//   },
//   {
//     title: '4. Segurança',
//     content: (
//       <>
//         <p>
//           Adotamos medidas técnicas e organizacionais para proteger seus dados
//           contra acesso não autorizado, uso indevido ou perda.
//         </p>
//       </>
//     ),
//   },
//   {
//     title: '5. Seus direitos',
//     content: (
//       <>
//         <p>
//           Você pode solicitar acesso, correção, exclusão ou atualização de seus
//           dados, bem como revogar consentimentos, por meio de contato com a DEV
//           Solar.
//         </p>
//       </>
//     ),
//   },
// ];

const sections = [
  {
    title: '1. Informações que coletamos',
    content: (
      <>
        <p>
          Coletamos informações pessoais fornecidas diretamente por você ao
          preencher formulários de contato, solicitar orçamentos de sistemas
          fotovoltaicos ou interagir com nossos canais de atendimento. Esses
          dados incluem seu nome completo, endereço de e-mail, número de
          telefone com WhatsApp, endereço de instalação do projeto e dados do
          seu consumo de energia.
        </p>
        <p>
          Além disso, coletamos automaticamente dados técnicos durante a sua
          navegação em nosso site, tais como seu endereço IP, tipo de navegador,
          páginas visitadas, tempo de permanência e dados de cookies. Essa
          coleta é fundamental para garantir o funcionamento adequado da
          plataforma e otimizar a sua experiência de navegação.
        </p>
      </>
    ),
  },
  {
    title: '2. Como usamos suas informações',
    content: (
      <>
        <p>
          Os dados coletados são utilizados para viabilizar o atendimento e a
          elaboração de propostas comerciais personalizadas para a sua
          residência, condomínio ou empresa no Rio de Janeiro. Utilizamos suas
          informações para dimensionar corretamente o sistema de energia solar,
          entrar em contato para esclarecer dúvidas e formalizar contratos de
          prestação de serviços.
        </p>
        <p>
          Com o seu consentimento, também podemos utilizar seus dados para
          enviar novidades sobre o setor fotovoltaico, conteúdos educativos,
          ofertas especiais e materiais informativos. Tratamos seus dados para
          cumprir obrigações regulatórias da ANEEL e obrigações legais,
          garantindo sempre a transparência e o uso estritamente necessário das
          informações.
        </p>
      </>
    ),
  },
  {
    title: '3. Compartilhamento de dados',
    content: (
      <>
        <p>
          A DEV Solar não vende, aluga ou comercializa seus dados pessoais com
          terceiros. No entanto, para a execução eficiente dos nossos serviços,
          podemos compartilhar suas informações com parceiros estratégicos, como
          distribuidoras locais de energia elétrica para homologação de
          projetos, instituições financeiras para linhas de crédito solar e
          fornecedores de equipamentos.
        </p>
        <p>
          Também utilizamos prestadores de serviços de tecnologia, incluindo
          hospedagem de sites e ferramentas de automação de marketing. Todos os
          nossos parceiros comerciais são contratualmente obrigados a manter a
          confidencialidade, segurança e privacidade dos seus dados,
          utilizando-os exclusivamente para as finalidades autorizadas por nossa
          empresa.
        </p>
      </>
    ),
  },
  {
    title: '4. Segurança da informação',
    content: (
      <>
        <p>
          Adotamos rigorosas medidas de segurança técnicas e administrativas
          para proteger suas informações contra acessos não autorizados, perdas,
          alterações, destruição ou qualquer forma de tratamento inadequado.
          Utilizamos protocolos de criptografia (HTTPS/SSL), controles de acesso
          restrito e monitoramento contínuo em nossos servidores e bancos de
          dados.
        </p>
        <p>
          Embora empreguemos os melhores esforços e padrões de mercado para
          proteger seus dados, destacamos que nenhum sistema é completamente
          infalível. Por isso, incentivamos que os usuários também tomem
          precauções ao navegar na internet e ao compartilhar suas informações.
        </p>
      </>
    ),
  },
  {
    title: '5. Seus direitos (LGPD)',
    content: (
      <>
        <p>
          Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você
          possui o direito de confirmar a existência do tratamento de seus
          dados, acessar suas informações e solicitar a correção de dados
          incompletos ou desatualizados. Você também pode solicitar a
          anonimização, bloqueio ou eliminação de dados desnecessários ou
          tratados em desconformidade.
        </p>
        <p>
          Além disso, você pode revogar seu consentimento a qualquer momento
          para o recebimento de comunicações de marketing. Para exercer qualquer
          um destes direitos, basta entrar em contato com nossa equipe pelo
          e-mail comercial@devsolar.com.br ou através dos nossos canais de
          atendimento oficiais.
        </p>
      </>
    ),
  },
];

export default function PoliticaPrivacidadePage() {
  return (
    <LegalPageLayout
      title="Política de Privacidade | DEV Solar"
      intro="Esta Política descreve como a DEV Solar trata suas informações pessoais quando você utiliza nosso site, entra em contato ou solicita um orçamento."
      lastUpdated="08 de agosto de 2026"
      sections={sections}
    />
  );
}
