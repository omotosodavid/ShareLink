import { useEffect, useState } from "react";
import { collection, onSnapshot,doc } from "firebase/firestore";
import db from "../../partials/firebase";
import NoPhoneLinks from "./NoPhoneLinks";
import PhoneLinks from "./PhoneLinks";

const PhoneLinkFormat = ({ textWidth,height }) => {
  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return; // Ensure userId is available

    const userCollectionRef = doc(db, `user-${userId}`, "content");
    const headScrapeRef = collection(userCollectionRef, "headScrape");

    // Listen for real-time updates to the headScrape collection
    const unsubscribe = onSnapshot(headScrapeRef, (snapshot) => {
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
        <NoPhoneLinks height={height}/>
      )}
    </>
  );
};

export default PhoneLinkFormat;
