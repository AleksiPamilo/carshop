import { getDictionary } from '@/../get-dictionary';
import { Locale } from '../../../locale-config';
import SearchCar from './components/SearchCar';

export default async function IndexPage({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const dictionary = await getDictionary(lang)

    return (
        <div>
            <SearchCar dictionary={dictionary} />
        </div>
    )
}