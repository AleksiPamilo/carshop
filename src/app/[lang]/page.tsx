import { getDictionary } from '@/../get-dictionary';
import { Locale } from '../../../locale-config';

export default async function IndexPage({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const dictionary = await getDictionary(lang)

    return (
        <div>
            <p>Current locale: {lang}</p>
            <p>{dictionary.title}</p>
        </div>
    )
}