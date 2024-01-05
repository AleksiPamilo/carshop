import { NextResponse } from "next/server";
import { localeConfig } from "../locale-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import type { NextRequest } from "next/server";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = localeConfig.locales;

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const filteredLanguages = languages
        .map((language) => language.split(';')[0])
        .filter((language) => locales.includes(language));

    return matchLocale(filteredLanguages, locales, localeConfig.defaultLocale);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = localeConfig.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        const originalUrl = new URL(request.url);
        const newUrl = new URL(`/${locale}/${pathname}${originalUrl.search}`, request.url);

        return NextResponse.redirect(newUrl);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}