'use client';

import dynamic from 'next/dynamic';
import Script from 'next/script';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Spinner } from 'react-bootstrap';

import { RECAPTCHA_ENABLED } from '@/lib/email-config';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
    ssr: false,
    loading: () => (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" size="sm" />
        </div>
    ),
});

const DEFAULT_RECAPTCHA_SITE_KEY =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    '6LeshiwrAAAAAPVbR8FTS_4l-80ea1G_UyBhZuFk';

const RecaptchaField = forwardRef(function RecaptchaField(
    {
        shouldLoad = false,
        siteKey = DEFAULT_RECAPTCHA_SITE_KEY,
        hl = 'pt-BR',
        onChange,
        onExpired,
        onErrored,
        loadingFallback = null,
        containerClassName,
        scriptProps = {},
        enabled = RECAPTCHA_ENABLED,
        ...props
    },
    ref,
) {
    const recaptchaRef = useRef(null);

    useImperativeHandle(
        ref,
        () => ({
            getValue: () => recaptchaRef.current?.getValue?.() ?? null,
            reset: () => recaptchaRef.current?.reset?.(),
            execute: () => recaptchaRef.current?.execute?.(),
        }),
        [],
    );

    if (!enabled) {
        return null;
    }

    return (
        <div className={containerClassName}>
            {shouldLoad && (
                <Script
                    src="https://www.google.com/recaptcha/api.js/"
                    strategy="lazyOnload"
                    async
                    defer
                    {...scriptProps}
                />
            )}
            {shouldLoad ? (
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    hl={hl}
                    onChange={onChange}
                    onExpired={onExpired}
                    onErrored={onErrored}
                    {...props}
                />
            ) : (
                loadingFallback ?? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" size="sm" />
                    </div>
                )
            )}
        </div>
    );
});

export default RecaptchaField;
