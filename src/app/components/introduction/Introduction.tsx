"use client"
import { useState } from "react";
import { useTranslation } from "react-i18next";

const introObj = {
    intro:`I’m a self-motivated person with more than 10 years of experience
    focusing my career as a front end developer, working with cross
    functional teams in agile environments, keeping focus on both personal
    and team growth, working in close collaboration with business, designers
    and back end developers. I’m a self-motivated person with more than 10 years of experience
    focusing my career as a front end developer, working with cross
    functional teams in agile environments, keeping focus on both personal
    and team growth, working in close collaboration with business, designers
    and back end developers. `
};

export default function Skeleton() {
  const { i18n, t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const [stringLength] = useState(introObj.intro.length);

    return (
      <div className="bg-module p-5 rounded border-borderColor border-2">
      <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
        {t("bio")}
        </h1>
        <p className="text-balance">{showMore ? introObj.intro : `${introObj.intro.substring(0, 450)}`}</p>
        {stringLength>450 ? (
           <button className="btn text-lightBlue-500" onClick={() => setShowMore(!showMore)}>{showMore ? `${t("showLess")}` : `${t("showMore")}`}</button>
        ):(null)}
      </div>
    );
  }
  




