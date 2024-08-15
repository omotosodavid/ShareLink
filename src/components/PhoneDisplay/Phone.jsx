import { useEffect, useState } from "react";
import db from "../../partials/firebase";
import PhoneMockup from "../../assets/PhoneMockup.jpg";
import PhoneLinks from "./PhoneLinks";
import { collection, onSnapshot } from "firebase/firestore";
const Phone = () => {
  const [info, setInfo] = useState("");
  useEffect(() => {
    onSnapshot(collection(db, "userinfo"), (snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      setInfo(data[0]);
    });
  }, []);

  return (
    <section className="relative">
      <figure className="h-[35.6rem]">
        <img className="h-full" src={PhoneMockup} alt="phonemockup" />
      </figure>
      <section className="absolute top-20 w-full">
        {/* Profile picture */}
        <section className="grid place-items-center mb-4">
          <figure>
            <img className="w-32 h-32 rounded-full object-cover" src={info.img} alt="" />
          </figure>
        </section>
        {/* Profile info */}
        <section className="text-center text-lg">
          <h3 className="font-bold mb-1">
            {info.firstname} {info.lastname}
          </h3>
          <p className="w-[18rem] left-4 pr-3 relative overflow-x-auto scroll-hidden overflow-x-auto:after">
            <span className="scroll-x-anime">{info.email}</span>
          </p>
        </section>
        <section className="mt-8 h-56 pb-1 px-5 overflow-y-auto scroll-hidden">
          <PhoneLinks />
        </section>
      </section>
    </section>
  );
};

export default Phone;
