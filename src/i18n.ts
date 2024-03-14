import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                title: 'Multi-language app',
                bio: 'Intro',
                recent:'Recent Technologies',
                showLess: 'Show Less',
                showMore: 'Show More',
                exp: 'Experience',
                pagination : {
                    pagPrev: 'Previous',
                    pagNext: 'Next',
                    pagOff : 'Off',
                },
                personalInfo:{
                    title: 'Personal Info',
                    name:'Name',
                    birthPlace: 'Nationality',
                    location: 'Location',
                    phone: 'Phone',
                    email: 'Email',
                    lang: 'Languages',
                    links: 'Links',
                },
                skills:'Skills',
                infograms:{
                    cron:'Chronology',
                    mind: 'Data Tree',
                    tools: 'Skills By'
                },
                auth:{
                    firstMessage:'To access this site you need a token that will be sent to your email',
                    email:'E-mail',
                    btnToken: 'Send Token',
                    authMessage: 'Token sent, check your email',
                    addToken: 'Add Token',
                    accessBtn: 'Access',
                    noEmailMessage: 'Did you not receive the token?',
                    reSentButton: 'resend token',
                    errorMistMatch: 'The token is not correct, try again',
                    errorSending: 'We had an error sending your token, please try again',
                    resentMessage: 'Token forwarded, check your email'
                },

            }
        },
        es: {
            translation: {
                title: 'Aplicación en varios idiomas',
                bio: 'Intro',
                recent:'Tecnologías',
                showLess: 'Mostrar Menos',
                showMore: 'Mostrar Más',
                exp: 'Experiencia Laboral',
                pagination : {
                    pagPrev: 'Previo',
                    pagNext: 'Siguiente',
                    pagOff : 'De',
                },
                personalInfo:{
                    title: 'Informacion Personal',
                    name:'Nombre',
                    birthPlace: 'Nacionalidad',
                    location: 'Residencia',
                    phone: 'Telefono',
                    email: 'correo',
                    lang: 'Idiomas',
                    links: 'Enlaces',
                },
                skills:"Habilidades",
                infograms:{
                    cron:'Cronologia',
                    mind: 'Herramientas',
                    tools: 'Habilidades'
                },
                auth:{
                    firstMessage:'Para acceder a este sitio necesitas un token que será enviado a tu correo electrónico',
                    email:'correo electrónico',
                    btnToken: 'Enviar Token',
                    authMessage: 'Token enviado, revisa tu correo',
                    addToken: 'Agregar Token',
                    accessBtn: 'Acceder',
                    noEmailMessage: 'No recibiste el token?',
                    reSentButton: 'reenviar token',
                    errorMistMatch: 'El token no es correcto, intentalo de nuevo',
                    errorSending: 'Tuvimos un error al mandar tu token, favor de intentarlo de nuevo',
                    resentMessage: 'Token reenviado, checa tu correo'
                }
            }
        },
        }
    }
  );

export default i18n;