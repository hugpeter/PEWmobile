import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import Expo from 'expo';

//languages
import english from './languages/english';
import spanish from './languages/spanish';
import portuguese from './languages/portuguese';
import chinese from './languages/chinese';

//language detection
const languageDetector = {
    type: 'languageDetector',
    async: true, 
    detect: (cb) => {
        return Expo.DangerZone.Localization.getCurrentLocaleAsync()
            .then(lng => {cb(lng.split("_")[0]);})
    },
    init: () => {},
    cacheUserLanguage: () => {}
}

i18n
    .use(languageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'en',

        //translation list
        resources: {
            en: english,
            es: spanish,
            pt: portuguese,
            ch: chinese,
            

            //have common name space used around the app
            ns: ['common'],
            defaultNS: 'common',
            debug: true,
            
            cache: {
                enabled: true
            },

            interpolation: {
                escapeValue: false 
            }
        }
    });

export default i18n;