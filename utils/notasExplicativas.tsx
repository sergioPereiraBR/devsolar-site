import React, { useState } from 'react';
import { Info } from 'lucide-react'; // Ou seu pacote de ícones preferido

import { PremissasSolarComValoresCalculo } from './calcularEconomiaSolar';
import { ModalPremissasCalculo } from './ModalPremissasCalculo';

interface NotaExplicativaProps {
  premissas: PremissasSolarComValoresCalculo;
}

export const NotaExplicativaGrafico: React.FC<NotaExplicativaProps> = ({
  premissas,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mt-0 flex items-center justify-center sm:justify-end">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-gray-500 underline decoration-dashed underline-offset-4 transition-colors hover:text-blue-600 focus:outline-none dark:text-gray-400 dark:hover:text-blue-400"
        >
          <Info className="h-3.5 w-3.5" />
          <span>Premissas e regulamentações.</span>
        </button>
      </div>

      <ModalPremissasCalculo
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        premissas={premissas}
      />
    </>
  );
};
