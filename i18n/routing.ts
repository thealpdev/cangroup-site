import { defineRouting } from 'next-intl/routing';


export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['de', 'en', 'fr', 'tr'],

    // Used when no locale matches
    defaultLocale: 'de'
});


