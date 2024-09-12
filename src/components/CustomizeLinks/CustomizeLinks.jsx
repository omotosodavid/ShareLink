import { useState } from "react";
import CustomizeIntro from "./CustomizeIntro";
import LinkGroups from "./LinkGroups";
import Navbar from "../../static/NavBar/Navbar"
import Phonedisplay from "../PhoneDisplay/Phonedisplay"
const Customizelinks = () => {
  const [showNewLinks, setShowNewLinks] = useState(false);
  const addLink = () => {
    setShowNewLinks(true);
  };
  const cancel = () => {
    setShowNewLinks(false);
  };
  return (
    <>
    <Navbar/>
      <section className="flex justify-between items-start">
        <Phonedisplay/>
        <section className="w-[47rem] bg-white py-10 px-8 rounded-lg grid place-content-stretch gap-y-5">
          <CustomizeIntro addlink={addLink} />
          <LinkGroups newlink={showNewLinks} cancel={cancel} />
        </section>
      </section>
    </>
  );
};

export default Customizelinks;
