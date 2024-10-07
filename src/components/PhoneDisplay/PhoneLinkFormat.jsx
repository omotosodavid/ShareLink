import { useEffect, useState } from "react";
import { collection, onSnapshot,doc } from "firebase/firestore";
import db from "../../partials/firebase";
import NoPhoneLinks from "./NoPhoneLinks";
import PhoneLinks from "./PhoneLinks";

const PhoneLinkFormat = ({ textWidth,height,Id }) => {
  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    const userCollectionRef = doc(db, `user-${Id}`, "content");
    const headScrapeRef = collection(userCollectionRef, "headScrape");

    // Listen for real-time updates to the headScrape collection
    const unsubscribe = onSnapshot(headScrapeRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setPlatforms(data);
    });
    return () => unsubscribe();
  }, [Id]);
  return (
    <>
      {platforms.length ? (
        <PhoneLinks platforms={platforms} textWidth={textWidth} />
      ) : (
        <NoPhoneLinks height={height}/>
      )}
    </>
  );
};

export default PhoneLinkFormat;
