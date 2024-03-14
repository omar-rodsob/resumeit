"use client"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PopInfo from './PopInfo';

const introObj = {
    intro:"I have worked as a developer for more than 10 years, focused on web technologies, with a primary front end profile, programming in recent years in react, electron and nodejs for backend, with knowledge of automation mostly done with cypress and postman. \n\nWorking with cross-functional teams in agile environments, focusing on personal and team growth, working closely with business, designers and back-end developers.\n\nPersonally, I am inclined towards teamwork, I like both personal and team development, I am self-motivated, I try to have effective communication on both sides and help as much as possible, solve problems, help with information, propose and Do research technologies or solutions outside the box if necessary.",
    recentTech: [
      {
        name:"React",
        info:"I have experience working with the latest versions of React and am well-versed in utilizing hooks introduced after version 16.8, including useState and useEffect, among others."
      },
      {
        name:"Redux ToolKit",
        info:"We utilize Redux Toolkit for several large-scale applications. While I have previously worked with traditional Redux, I have found that Redux Toolkit offers a more streamlined and efficient approach, leading me to prefer its usage"
      },
      {
        name:"Electron",
        info:"We opted to use Electron to develop a desktop application for specific company users to handle logistics situations."
      },
      {
        name:"NodeJs",
        info:"I have maintained several applications in Node.js, where I added or modified endpoints. With a solid understanding of REST architecture, I am proficient in developing within this framework, particularly in Node.js environments."
      },
      {
        name:"Cypres",
        info:"I have developed automation tests for UI in Cypres"
      },
      {
        name:"Postman",
        info:"I have developed and maintained endpoint automation tests with postman and newman"
      },
      {
        name:"NextJs",
        info:"I have made a couple of developments in nextjs like this page for example"
      },
      {
        name:"Others",
        info:"All of the above has been carried out under the CI/CD philosophy, managing git, gitlab and pipelines within gitlab, with qTest for managing test cases and jira for managing tasks, all this in an agile environment"
      },
    ]
};

export default function Skeleton() {
  const { i18n, t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const [stringLength] = useState(introObj.intro.length);
    return (
      <div className="bg-module p-5 rounded border-borderColor border-2 intro-step">
      <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
        {t("bio")}
        </h1>
        <p className="text-balance whitespace-break-spaces">{showMore ? introObj.intro : `${introObj.intro.substring(0, 450)}`}</p>
        {stringLength>450 ? (
           <button className="m-1 bg-subHeader  relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" onClick={() => setShowMore(!showMore)}>{showMore ? `${t("showLess")}` : `${t("showMore")}`}</button>
        ):(null)}
        <div className="skillTools mt-2">
        <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 mb-2">
          {t("recent")}</h1>
        <div>
        {introObj.recentTech.map((tool)=>
           <PopInfo tool={tool} key={tool.name}/>
        )}
        </div>
        </div>
      </div>
    );
  }
  




