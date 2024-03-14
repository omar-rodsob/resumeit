"use client"
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DataUsageIcon from '@mui/icons-material/DataUsage';

import Analytics from "./Analytics";
import Chronology from "./Chronology";
import { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SkillGraph from "./SkillGraph";

import {StyleTime, StyleCron, StyleSkills} from "@/app/tools/const";


export default function InfoGrams() {
	const { i18n, t } = useTranslation();
	const [openData, setOpenData] = useState(false);
	const [openCronBln, setOpenCron] = useState(false);
	const [openSkill, setOpenSkill] = useState(false);
  	const openDataMind = () => setOpenData(true);
  	const closeDataMind = () => setOpenData(false);
	const openCron = () => setOpenCron(true);
  	const closeCron = () => setOpenCron(false);
	const openSkills = () => setOpenSkill(true);
  	const closeSkills = () => setOpenSkill(false);
  return (
    <div className="p-5 bg-module p-5 rounded border-borderColor border-2 m-2 data-step"> 
	  <Button onClick={openCron}>{t('infograms.cron')}<ViewTimelineIcon/></Button>	  
		<Modal
			open={openCronBln}
			onClose={closeCron}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
		<Box sx={StyleTime}>
			<Chronology />
		</Box>
		</Modal>
	  <Button onClick={openDataMind}>{t('infograms.mind')} <AccountTreeIcon/></Button>
	  <Modal
        open={openData}
        onClose={closeDataMind}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
		<Box sx={StyleCron}><Analytics /></Box>		
	</Modal>
	<Button onClick={openSkills}>{t('infograms.tools')} <DataUsageIcon/></Button>
	<Modal
        open={openSkill}
        onClose={closeSkills}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
		<Box sx={StyleSkills}><SkillGraph /></Box>		
	</Modal>
      
    </div>
  );
}


