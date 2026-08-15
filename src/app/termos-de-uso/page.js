import LegalPageLayout from '@/components/devsolar/estructure/body/main/legal_page_layout';

export const metadata = {
  title: 'Termos de Uso',
  description:
    'Consulte os termos de uso do site da DEV Solar e as regras para uso de nossos serviços.',
  alternates: {
    canonical: 'https://www.devsolar.com.br/termos-de-uso/',
  },
};

const sections = [
  {
    title: '1. Aceitação dos termos',
    content: (
      <>
        <p>
          Ao acessar e utilizar este site, você concorda com estes Termos de Uso
          e com todas as regras aplicáveis à navegação e à contratação de nossos
          serviços.
        </p>
      </>
    ),
  },
  {
    title: '2. Uso do site',
    content: (
      <>
        <p>
          O conteúdo disponibilizado no site é de uso informativo e educacional,
          podendo ser alterado a qualquer momento sem aviso prévio.
        </p>
      </>
    ),
  },
  {
    title: '3. Propostas e contatos',
    content: (
      <>
        <p>
          Ao preencher formulários ou entrar em contato, você declara que as
          informações fornecidas são verdadeiras e autorizam a DEV Solar a
          processá-las para fins comerciais e de atendimento.
        </p>
      </>
    ),
  },
  {
    title: '4. Responsabilidades',
    content: (
      <>
        <p>
          A DEV Solar se responsabiliza por fornecer as informações de forma
          clara, mas não garante a disponibilidade contínua do site nem a
          ausência de interrupções técnicas.
        </p>
      </>
    ),
  },
  {
    title: '5. Lei aplicável',
    content: (
      <>
        <p>
          Estes termos são regidos pelas leis brasileiras, e qualquer disputa
          será tratada no foro da comarca da capital do Rio de Janeiro, quando
          aplicável.
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
