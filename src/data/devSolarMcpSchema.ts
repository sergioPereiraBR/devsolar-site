// src/data/devSolarMcpSchema.ts

export const devSolarMcpSchema = {
  tools: [
    {
      name: 'simular_economia_solar',
      description:
        'Calcula a estimativa de economia de energia solar, o valor das parcelas e o retorno financeiro com base na conta de luz mensal do cliente no Rio de Janeiro. Também pode registrar o nome do lead e o telefone informados para acompanhamento comercial.',
      readOnlyHint: true,
      inputSchema: {
        type: 'object',
        properties: {
          valor_conta_luz: {
            type: 'number',
            description: 'Valor médio mensal em Reais (R$) pago na conta de luz.',
          },
          nome_lead: {
            type: 'string',
            description: 'Nome do lead que está solicitando a simulação de economia solar.',
          },
          telefone: {
            type: 'string',
            description: 'Número de telefone do lead para contato do atendimento, com ou sem máscara.',
          },
          localizacao: {
            type: 'string',
            description: 'Cidade ou região para ajustar a estimativa ao local de consumo, preferencialmente no Rio de Janeiro ou região metropolitana.',
          },
        },
        required: ['valor_conta_luz'],
      },
    },
  ],
} as const;

export const devSolarMcpScriptTag = `<script type="application/webmcp+json">${JSON.stringify(
  devSolarMcpSchema,
  null,
  2,
)}</script>`;
