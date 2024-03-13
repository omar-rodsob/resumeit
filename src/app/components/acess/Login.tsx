import { createToken } from "@/app/tools/services";
import {sendEmail} from "@/app/api/email";
import { FormEvent, useState } from "react"
import { useTranslation } from "react-i18next";
import { sendGAEvent } from '@next/third-parties/google'

type loginProps = {
    onSent: Function;
}

export function Login({onSent}: loginProps){
    const { i18n, t } = useTranslation();
    const [isDisabled, setDisabled] = useState<boolean>(true);
    const [emailGuest, setEmail] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    function addEmail(e : React.ChangeEvent<HTMLInputElement>){
        const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const email = e.target.value;
        if (regExEmail.test(email)){
            setDisabled(false);
            setEmail(email);
        }
    }

    async function submitEmail(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        let isSent = false;
        if (!isDisabled) {
            sendGAEvent({ event: 'loginclick', value: emailGuest });
            setDisabled(true);
            const tokenObj = await createToken(emailGuest);
            const isSent = await sendEmail(tokenObj);
            if(isSent){
                sendGAEvent({ event: 'emailSend', value: 'ok' });
                onSent(isSent);
                setError(false);    
            }else{
                sendGAEvent({ event: 'emailSend', value: 'notok' });
                setError(true);
                setDisabled(false);
            }
        }
        
    }
    return (
        <div>           
            <form onSubmit={submitEmail}>
                <div className="border-b border-gray-900/10 pb-12 space-y-12">
                    {error ? (<p className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">{t('auth.errorSending')}</p>):("")}
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        {t('auth.firstMessage')}
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                        <label htmlFor="email" property="block text-sm font-medium leading-6 text-gray-900">{t('auth.email')}</label>
                        <div className="mt-2">
                            <input type="text" name="email" id="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  onChange={addEmail} required/>
                        </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={isDisabled}>{t('auth.btnToken')}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}