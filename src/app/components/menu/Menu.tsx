"use client"
import { NavLink } from "react-router-dom";
import { LANGUAGES } from "@/languages/languages";
import { useTranslation } from "react-i18next";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MailIcon from '@mui/icons-material/Mail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { ButtonBase } from "@mui/material";
import { useState } from "react";



const isActive = ({ isActive }: any) => `link ${isActive ? "active" : ""}`;
const phoneNumber = '6621393007';

export const Menu = () => {
    const { i18n, t } = useTranslation();
    const [phoneBln, setShowPhone] = useState<boolean>(false);

    const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
      };
     function showPhone (){
      setShowPhone(!phoneBln);
     }
  return (
    <nav className="bg-main p-5 rounded border-borderColor m-2 min-h-05 flex nav-step">
      <h4 className="text-2xl font-bold text-slate-100">Omar Rodriguez Soberanes</h4>
      <div className="w-52">
        <a href="/omarrodriguez.pdf" target="blank" className="m-1"><FileDownloadIcon sx={{color:'white'}}/></a>
        <a href="mailto:test@test.com"  className="m-1"><MailIcon sx={{color:'white'}} /></a>
        <ButtonBase onClick={showPhone}><ContactPhoneIcon sx={{color:'white'}} /></ButtonBase> <span className="text-white">{phoneBln ? phoneNumber:''}</span>
      </div>
      <select className="ml-auto" defaultValue={i18n.language} onChange={onChangeLang}>
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </nav>
  );
};