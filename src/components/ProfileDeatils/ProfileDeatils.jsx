import { Helmet } from "react-helmet";
import logo from "../../assets/Sharelinks-logo.png";
import ProfileIntro from "./ProfileIntro";
import ProfilePicture from "./ProfilePicture";
import UserInfo from "./UserInfo";
import Navbar from "../../static/NavBar/Navbar";
import Phonedisplay from "../PhoneDisplay/Phonedisplay";
import AlertMessage from "../../static/alertMessage";
import { useCustomContext } from "../../utils/useCustomContext";

const ProfileDeatils = () => {
  const { alert } = useCustomContext();
  return (
    <>
      <Helmet>
        <title>ShareLinks - Change Profile Details</title>
        <meta
          name="description"
          content="Update or change your profile information on ShareLinks. Modify your name, email, profile picture, and other user details."
        />
        <meta http-equiv="X-UA-Compatible" content="IE=7" />
        <meta
          name="keywords"
          content="profile, change, picture, image, information, user, info, name, email, first name, last name, update, user settings"
        />
        <meta
          property="og:title"
          content="ShareLinks - Change Profile Details"
        />
        <meta
          property="og:description"
          content="Update or modify your profile information such as name, email, and profile picture on ShareLinks."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={logo}
        />
        <meta property="og:url" content="https://sharelinks-one.vercel.app/profile" />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" href={logo} type="image/x-icon" />
        <link rel="apple-touch-icon" href={logo} />
      </Helmet>

      <Navbar />
      <section className="flex flex-wrap xl:justify-between justify-center gap-y-8 items-start mb-6">
        <Phonedisplay />
        <section className="md:w-[47rem] w-full bg-white sm:py-10 pt-5 pb-8 md:px-8 px-4 rounded-lg grid place-content-stretch gap-y-5">
          <ProfileIntro />
          <ProfilePicture />
          <UserInfo />
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

export default ProfileDeatils;
