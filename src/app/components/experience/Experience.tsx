"use client"
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import { useTranslation } from "react-i18next";



const experienceObj = [{
    "nameCorp":"HCL Mexico",
    "location":"Guadalajara Jalisco",
    "dates":"September 2017 to December 2023",
    "positionName":"Front End Developer.",
    "info": "Our main job was to maintain 3 of our own applications, related to inventory, logistics and the workplace, these applications were developed in react consuming restful api that were in java hibernate. In relation to the backend, my experience is limited, I have worked with Java superficially, and with Nodejs at a more intermediate level. Work on the front end of applications based on business needs.\n\n ● Migrations of two projects from javascript to typescript. \n ● Maintaining a restful api in nodejs\n● Working on the migration of several front end projects from openshift to aws \n● Working on the migration of several restful api projects from openshift 3 to 4 \n● Working on the migration of several restful api projects from hibernate to Springboot. \n● As far as databases are concerned, I have experience in mysql and postgres."
},
{
    "nameCorp":"Korsoftocorp",
    "location":"Hermosillo sonora",
    "dates":"October 2013 to August 2017.",
    "positionName":"Front End Developer.",
    "info": "Support the team with the activities related to the front-end team, taking the duties to resolve both technical and business problems, helping management the releases of the applications in AppStore and playstore, making sure that we are on date with the requirements from both platforms, we launched 3 hybrid apps, one in Córdoba and two in react native, in addition to this, we maintain a fourth that was build in appcelerator. \n\nProjects Resume:\nWe develop an app for the management of soccer football coaches taking control of the teams, games schedules,players organization, and maintain communication with parents, was made in the first instance in Córdoba with ionic, and PHP on the back end side working with rest APIs maintained on aws cloud servers. \nTools:\nCórdova, ionic, AppStore, playstore, GitHub, postman.\n\nAnother app was to keep control of the maintenance activities for a college, keeping track of tasks on all floors, scheduled new activities, assigning duties, and track the activities by status, we have an admin portal build in php and one app on ios where the workers can see his activities, change the status .\nTools:\nreact native, redux, AppStore, playstore, GitHub, postman, aws."
},
{
    "nameCorp":" Internet Brands.",
    "location":"Guadalajara Jalisco",
    "dates":"February 2012 to October 2013.",
    "positionName":"Front End Developer.",
    "info": "development and maintenance of various pages of the company as www.carsdirect.com, develop of the content delivery application for the hosting, management and visualization of images in www.davesgarden.com/showcase, organize and check the work of two more frontend devs, code reviews and helping in solutions to the problems, analyze the differents tools like bootstrap, angular, jquerymobile to conclude which is the best suited to the project or if is better has our own front end architecture"
},
{
    "nameCorp":"quepasa.com",
    "location":"Hermosillo sonora",
    "dates":"October 2007 to January 2012.",
    "positionName":"Front End Developer.",
    "info": "front end team leader, in that job I have to my charge 4 co workers and the responsibility for his job,the communication with the project managers and designers, coordinated the schedule from front end team, verify the work meets with web standards like w3c standard, user interface,user experience and web usability, seo, make troubleshooting test, and formal testing and research about new technologies or tools for the sake of our projects, web analytics."
}
];

const paginationObj = {
    currentPage: 1,
    total: experienceObj.length
};

export default function Experience() {
    const { i18n, t } = useTranslation();
    const [currentObj,setCurrentObj] = useState(experienceObj[0]);
    const [totalPages] = useState(experienceObj.length);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagination, setPagination] = useState(paginationObj);

    function nextPage(){
        const current = currentPage +1;
        setCurrentPage(current);
    }

    function prevPage(){
        const current = currentPage -1;
        setCurrentPage(current);
        
    }

   useEffect(()=>{
      const current = currentPage-1;
      setCurrentObj(experienceObj[current]);
      setPagination(
            {...pagination,
            currentPage:currentPage
        }
        ); 
    },[currentPage]);

    return (
      <>
      <div className="p-5 bg-subHeader rounded border-borderColor m-2 min-h-20">
        <h1 className="float-left text-slate-100 inline-block text-2xl sm:text-3xl font-extrabold tracking-tight">{t("exp")}</h1>
        {totalPages>1?( <Pagination onNext={nextPage} onPrev={prevPage} pagination={pagination} />):("")}
      </div>
        <div className="experienceContent p-10 bg-module p-5 rounded border-borderColor border-2 m-2">
            <>
                <div className="experienceData m-1">
                    <h1 className="text-2xl font-bold dark:text-white">{currentObj.nameCorp}, <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">{currentObj.location}</small> </h1>
                    <h2 className="ms-2 font-semibold text-gray-500 dark:text-gray-400">{currentObj.dates}</h2>
                    <h2 className="ms-2 font-semibold text-gray-500 dark:text-gray-400">{currentObj.positionName}</h2>
                </div>
                <p className="experienceInfo m-5 whitespace-break-spaces mb-3">
                    {currentObj.info}
                </p>
            </>            
            {totalPages>1?( <Pagination onNext={nextPage} onPrev={prevPage} pagination={pagination} />):("")}       
        </div>
        
      </>
    );
  }
  