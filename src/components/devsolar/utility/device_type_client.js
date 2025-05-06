'use client';

/**
 * Estima o tipo de dispositivo do cliente com base no User Agent e características da tela.
 * IMPORTANTE: A detecção baseada em User Agent não é 100% precisa e pode ser enganada.
 * Use com cautela, principalmente para TV e Console.
 *
 * @returns {'Mobile' | 'Tablet' | 'Desktop' | 'TV' | 'Console' | 'Unknown'} O tipo de dispositivo estimado.
 */
function getDeviceType() {
    // Verifica se o código está rodando no navegador
    if (typeof window === 'undefined' || !navigator) {
      return 'Unknown'; // Ou talvez 'Server' se for em contexto de SSR sem window
    }
  
    const ua = navigator.userAgent.toLowerCase();
  
    // 1. Detecção Mobile (mais confiável)
    // Inclui a maioria dos telefones e alguns tablets Android mais antigos
    if (/android|iphone|ipod|windows phone|blackberry|iemobile|opera mini/i.test(ua)) {
       // Verifica se é um tablet Android (não contém 'mobile') ou iPad
       // O iPad moderno pode não ter 'iPad' no UA, mas terá Mac OS e touch
       const isTablet = /ipad|android(?!.*mobile)/i.test(ua) ||
                        (navigator.maxTouchPoints > 1 && /macintosh/i.test(ua)); // Heurística para iPad recente
       if (isTablet) {
          return 'Tablet';
       }
      return 'Mobile';
    }
  
    // 2. Detecção de Tablet (iPad já coberto acima, outros casos)
    // Tablets podem ter user agents complexos, usar touch como indicador
    if (/tablet|kindle|silk/i.test(ua) || (navigator.maxTouchPoints > 1 && window.innerWidth >= 768)) {
        // Considera tablet se tiver touch e largura mínima razoável
         return 'Tablet';
    }
  
  
    // 3. Detecção de TV (menos confiável - depende de strings específicas)
    if (/tv|smarttv|googletv|crkey|appletv|tizen|webos|viera|netcast|dtv|nettv|playstation|xbox|nintendo/i.test(ua)) {
        // Verifica se é um console especificamente
        if (/playstation|xbox|nintendo/i.test(ua)){
            return 'Console';
        }
        return 'TV';
    }
  
    // 4. Detecção de Console (se não detectado junto com TV)
     if (/playstation|xbox|nintendo/i.test(ua)){
         return 'Console';
     }
  
    // 5. Se não for Mobile, Tablet, TV ou Console, assume Desktop
    // Poderia adicionar uma checagem extra para telas muito grandes como possível TV
    // if (window.innerWidth > 1600 || window.innerHeight > 900) {
    //     // Heurística para telas muito grandes, podem ser TVs conectadas a PCs
    // }
    return 'Desktop';
  }
  
  // --- Como usar em um componente React ---
  
  // import React, { useState, useEffect } from 'react';
  
  // function MyComponent() {
  //   const [deviceType, setDeviceType] = useState('Unknown');
  
  //   useEffect(() => {
  //     // Chama a função SOMENTE no lado do cliente
  //     setDeviceType(getDeviceType());
  //   }, []); // Executa apenas uma vez na montagem
  
  //   return (
  //     <div>
  //       <p>Tipo de Dispositivo Detectado: {deviceType}</p>
  //       {/* Renderização condicional baseada em deviceType */}
  //       {deviceType === 'Mobile' && <p>Conteúdo específico para Mobile</p>}
  //       {deviceType === 'Desktop' && <p>Conteúdo específico para Desktop</p>}
  //     </div>
  //   );
  // }