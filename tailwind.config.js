// import type { Config } from "tailwindcss";

const colors = require('tailwindcss/colors'); // Importa cores padrão para referência

// module.exports = {
//   prefix: 'tw-',
// }

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', //'media', // Ou 'class'
  // --- CONFIGURE O CONTENT AQUI ---
  content: [
    './src/app/*.{js,ts,jsx,tsx,mdx}',    // Para quem usa App Router
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Inclui todos os componentes
    './src/contents/**/*.{js,ts,jsx,tsx,mdx}', // Inclui todos os contents
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}', // Inclui todos as libs

    // Se os componentes Tremor estiverem instalados em node_modules e você precisar
    // que o Tailwind analise as classes usadas DENTRO deles (raramente necessário
    // se eles já vêm com CSS próprio ou usam classes padrão), você pode adicionar:
    './node_modules/@tremor/react/**/*.{js,ts,jsx,tsx}',
  ],
  // ----------------------------------
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      colors: {
        primary: 'var(--primary)', // Usa a variável CSS
        secondary: 'var(--secondary)',
        'footer-color': 'var(--footer-color)',
        // Mapeia as cores claras/cinzas
        white: 'var(--branco)', // Sobrescreve 'white' padrão do Tailwind
        light: 'var(--light)', // Define 'light' como cor customizada
        // gray: { // Opcional: Ajusta a paleta de cinzas se necessário
        //   // Ex: Usar cores padrão Tailwind ou customizar
        //   50: '#f9fafb', // Exemplo
        //   100: 'var(--light)', // Mapeia gray-100 para sua cor --light
        //   200: '#e5e7eb',
        //   // ...
        //   600: 'var(--body-text)', // Mapeia gray-600 para seu texto
        //   800: 'var(--dark-text)', // Mapeia gray-800 para títulos
        //   900: '#111827',
        // },
        // Cores Tremor (se precisar sobrescrever)
        tremor: {
          background: {
            DEFAULT: 'var(--branco)', // Fundo padrão Tremor
            subtle: 'var(--light)',   // Fundo sutil Tremor
          },
          content: {
            DEFAULT: 'var(--body-text)',
            strong: 'var(--dark-text)',
            subtle: 'var(--muted-text)',
          }
          // ... outras cores Tremor
        }
      },
      // primary: '#ff9e00',
      // secondary: '#2ecc71',
      // 'footer-color': '#001f52',
      // 'dev-white': '#ffffff',
      // 'dev-light': '#F8F9FA',

      // Cores padrão do Tailwind (se precisar referenciá-las explicitamente)
      // Elas já existem por padrão, não precisa adicionar a menos que queira um alias
      // slate: colors.slate,
      // blue: colors.blue,
      // etc.

      // Cores específicas do Tremor (se necessário sobrescrever ou adicionar)
      // tremor: {
      //   brand: { /* ... */ },
      //   // ...
      // },
      // },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        'code-fade': `linear-gradient(90deg, rgba(0,0,0,0), rgba(2,6,23,1) 24px)`,
      },
      keyframes: {
        flash: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        'fade-up': {
          from: {
            opacity: 0,
            transform: 'translateY(16px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
        reveal: {
          '0%': {
            opacity: 0,
            // clipPath: 'inset(5%)',
            transform: 'scale(98%)',
          },
          '100%': {
            opacity: 1,
            // clipPath: 'inset(0)',
            transform: 'scale(1)',
          },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(6px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-6px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        accordionOpen: {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        accordionClose: {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: { height: '0px' },
        },
        dialogOverlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        dialogContentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -45%) scale(0.95)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        revealBottom: {
          from: {
            opacity: '0',
            transform: 'translateY(12px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
      },
      animation: {
        // MANTENHA TODAS as animações da sua segunda exportação aqui
        flash: 'flash 1.4s infinite linear',
        'fade-up': 'fade-up 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        reveal: 'reveal 400ms ease-in-out',
        shimmer: 'shimmer 2s ease-in-out infinite',
        hide: 'hide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        accordionOpen: 'accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)',
        accordionClose: 'accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)',
        dialogOverlayShow: 'dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        dialogContentShow: 'dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        revealBottom: 'revealBottom 300ms ease-in-out backwards',
      },
      typography: ({ theme }) => ({
        // MANTENHA a configuração de tipografia Tremor aqui
        tremor: {
          css: {
            // Ajuste as cores se necessário para usar as que você definiu
            '--tw-prose-body': theme('colors.slate.700'), // Exemplo usando slate padrão
            '--tw-prose-headings': theme('colors.slate.900'),
            '--tw-prose-lead': theme('colors.slate.600'),
            '--tw-prose-links': theme('colors.blue.600'),
            '--tw-prose-bold': theme('colors.slate.900'),
            '--tw-prose-counters': theme('colors.slate.500'),
            '--tw-prose-bullets': theme('colors.slate.300'),
            '--tw-prose-hr': theme('colors.slate.200'),
            '--tw-prose-quotes': theme('colors.blue.800'), // Ajustado
            '--tw-prose-quote-borders': theme('colors.blue.300'), // Ajustado
            '--tw-prose-captions': theme('colors.slate.500'),
            '--tw-prose-code': theme('colors.slate.900'),
            '--tw-prose-pre-code': theme('colors.slate.200'),
            '--tw-prose-pre-bg': theme('colors.gray.800'), // Exemplo com gray
            '--tw-prose-th-borders': theme('colors.slate.300'),
            '--tw-prose-td-borders': theme('colors.slate.200'),
            // Dark mode para prose (se usar darkMode: 'class')
            '--tw-prose-invert-body': theme('colors.slate.300'),
            // ... etc
          },
        },
      }),
    },
  },
  plugins: [
    // Seus plugins Tailwind
    require('@tailwindcss/typography'), // NECESSÁRIO para a config typography funcionar
    // require('@tailwindcss/forms'), // Adicione se usar
    // require('@headlessui/tailwindcss'), // Adicione se usar Headless UI
  ],
  // corePlugins: { // Descomente apenas se precisar desabilitar preflight
  //   preflight: false,
  // }
}
/*
export default {
  darkMode: false, // Ou 'class'
  // --- CONFIGURE O CONTENT AQUI ---
  content: [
    './src/pages/ ** / *.{js,ts,jsx,tsx,mdx}', // Para quem usa Pages Router
    './src/app/ ** /*.{js,ts,jsx,tsx,mdx}',    // Para quem usa App Router
    './src/components/ ** /*.{js,ts,jsx,tsx,mdx}', // Inclui todos os componentes
    // Se os componentes Tremor estiverem instalados em node_modules e você precisar
    // que o Tailwind analise as classes usadas DENTRO deles (raramente necessário
    // se eles já vêm com CSS próprio ou usam classes padrão), você pode adicionar:
    // './node_modules/@tremor/react/** /*.{js,ts,jsx,tsx}',
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      backgroundImage: {
        'code-fade': `linear-gradient(90deg, rgba(0,0,0,0), rgba(2,6,23,1) 24px)`,
      },

      keyframes: {
        flash: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        'fade-up': {
          from: {
            opacity: 0,
            transform: 'translateY(16px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
        reveal: {
          '0%': {
            opacity: 0,
            // clipPath: 'inset(5%)',
            transform: 'scale(98%)',
          },
          '100%': {
            opacity: 1,
            // clipPath: 'inset(0)',
            transform: 'scale(1)',
          },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(6px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-6px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        accordionOpen: {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        accordionClose: {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: { height: '0px' },
        },
        dialogOverlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        dialogContentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -45%) scale(0.95)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        revealBottom: {
          from: {
            opacity: '0',
            transform: 'translateY(12px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
      },
      animation: {
        flash: 'flash 1.4s infinite linear',
        'fade-up': 'fade-up 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        reveal: 'reveal 400ms ease-in-out',
        shimmer: 'shimmer 2s ease-in-out infinite',
        hide: 'hide 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade:
          'slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        // Accordion
        accordionOpen: 'accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)',
        accordionClose: 'accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)',
        // Dialog
        dialogOverlayShow:
          'dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        dialogContentShow:
          'dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        revealBottom: 'revealBottom 300ms ease-in-out backwards',
      },
      typography: ({ theme }) => ({
        tremor: {
          css: {
            '--tw-prose-body': theme('colors.slate[00]'),
            '--tw-prose-headings': theme('colors.slate[900]'),
            '--tw-prose-lead': theme('colors.slate[700]'),
            '--tw-prose-links': theme('colors.blue[500]'),
            '--tw-prose-bold': theme('colors.slate[900]'),
            '--tw-prose-counters': theme('colors.slate[600]'),
            '--tw-prose-bullets': theme('colors.slate[400]'),
            '--tw-prose-hr': theme('colors.slate[300]'),
            '--tw-prose-quotes': theme('colors.blue[700]'),
            '--tw-prose-quote-borders': theme('colors.blue[700]'),
            '--tw-prose-captions': theme('colors.slate[700]'),
            '--tw-prose-code': theme('colors.slate[800]'),
            '--tw-prose-pre-code': theme('colors.slate[100]'),
            '--tw-prose-pre-bg': theme('colors.slate[900]'),
            '--tw-prose-th-borders': theme('colors.slate[300]'),
            '--tw-prose-td-borders': theme('colors.slate[200]'),
          },
        },
      }),
    },
  },
};
*/