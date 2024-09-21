import DisplayProfile from "../PhoneDisplay/DisplayProfile";
import PhoneLinkFormat from "../PhoneDisplay/PhoneLinkFormat";
const PreviewDetails = () => {
  return (
    <section className="absolute w-full left-0 top-44">
      <section className="bg-white w-96 rounded-2xl mx-auto p-10 mb-4 pb-4 pt-6 grid gap-y-6">
        <DisplayProfile size={"h-40 w-40"} />
        <PhoneLinkFormat/>
      </section>
    </section>
  );
};
export default PreviewDetails;
