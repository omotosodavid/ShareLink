import { useEffect, useState } from "react";
import db from "../../partials/firebase";
import { collection, onSnapshot } from "firebase/firestore";
const DisplayProfile = ({size}) => {
  const [info, setInfo] = useState("");
  useEffect(() => {
    onSnapshot(collection(db, "userinfo"), (snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      setInfo(data[0]);
    });
  }, []);
  return (
    <>
      {/* Profile picture */}
      <section className="grid place-items-center mb-4">
        <figure>
          <img
            className={`${size} rounded-full border-2 border-purple-700 p-0.5 object-cover`}
            src={info.img}
            alt=""
          />
        </figure>
      </section>
      {/* Profile info */}
      <section className="text-center text-lg">
        <h3 className="font-bold mb-1">
          {info.firstname} {info.lastname}
        </h3>
        <p className="w-[90%] left-4 pr-3 relative overflow-x-auto scroll-hidden overflow-x-auto:after">
          <span className="scroll-x-anime">{info.email}</span>
        </p>
      </section>
    </>
  );
};
export default DisplayProfile;
