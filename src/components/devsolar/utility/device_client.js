'use client';

import UAParser from 'ua-parser-js';

// Função principal para detectar o tipo de dispositivo
export function detectDevice(userAgent, screenInfo = {}) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    // Extrai informações do user agent
    const device = result.device || {};
    const os = result.os || {};
    const ua = result.ua || '';

    // Informações de tela (se disponíveis no cliente ou servidor via headers)
    const screenWidth = screenInfo.width || 0;
    const screenHeight = screenInfo.height || 0;

    // Função auxiliar para verificar padrões no user agent
    const checkUserAgent = (patterns) => patterns.some(pattern => pattern.test(ua));

    // 1. Detecção de TVs
    const tvPatterns = [
        /SmartTV/i,
        /WebOS/i,
        /Tizen/i,
        /Roku/i,
        /AppleTV/i,
        /FireTV/i,
        /Android TV/i,
        /NETCAST/i,
        /BRAVIA/i,
        /CrKey/i, // Chromecast
        /GoogleTV/i
    ];
    if (checkUserAgent(tvPatterns)) {
        return 'TV';
    }

    // 2. Detecção de Consoles (ex.: PlayStation, Xbox)
    const consolePatterns = [
        /PlayStation/i,
        /Xbox/i,
        /Nintendo/i
    ];
    if (checkUserAgent(consolePatterns)) {
        return 'Console';
    }

    // 3. Detecção de dispositivos móveis (mobile e tablet)
    const mobilePatterns = [
        /Android/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
        /Mobile/i
    ];
    const isMobileUA = checkUserAgent(mobilePatterns) || device.type === 'mobile';

    // 4. Detecção de tablets (baseado em user agent e tamanho de tela)
    const tabletPatterns = [
        /iPad/i,
        /Tablet/i,
        /Kindle/i,
        /PlayBook/i,
        /Nexus 7/i,
        /SM-T/i // Samsung Galaxy Tab
    ];
    const isTabletUA = checkUserAgent(tabletPatterns) || device.type === 'tablet';

    // Lógica para diferenciar mobile e tablet com base em tamanho de tela
    if (isMobileUA || isTabletUA) {
        if (screenWidth > 0 && screenHeight > 0) {
            // Tablets geralmente têm telas entre 7 e 12 polegadas (600px a 1200px de largura)
            if (screenWidth >= 600 && screenWidth <= 1200) {
                return 'Tablet';
            }
            return 'Mobile';
        }
        // Fallback sem informações de tela
        return isTabletUA ? 'Tablet' : 'Mobile';
    }

    // 5. Detecção de Desktop
    const desktopPatterns = [
        /Windows NT/i,
        /Macintosh/i,
        /Linux.*X11/i,
        /CrOS/i // Chromebook
    ];
    if (checkUserAgent(desktopPatterns) || (!device.type && !isMobileUA && !isTabletUA)) {
        return 'Desktop';
    }

    // 6. Fallback para dispositivos desconhecidos
    return 'Unknown';
}

// Exemplo de uso em getServerSideProps
export async function getServerSideProps(context) {
    const { req } = context;
    const userAgent = req.headers['user-agent'] || '';

    // Informações de tela não estão disponíveis no servidor, mas podem ser passadas pelo cliente
    const deviceType = detectDevice(userAgent);

    return {
        props: { deviceType },
    };
}

// Componente React para uso no frontend
import { useEffect, useState } from 'react';

export default function DeviceDetector({ initialDeviceType }) {
    const [deviceType, setDeviceType] = useState(initialDeviceType);

    useEffect(() => {
        // Reavaliação no cliente para maior precisão
        const screenInfo = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        const newDeviceType = detectDevice(navigator.userAgent, screenInfo);
        setDeviceType(newDeviceType);
    }, []);

    return (
        <div>
            <h1>Dispositivo Detectado: {deviceType}</h1>
        </div>
    );
}