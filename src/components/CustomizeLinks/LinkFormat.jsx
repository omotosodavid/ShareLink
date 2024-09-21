import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../partials/firebase";
import NoLinksAvailable from "./NoLinksAvailable";
import LinkGroups from "./LinkGroups";
import NewLinks from "./NewLink";
import { useCustomContext } from "../../utils/useCustomContext";
const LinkFormat = ({ newlink, cancel }) => {
  const [ogResult, setOGResult] = useState([]);
  const [ogId, setOGId] = useState([]);
  const { action } = useCustomContext();
  useEffect(() => {
    onSnapshot(collection(db, "headScrape"), (snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      let id = snapshot.docs.map((doc) => doc.id);
      setOGId(id);
      setOGResult(data);
    });
  }, []);

  return (
    <>
      {action && (
        <div className="text-xl text-gray-500 text-center font-medium">
          <i className="inline-block p-1 border-[3px] border-l-transparent mr-2 animate-spin border-gray-500 rounded-full"></i>
          {action}
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
