import DisplayProfile from "../PhoneDisplay/DisplayProfile";
import PhoneLinkFormat from "../PhoneDisplay/PhoneLinkFormat";
const PreviewDetails = () => {
  return (
    <section className="absolute w-full left-0 top-44">
      <section className="bg-white h-[32rem] overflow-hidden w-96 rounded-2xl mx-auto mb-8 grid gap-y-6">
      <div className="w-full p-10 pt-6 pb-4 h-full mx-auto scroll-hidden overflow-y-auto">
      <DisplayProfile size={"h-40 w-40"} />
      <PhoneLinkFormat />
      </div>
      </section>
    </section>
  );
};
export default PreviewDetails;
