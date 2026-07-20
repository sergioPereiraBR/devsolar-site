'use client';

import dynamic from 'next/dynamic';

const ContactSectionDS = dynamic(
    () => import('./contact_section_ds'),
    { ssr: false }
);

export default function DeferredContactSectionDS() {
    return <ContactSectionDS />;
}