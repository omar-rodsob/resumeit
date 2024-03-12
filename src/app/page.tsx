
"use client"
import "../i18n";
import Skeleton from '@/app/components/skeleton/Skeleton';
import Footer from "./components/resumeitdata/Footer";
import { Menu } from './components/menu/Menu';
import {GetSession} from '@/app/tools/sessions';
import { useEffect, useState } from "react";
import {Access} from '@/app/components/acess/SiteAccess';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ClassNames } from "@emotion/react";

import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [Guest, setGuest] = useState<string | null>();
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(()=>{
    const GuestS = GetSession();
    setGuest(GuestS);
    setLoading(false);
  },[]);
  return (
    <>
      <main className="flex min-h-screen flex-col  justify-between bg-body">
        <>
        <div className={!Guest  ? "divBlur":""} >
          <Menu />
          <Skeleton />
          <Footer /> 
        </div>
        <Modal 
        open={!Guest}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
       >
         <Box sx={style} >
           <Access />
         </Box>
       </Modal>
        </>     
      </main>
    </>
  );
}
