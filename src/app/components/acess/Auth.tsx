import { checkToken } from "@/app/tools/services";
import { GetTemp } from "@/app/tools/sessions";
import { sendEmail } from "@/app/api/email";
import { FormEvent, useReducer, useState } from "react"
import { useTranslation } from "react-i18next";
//import { sendGAEvent } from '@next/third-parties/google';
import * as gtag from "@/app/tools/gtag";


export function Auth() {
      const { i18n, t } = useTranslation();
       const [acess,setAccess] = useState<boolean>(false); 
       const [isDisabled, setDisabled] = useState<boolean>(true);
       const [accessToken, setToken] = useState<number>(0);
       const [isResent, setResent] =  useState<boolean>(false);
       const [isMatch, setMatch] =  useState<boolean>(false);
       const [isSubmited, setSubmit] =  useState<boolean>(false);
       const [disabledResent, setDisabledResent] =  useState<boolean>(false);

       function addToken(e : React.ChangeEvent<HTMLInputElement>){
         const token = e.target.value;
         const regexNumber = /^\d+\.?\d*$/;

         if (regexNumber.test(token)){
            setToken(parseInt(token));
            setDisabled(false);
         } else{
            setDisabled(true);
         }
       }

       function submitToken(e: FormEvent<HTMLFormElement>){
         e.preventDefault();     
           //sendGAEvent({ event: 'submitToken', value: 'click' });
           gtag.event({ action: "submitToken",category:"auth",label:"token", value: 'click' });
           const isToken =  checkToken(accessToken);
           setMatch(isToken);
           setSubmit(true);
           //sendGAEvent({ event: 'isToken', value: isToken });
           gtag.event({ action: "isToken",category:"auth",label:"token", value: isToken ? 'ok':'not ok' });
           if (isToken){
            location.reload();
           } 
           setDisabledResent(false);        
       }

       async function SendToken(){
        setDisabledResent(true);
        const tempObj = GetTemp();
        //sendGAEvent({ event: 'resent', value: tempObj.email });
        gtag.event({ action: "resent",category:"auth",label:"token", value: tempObj.email });
        const isSent = await sendEmail(tempObj);
        //sendGAEvent({ event: 'isSent', value: isSent });
        gtag.event({ action: "isSent",category:"auth",label:"token", value: isSent ? 'ok':'not ok' });
        setResent(isSent);
       }
   return(
    <div>      
      <form onSubmit={submitToken}>
        <div>
          {!isMatch && isSubmited ? (<p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{t('auth.errorMistMatch')}</p>):("")}
        </div>
      <div className="border-b border-gray-900/10 pb-12 space-y-12">
      <p className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
        {!isResent ? t('auth.authMessage'):t('auth.resentMessage')}
        </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="token" property="block text-sm font-medium leading-6 text-gray-900">{t('auth.addToken')}</label>
                          <div className="mt-4 w-96">
                          <input type="text" id="token" className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm " onChange={addToken}/>
                          <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2" disabled={isDisabled} >{t('auth.accessBtn')}</button>
                          </div>
                        </div>
                    </div>
          
          <div>{t('auth.noEmailMessage')} 
          <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right" onClick={SendToken} disabled={disabledResent}>{t('auth.reSentButton')}</button></div>
      </div>
      </form>
      
    </div>
   );
}