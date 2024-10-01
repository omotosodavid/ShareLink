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
      <Navbar />
      <section className="flex flex-wrap xl:justify-between justify-center gap-y-8 items-start mb-6">
        <Phonedisplay />
        <section className="md:w-[47rem] w-full bg-white sm:py-10 pt-5 pb-8 md:px-8 px-4 rounded-lg grid place-content-stretch gap-y-5">
          <ProfileIntro />
          <ProfilePicture />
          <UserInfo />
        </section>
      </section>
      {alert && <AlertMessage message={alert.message} icon={alert.icon} color={alert.color}/>}
    </>
  );
};

export default ProfileDeatils;
