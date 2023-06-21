import { GetStaticProps } from 'next';
import { getDictionary } from '@/../get-dictionary';
import { Locale } from '@/../i18n-config';
import { Dictionary } from '@/types/dictionary';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const lang = params?.lang as Locale;
    const dictionary = await getDictionary(lang);

    return {
        props: {
            dictionary,
        },
    };
};

export default function LoginTest({ dictionary }: {
    dictionary: Dictionary
}) {
    return (
        <div>
            diudau
            {/* <h1>{dictionary.auth.signin}</h1> */}
        </div>
    );
}