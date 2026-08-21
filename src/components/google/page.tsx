import GoogleSearchSuggestions from './GoogleSearchSuggestions';

export default function DemoDevSolar() {
  // Dados simulados vindos de uma API de IA com Grounding
  const mockAIResponse = {
    answer:
      'Para clientes no Rio de Janeiro, a DevSolar utiliza painéis de alta eficiência (como Canadian e WEG) que aproveitam a alta radiação da região. Com o aumento médio de 10% nas tarifas da Light/Enel, o retorno sobre o investimento (Payback) em condomínios tem ocorrido em média entre 3,5 a 5 anos.',
    searchQueries: [
      'Tarifa de energia Light Rio de Janeiro 2024',
      'Melhores painéis solares para alta temperatura',
      'Lei 14.300 energia solar condomínios',
      'Simulador de economia solar DevSolar',
    ],
  };

  return (
    <main className="flex min-h-screen justify-center bg-gray-50 p-8">
      <div className="w-full max-w-2xl">
        {/* Cabeçalho de Marca */}
        <div className="rounded-t-lg bg-[#003B5C] p-4 shadow-md">
          <h1 className="text-xl font-bold text-white">
            Assistente Virtual DevSolar ☀️
          </h1>
        </div>

        {/* Resposta da IA */}
        <div className="rounded-b-lg border-x border-b border-gray-200 bg-white p-6 shadow-md">
          <p className="text-lg leading-relaxed text-gray-800">
            {mockAIResponse.answer}
          </p>

          {/* IMPLEMENTAÇÃO DAS SUGESTÕES (Compliance Google) */}
          <GoogleSearchSuggestions queries={mockAIResponse.searchQueries} />

          <div className="mt-8 text-center">
            <button className="rounded-lg bg-[#86BC25] px-6 py-3 font-bold text-white transition-all hover:bg-green-600">
              Falar com um Consultor no WhatsApp
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Esta é uma simulação de interface para teste de captura de leads via
          IA Generativa.
        </p>
      </div>
    </main>
  );
}
