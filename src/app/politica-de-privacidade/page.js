import LegalPageLayout from '@/components/devsolar/estructure/body/main/legal_page_layout';

export const metadata = {
  title: 'Política de Privacidade',
  description:
    'Conheça como a DEV Solar coleta, utiliza e protege seus dados pessoais em nosso site.',
};

const sections = [
  {
    title: '1. Informações que coletamos',
    content: (
      <>
        <p>
          Coletamos informações fornecidas diretamente por você, como nome,
          e-mail, telefone, mensagem e dados de navegação necessários para
          melhorar sua experiência em nosso site.
        </p>
      </>
    ),
  },
  {
    title: '2. Como usamos suas informações',
    content: (
      <>
        <p>
          Utilizamos seus dados para responder solicitações, oferecer
          orçamentos, enviar comunicações relevantes, melhorar nossos serviços e
          cumprir obrigações legais.
        </p>
      </>
    ),
  },
  {
    title: '3. Compartilhamento de dados',
    content: (
      <>
        <p>
          Seus dados podem ser compartilhados com parceiros e prestadores de
          serviço que atuam em nossa operação, sempre sob obrigações de
          confidencialidade e segurança.
        </p>
      </>
    ),
  },
  {
    title: '4. Segurança',
    content: (
      <>
        <p>
          Adotamos medidas técnicas e organizacionais para proteger seus dados
          contra acesso não autorizado, uso indevido ou perda.
        </p>
      </>
    ),
  },
  {
    title: '5. Seus direitos',
    content: (
      <>
        <p>
          Você pode solicitar acesso, correção, exclusão ou atualização de seus
          dados, bem como revogar consentimentos, por meio de contato com a DEV
          Solar.
        </p>
      </>
    ),
  },
];

export default function PoliticaPrivacidadePage() {
  return (
    <LegalPageLayout
      title="Política de Privacidade"
      intro="Esta Política descreve como a DEV Solar trata suas informações pessoais quando você utiliza nosso site, entra em contato ou solicita um orçamento."
      lastUpdated="08 de agosto de 2026"
      sections={sections}
    />
  );
}
