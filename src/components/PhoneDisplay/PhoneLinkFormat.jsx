import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../partials/firebase";
import NoPhoneLinks from "./NoPhoneLinks";
import PhoneLinks from "./PhoneLinks";

const PhoneLinkFormat = ({textWidth}) => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "headScrape"), (snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      setPlatforms(data);
    });
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
