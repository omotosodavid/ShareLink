import { useState } from "react";
import { Helmet } from "react-helmet";
import logo from "../../assets/Sharelinks-logo.png";
import CustomizeIntro from "./CustomizeIntro";
import Navbar from "../../static/NavBar/Navbar";
import Phonedisplay from "../PhoneDisplay/Phonedisplay";
import LinkFormat from "./LinkFormat";
import AlertMessage from "../../static/alertMessage";
import { useCustomContext } from "../../utils/useCustomContext";
const Customizelinks = () => {
  const [showNewLinks, setShowNewLinks] = useState(false);
  const { alert } = useCustomContext();
  const addLink = () => {
    setShowNewLinks(true);
  };
  const cancel = () => {
    setShowNewLinks(false);
  };
  return (
    <>
      <Helmet>
        <title>ShareLinks - Simplify Link Sharing</title>
        <meta
          name="description"
          content="ShareLinks provides a simple way to share and save important links across platforms. Organize and manage your links with ease."
        />
        <meta http-equiv="X-UA-Compatible" content="IE=7" />
        <meta
          name="keywords"
          content="share, links, social media, platforms, url, save links, share links, organize links, link management"
        />
        <meta
          property="og:title"
          content="ShareLinks - Simplify Link Sharing"
        />
        <meta
          property="og:description"
          content="Easily share and manage important links across multiple platforms with ShareLinks."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={logo}
        />
        <meta property="og:url" content="https://sharelinks-one.vercel.app" />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" href={logo} type="image/x-icon" />
        <link rel="apple-touch-icon" href={logo} />
      </Helmet>
      <Navbar />
      <section className="flex flex-wrap xl:justify-between justify-center gap-y-8 items-start mb-6">
        <Phonedisplay />
        <section className="md:w-[47rem] bg-white sm:py-10 pt-5 pb-8 md:px-8 px-4 rounded-lg grid place-content-stretch gap-y-5">
          <CustomizeIntro addlink={addLink} />
          <LinkFormat newlink={showNewLinks} cancel={cancel} />
        </section>
      </section>
      {alert && (
        <AlertMessage
          message={alert.message}
          icon={alert.icon}
          color={alert.color}
        />
      )}
    </>
  );
};

export default Customizelinks;
