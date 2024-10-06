import PhoneMockup from "../../assets/PhoneMockup.jpg";
import DisplayProfile from "./DisplayProfile";
import PhoneLinkFormat from "./PhoneLinkFormat";
const Phone = () => {
  return (
    <section className="relative">
      <figure className="h-[35.6rem]">
        <img className="h-full" src={PhoneMockup} alt="phonemockup" />
      </figure>
      <section className="absolute top-16 w-full">
       <DisplayProfile size={"h-36 w-36"}/>
        <section className="mt-5 h-60 pb-1 pl-4 pr-2 overflow-y-auto scroll w-[97%]">
          <PhoneLinkFormat textWidth={"w-40"} height={"h-full"}/>
        </section>
      </section>
    </section>
  );
};

export default Phone;
