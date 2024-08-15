import ProfileIntro from "./ProfileIntro";
import ProfilePicture from "./ProfilePicture";
import UserInfo from "./UserInfo";

const ProfileDeatils = () => {
  return (
    <section className="w-[47rem] bg-white py-10 px-8 rounded-lg grid place-content-stretch gap-y-5">
      <ProfileIntro />
      <ProfilePicture />
      <UserInfo />
    </section>
  );
};

export default ProfileDeatils;
