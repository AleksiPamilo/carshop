import { NextResponse } from "next/server";
import { i18n } from "../i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import type { NextRequest } from "next/server";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const filteredLanguages = languages
        .map((language) => language.split(';')[0])
        .filter((language) => locales.includes(language));

    return matchLocale(filteredLanguages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}