
"use client"
import "../i18n";
import Skeleton from '@/app/components/skeleton/Skeleton';
import Footer from "./components/resumeitdata/Footer";
import { Menu } from './components/menu/Menu';
import {GetSession,GetSessionTour} from '@/app/tools/sessions';
import { useEffect, useState } from "react";
import {Access} from '@/app/components/access/SiteAccess';
import Box from '@mui/material/Box';

const Tour = dynamic(
  () => import('../app/tools/Tour'),
  { ssr: false }
)

import Modal from '@mui/material/Modal';
import dynamic from "next/dynamic";

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
  const [TourS, setTourS] = useState<{ saw: boolean; }>();
  useEffect(()=>{
    const GuestS = GetSession();
    const TourSession = GetSessionTour();
    setTourS(TourSession);
    setGuest(GuestS);
    setLoading(false);
  },[]);
  return (
    <>
      <main className="flex min-h-screen flex-col  justify-between bg-body">
        <>
        <div className={!Guest  ? "divBlur":""} >
         {!TourS?.saw ? (<Tour />):("")} 
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
