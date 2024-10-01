import { useState } from "react";
import CustomizeIntro from "./CustomizeIntro";
import Navbar from "../../static/NavBar/Navbar"
import Phonedisplay from "../PhoneDisplay/Phonedisplay"
import LinkFormat from "./LinkFormat";
import AlertMessage from "../../static/alertMessage";
import { useCustomContext } from "../../utils/useCustomContext";
const Customizelinks = () => {
  const [showNewLinks, setShowNewLinks] = useState(false);
  const {alert}=useCustomContext()
  const addLink = () => {
    setShowNewLinks(true);
  };
  const cancel = () => {
    setShowNewLinks(false);
  };
  return (
    <>
    <Navbar/>
      <section className="flex flex-wrap xl:justify-between justify-center gap-y-8 items-start mb-6">
        <Phonedisplay/>
        <section className="md:w-[47rem] bg-white sm:py-10 pt-5 pb-8 md:px-8 px-4 rounded-lg grid place-content-stretch gap-y-5">
          <CustomizeIntro addlink={addLink} />
          <LinkFormat newlink={showNewLinks} cancel={cancel} />
        </section>
      </section>
      {alert && <AlertMessage message={alert.message} icon={alert.icon} color={alert.color}/>}
    </>
  );
};

export default Customizelinks;
