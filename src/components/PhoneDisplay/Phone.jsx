import PhoneMockup from "../../assets/PhoneMockup.jpg";
import PhoneLinks from "./PhoneLinks";
import DisplayProfile from "./displayProfile";
const Phone = () => {
  return (
    <section className="relative">
      <figure className="h-[35.6rem]">
        <img className="h-full" src={PhoneMockup} alt="phonemockup" />
      </figure>
      <section className="absolute top-16 w-full">
       <DisplayProfile size={"h-36 w-36"}/>
        <section className="mt-8 h-60 pb-1 px-5 overflow-y-auto scroll-hidden">
          <PhoneLinks />
        </section>
      </section>
    </section>
  );
};

export default Phone;
