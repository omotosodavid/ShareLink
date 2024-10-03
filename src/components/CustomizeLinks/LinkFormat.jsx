import { useEffect, useState } from "react";
import { collection, onSnapshot, doc } from "firebase/firestore";
import db from "../../partials/firebase";
import NoLinksAvailable from "./NoLinksAvailable";
import LinkGroups from "./LinkGroups";
import NewLinks from "./NewLink";
import { useCustomContext } from "../../utils/useCustomContext";
const LinkFormat = ({ newlink, cancel }) => {
  const [ogResult, setOGResult] = useState([]);
  const [ogId, setOGId] = useState([]);
  const { loading } = useCustomContext();
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return; // Ensure userId is available

    const userCollectionRef = doc(db, `user-${userId}`, "content");
    const headScrapeRef = collection(userCollectionRef, "headScrape");

    // Listen for real-time updates to the headScrape collection
    const unsubscribe = onSnapshot(headScrapeRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const ids = snapshot.docs.map((doc) => doc.id);
      setOGId(ids);
      setOGResult(data);
      
    });

    return () => unsubscribe();
  }, []); 

  return (
    <>
      {loading && (
        <div className="text-xl text-gray-500 text-center font-medium">
          <i className="inline-block p-1 border-[3px] border-l-transparent mr-2 animate-spin border-gray-500 rounded-full"></i>
          Loading
        </div>
      )}
      {ogResult.length ? (
        <LinkGroups result={ogResult} id={ogId} />
      ) : (
        <NoLinksAvailable />
      )}

      {newlink && <NewLinks cancel={cancel} />}
    </>
  );
};

export default LinkFormat;
