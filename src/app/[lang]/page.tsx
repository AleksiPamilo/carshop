import { getDictionary } from '@/../get-dictionary';
import { Locale } from '@/../i18n-config';
import LocaleSwitcher from '@components/SwitchLocale';

export default async function IndexPage({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const dictionary = await getDictionary(lang)

    return (
        <div>
            <LocaleSwitcher dictionary={dictionary} />
            <p>Current locale: {lang}</p>
            <p>
                This text is rendered on the server:{' '}
                {dictionary['navigation'][0].label}
            </p>
        </div>
    )
}