import { useEffect, useState, useRef } from "react";
import useFunctions from "../../utils/useFunctions";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../partials/firebase";
import NewLinks from "./newLink";
import UseInput from "../../utils/useInput";

const LinkGroups = ({ newlink, cancel }) => {
  const [ogResult, setOGResult] = useState([]);
  const [ogId, setOGId] = useState([]);
  const [SocialPlatforms, setSocialPlatforms] = useState([]); // Use useState for SocialPlatforms
  const { handlePushToSocials } = useFunctions();
  const { handleEditData, handleDeleteData } = UseInput();
  const inputDisable = useRef();
  const saveButton = useRef();
  useEffect(() => {
    onSnapshot(collection(db, "headScrape"), (snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      let id = snapshot.docs.map((doc) => doc.id);
      setOGId(id);
      setOGResult(data);
    });
    if (ogResult.length > 0) {
      let social = [];
      handlePushToSocials(ogResult, social);
      if (JSON.stringify(SocialPlatforms) !== JSON.stringify(social)) {
        setSocialPlatforms(social);
      }
      
    }
  }, [ogResult, handlePushToSocials,SocialPlatforms]);

  return (
    <ol className="grid place-content-stretch gap-y-5 mt-6">
      {SocialPlatforms.map((SocialPlatform, index) => {
        const { title, url } = SocialPlatform;
        return (
          <li key={index} className="bg-gray-100 rounded-lg p-3">
            <section className="flex justify-between items-center">
              <section className="flex items-center gap-x-1 text-gray-600 font-medium text-lg">
                <i className="bi bi-list"></i>
                <h5>Link #{index + 1}</h5>
              </section>
              <section className="flex gap-x-4 items-center text-gray-400 text-lg font-medium">
                <button
                  className="hover:text-gray-700"
                  onClick={() => handleDeleteData(ogId,index)}
                >
                  Remove
                </button>
                <button
                  className="hover:text-gray-700"
                  onClick={() => handleEditData(inputDisable, saveButton)}
                >
                  Edit
                </button>
              </section>
            </section>
            <section className="grid gap-y-6 mt-6">
              <section className="grid gap-y-2 text-gray-600 text-lg font-medium">
                <label htmlFor="social-platform">Platform</label>
                <select
                  className="w-full p-3 rounded-lg"
                  name="Social platform"
                  id="social-platform"
                  disabled
                >
                  <option value={title}>{title}</option>
                </select>
              </section>
              <form className="grid gap-y-2 text-gray-600 text-lg font-medium">
                <label htmlFor="links">URL</label>
                <section className="relative">
                  <i className="bi bi-link-45deg absolute text-2xl top-3 left-2"></i>
                  <input
                    className="disabled:bg-white/70 disabled:text-gray-500/90 w-full p-3 rounded-lg pl-10"
                    type="text"
                    name="SocialLinks"
                    id="links"
                    ref={inputDisable}
                    placeholder="Type in your url"
                    value={url}
                    disabled
                    required
                  />
                </section>
                <button
                  className="hidden py-2 px-6 bg-purple-500 text-white rounded-md w-24 mt-6 hover:bg-purple-400"
                  type="submit"
                  ref={saveButton}
                >
                  Save
                </button>
              </form>
            </section>
          </li>
        );
      })}
      {newlink && <NewLinks cancel={cancel} />}
    </ol>
  );
};

export default LinkGroups;
