
import DisplayProfile from "../PhoneDisplay/displayProfile";
import PhoneLinks from "../PhoneDisplay/PhoneLinks";

const PreviewDetails = () => {
  return (
    <section className="relative -top-24">
      <section className="bg-white w-96 rounded-2xl mx-auto p-10 pt-6 grid gap-y-6">
        <DisplayProfile size={"h-40 w-40"} />
        <PhoneLinks />
      </section>
    </section>
  );
};
export default PreviewDetails;
