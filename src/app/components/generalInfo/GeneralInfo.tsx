import { useTranslation } from "react-i18next";

const generalObj = {
    name: `Omar Rodriguez Soberanes`,
    nationality: `Mexicano`,
    location: `Guadalajara, mexico`,
    phone: `6621393007`,
    email: `omar.rodsob@gmail.com`,
    speak: ['Español Nativo','Ingles Negocios'],
    pages:['https://www.linkedin.com/in/omarrodsob/','https://github.com/omar-rodsob','https://linktr.ee/']
}

export default function GeneralInfo() {
  const { i18n, t } = useTranslation();
  return (
    <>
    <div className="p-5 bg-subHeader rounded border-borderColor m-2 min-h-20">
      <h1 className="text-2xl font-bold text-slate-100">{t('personalInfo.title')}</h1>
    </div>
      <ul className="p-5 bg-module p-5 rounded border-borderColor border-2 m-2">
        <li><h4 className="text-lg font-bold dark:text-white">{t('personalInfo.name')}<span className="m-1 font-semibold text-gray-500 dark:text-gray-400">{generalObj.name}</span></h4></li>
        <li><h4 className="text-lg font-bold dark:text-white">{t('personalInfo.birthPlace')}<span className="m-1 font-semibold text-gray-500 dark:text-gray-400">{generalObj.nationality}</span></h4></li>
        <li><h4 className="text-lg font-bold dark:text-white">{t('personalInfo.location')}<span className="m-1 font-semibold text-gray-500 dark:text-gray-400">{generalObj.location}</span></h4></li>
        <li><h4 className="text-lg font-bold dark:text-white">{t('personalInfo.phone')}<span className="m-1 font-semibold text-gray-500 dark:text-gray-400">{generalObj.phone}</span></h4></li>
        <li><h4 className="text-lg font-bold dark:text-white">{t('personalInfo.email')} <span className="m-1 font-semibold text-gray-500 dark:text-gray-400">{generalObj.email}</span></h4></li>
        <li><h4 className="text-lg font-bold dark:text-white">{t('personalInfo.lang')}</h4>
            <ul>
                {generalObj.speak.map((speak)=>
                    <li key={speak} className="m-1 font-semibold text-gray-500 dark:text-gray-400">{speak}</li>
                )}
            </ul>
        </li>
        <li><h4 className="text-lg font-bold dark:text-white">{t('personalInfo.links')}</h4>
            <ul>
                {generalObj.pages.map((page)=>
                    <li key={page}><a href={page} target="_blank" className="m-1 font-semibold text-gray-500 dark:text-gray-400">{page}</a></li>
                )}
            </ul>
        </li>
      </ul>
    </>
  );
}
