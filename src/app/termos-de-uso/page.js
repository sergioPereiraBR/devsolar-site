import LegalPageLayout from '@/components/devsolar/estructure/body/main/legal_page_layout';

export const metadata = {
  title: 'Termos de Uso',
  description:
    'Consulte os termos de uso do site da DEV Solar e entenda as regras, condições e responsabilidades para o uso de nossos serviços e navegação.',
  metadataBase: new URL('https://www.devsolar.com.br/'),
  alternates: {
    canonical: 'termos-de-uso/',
  },
  keywords: [
    'termos de uso dev solar',
    'condicoes de uso dev solar',
    'termos legais dev solar',
    'dev solar',
  ],
  authors: [{ name: 'DEV Solar' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Termos de Uso',
    description:
      'Consulte os termos de uso do site da DEV Solar e as regras para navegação e utilização dos nossos serviços.',
    url: 'https://www.devsolar.com.br/termos-de-uso/',
    siteName: 'DEV Solar',
    locale: 'pt_BR',
    type: 'website',
  },
  other: {
    publisher: 'DEV Solar',
    copyright: '© 2026 DEV Solar - Todos os direitos reservados.',
  },
};

// const sections = [
//   {
//     title: '1. Aceitação dos termos',
//     content: (
//       <>
//         <p>
//           Ao acessar e utilizar este site, você concorda com estes Termos de Uso
//           e com todas as regras aplicáveis à navegação e à contratação de nossos
//           serviços.
//         </p>
//       </>
//     ),
//   },
//   {
//     title: '2. Uso do site',
//     content: (
//       <>
//         <p>
//           O conteúdo disponibilizado no site é de uso informativo e educacional,
//           podendo ser alterado a qualquer momento sem aviso prévio.
//         </p>
//       </>
//     ),
//   },
//   {
//     title: '3. Propostas e contatos',
//     content: (
//       <>
//         <p>
//           Ao preencher formulários ou entrar em contato, você declara que as
//           informações fornecidas são verdadeiras e autorizam a DEV Solar a
//           processá-las para fins comerciais e de atendimento.
//         </p>
//       </>
//     ),
//   },
//   {
//     title: '4. Responsabilidades',
//     content: (
//       <>
//         <p>
//           A DEV Solar se responsabiliza por fornecer as informações de forma
//           clara, mas não garante a disponibilidade contínua do site nem a
//           ausência de interrupções técnicas.
//         </p>
//       </>
//     ),
//   },
//   {
//     title: '5. Lei aplicável',
//     content: (
//       <>
//         <p>
//           Estes termos são regidos pelas leis brasileiras, e qualquer disputa
//           será tratada no foro da comarca da capital do Rio de Janeiro, quando
//           aplicável.
//         </p>
//       </>
//     ),
//   },
// ];

const sections = [
  {
    title: '1. Aceitação dos termos',
    content: (
      <>
        <p>
          Ao acessar, navegar ou utilizar o site da DEV Solar, você declara que
          leu, compreendeu e concorda integralmente com estes Termos de Uso e
          com a nossa Política de Privacidade. Este documento estabelece as
          regras e condições legais para o acesso às informações, simuladores e
          conteúdos sobre energia solar fotovoltaica.
        </p>
        <p>
          Caso você não concorde com qualquer disposição aqui apresentada,
          solicitamos que descontinue a navegação em nossa plataforma. O uso
          continuado das nossas ferramentas e formulários implica a aceitação
          expressa e irrestrita das atualizações periódicas destes termos.
        </p>
      </>
    ),
  },
  {
    title: '2. Uso do site e propriedade intelectual',
    content: (
      <>
        <p>
          Todo o conteúdo disponibilizado no site — incluindo textos, marcas,
          logotipos, imagens, gráficos, simuladores de economia de energia e
          layout — é de propriedade exclusiva da DEV Solar ou de seus
          licenciantes, estando protegido pela legislação brasileira de direitos
          autorais e propriedade industrial.
        </p>
        <p>
          É concedida a você uma licença limitada, não exclusiva e revogável
          para visualizar e utilizar as informações do site estritamente para
          fins pessoais e informativos. É expressamente proibida a cópia,
          reprodução, modificação, distribuição comercial ou engenharia reversa
          de qualquer elemento da plataforma sem prévia autorização por escrito.
        </p>
      </>
    ),
  },
  {
    title: '3. Solicitacões de orçamentos e comunicações',
    content: (
      <>
        <p>
          Ao preencher nossos formulários para solicitação de proposta
          comercial, envio de conta de luz ou contato, você garante que os dados
          fornecidos são precisos, atuais e verdadeiros. Você autoriza
          expressamente a equipe da DEV Solar a entrar em contato via telefone,
          e-mail ou aplicativo de mensagem (WhatsApp).
        </p>
        <p>
          As estimativas de economia, capacidade de geração e valores
          apresentados nas simulações iniciais do site possuem caráter meramente
          informativo e preliminar. A proposta final e vinculante para a
          instalação do sistema fotovoltaico dependerá exclusivamente da análise
          técnica e da vistoria no local do imóvel.
        </p>
      </>
    ),
  },
  {
    title: '4. Limitações de responsabilidade e disponibilidade',
    content: (
      <>
        <p>
          A DEV Solar emprega os melhores esforços para manter a precisão das
          informações e a disponibilidade contínua da plataforma. Contudo, não
          nos responsabilizamos por eventuais falhas técnicas,
          indisponibilidades temporárias do sistema, vírus ou prejuízos
          decorrentes da navegação na internet ou de inconsistências na rede do
          usuário.
        </p>
        <p>
          Links para sites de terceiros ou distribuidoras de energia podem ser
          disponibilizados para sua conveniência. A DEV Solar não exerce
          controle e não assume responsabilidade pelo conteúdo, políticas ou
          práticas de sites de terceiros vinculados à nossa plataforma.
        </p>
      </>
    ),
  },
  {
    title: '5. Legislação aplicável e foro',
    content: (
      <>
        <p>
          Estes Termos de Uso são regidos e interpretados estritamente de acordo
          com as leis da República Federativa do Brasil, incluindo o Código de
          Defesa do Consumidor e o Marco Civil da Internet.
        </p>
        <p>
          Para dirimir quaisquer controvérsias ou litígios decorrentes do uso
          deste site ou do descumprimento destes termos, fica eleito o Foro da
          Comarca da Capital do Estado do Rio de Janeiro, com renúncia expressa
          a qualquer outro, por mais privilegiado que seja.
        </p>
      </>
    ),
  },
];

export default function TermosUsoPage() {
  return (
    <LegalPageLayout
      title="Termos de Uso"
      intro="Estes termos regulam o uso do site da DEV Solar, incluindo navegação, contatos, orçamentos e demais interações disponibilizadas pela empresa."
      lastUpdated="08 de agosto de 2026"
      sections={sections}
    />
  );
}
