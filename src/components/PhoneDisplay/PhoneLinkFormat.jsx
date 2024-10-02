import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../partials/firebase";
import NoPhoneLinks from "./NoPhoneLinks";
import PhoneLinks from "./PhoneLinks";

const PhoneLinkFormat = ({ textWidth }) => {
  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "headScrape"), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setPlatforms(data);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      {platforms.length ? (
        <PhoneLinks platforms={platforms} textWidth={textWidth} />
      ) : (
        <NoPhoneLinks />
      )}
    </>
  );
};

export default PhoneLinkFormat;
