import React from "react";
import JoyRide, {CallBackProps} from "react-joyride";
import {SetTour} from '@/app/tools/sessions';

const TOUR_STEPS = [
    {
      target: ".nav-step",
      content: "You can download the resume, send an email, or get the phone number, or switch the languages in the main navigation.",
    },
    {
      target: '.intro-step',
      content: "Here is a brief introduction about myself and some of the technologies that I'm currently using.\n\nHover over the tags to view more information about the technologies.",
    },
    {
      target: ".exp-step",
      content: "You can navigate through my experience using the pagination located at both the top and bottom of this section.",
    },
    {
      target: '.personalinfo-step',
      content: 'In the personal information section, you can find additional details about me.',
    },
    {
        target: '.skills-step',
        content: 'This section provides information about my profile and skills.',
      },
      {
        target: '.data-step',
        content: 'This section contains data visualizations about my history, technologies, and skills.',
      },
  ];

const Tour = () => {
    const handleJoyrideCallback = (data: CallBackProps) => {
        if (data.action === 'skip' || data.action === 'reset'){
            SetTour();
        }
    }

  return (
    <>
      <JoyRide
        callback={handleJoyrideCallback}
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
              textAlign: "left"
            },
          buttonNext: {
              backgroundColor: "green"
            },
          buttonBack: {
              marginRight: 10
            }
        }}
      />
    </>
  );
};


export default Tour;