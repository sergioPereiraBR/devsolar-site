'use client';

export default function AsyncStyles() {
    return (
        <>
            <link
                rel="stylesheet"
                href="/vendor/bootstrap/bootstrap.min.css"
                media="print"
                onLoad={(e) => { e.currentTarget.media = 'all'; }}
            />
            <link
                rel="stylesheet"
                href="/vendor/fontawesome/styles.css"
                media="print"
                onLoad={(e) => { e.currentTarget.media = 'all'; }}
            />
        </>
    );
}