import Experience from "../experience/Experience";
import GeneralInfo from "../generalInfo/GeneralInfo";
import Skills from "../generalInfo/Skills";
import Infograms from "../infograms/Infograms";
import Introduction from "../introduction/Introduction";

export default function Skeleton() {
  return (
    <>
  <div className="introduction p-5">
        <Introduction />
  </div>
    <div className="general flex min-h-screen">
        <div className="experience w-9/12">
          <h1></h1>
          <Experience />
          <div className="extraInfo min-h-40">
            <Infograms />
          </div>
        </div>
        <div className="generalInfo w-3/12">
          <GeneralInfo />
          <Skills />
        </div>
    </div>
  </>
  );
}
