import DisplayProfile from "../PhoneDisplay/DisplayProfile";
import PhoneLinkFormat from "../PhoneDisplay/PhoneLinkFormat";
const PreviewDetails = () => {
  const getUrl=window.location.href
 const id =getUrl.split("/")[4]
  return (
    <section className="absolute w-full left-0 top-44">
      <section className="bg-white h-[34rem] overflow-hidden sm:w-96 w-[22rem] rounded-2xl mx-auto mb-8 grid gap-y-6">
        <div className="w-full sm:px-10 px-4 pt-6 pb-4 h-full mx-auto scroll overflow-y-auto">
          <DisplayProfile Id={id} size={"h-40 w-40"} />
          <br />
          <PhoneLinkFormat textWidth={"w-56"} height={"h-auto"} Id={id} />
        </div>
      </section>
    </section>
  );
};
export default PreviewDetails;
