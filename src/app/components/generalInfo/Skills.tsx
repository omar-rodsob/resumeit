import { useTranslation } from "react-i18next";

const toolsObj = {
    main: ['front end developer','web developer','hybrid mobile','developer','scrum master'],
    second: ['Usability testing', 'troubleshooting test', 'Analyst Information','User experience', 'testing (quality control)', 'web analytics'],
    tools: [ 'javascript', 'react',' react native', 'redux', 'lint', 'enzyme', 'npm',
        'emacscript 6', 'ajax', 'jsp', 'css', 'html', 'html5', 'jquery mobile', 'jquery', 'node.js',
        ,'app mobile delivery,','backbone', 'html for mobile sites (responsive html)', 'rest',
        'web service', 'json', 'bootstrap', 'couchdb', 'dom manipulation php', 'laravel',
        'cordova', 'phonegap', 'titanium', 'appcelerator', 'hockeyapp', 'testflight', 'itunes',
        'connect', 'mysql', 'workbrench', 'moodle', 'smarty', 'velocity']
}

export default function GeneralInfo() {
    const { i18n, t } = useTranslation();
  return (
    <>
    <div className="p-5 bg-subHeader rounded border-borderColor m-2 min-h-20">
    <h1 className="text-2xl font-bold text-slate-100">{t('skills')}</h1>
    </div>
    <div className="justify-between bg-module p-5 rounded border-borderColor border-2 m-2">
        <h4 className="text-lg font-bold dark:text-white">Main</h4>
        <div className="skillMain">
        {toolsObj.main.map((main)=>
                    <span className="m-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10" key={main}>{main}</span>
        )}
        </div>
    </div>
    <div className="justify-between bg-module p-5 rounded border-borderColor border-2 m-2">
        <h4 className="text-lg font-bold dark:text-white">Second</h4>
        <div className="skillTools">
        {toolsObj.main.map((tools)=>
                    <span className="m-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10" key={tools}>{tools}</span>
        )}
        </div>
    </div>
    <div className="justify-between bg-module p-5 rounded border-borderColor border-2 m-2 ">
        <h4 className="text-lg font-bold dark:text-white">Tools</h4>
        <div className="skillSecond">
        {toolsObj.tools.map((tool)=>
                    <span className="m-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10" key={tool}>{tool}</span>
                )}
        </div>
    </div>
    </>
  );
}
