import { useEffect, useState } from "react";
import useFunctions from "../../utils/useFunctions";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../partials/firebase";

const PhoneLinks = () => {
  const [platforms, setPlatforms] = useState([]);
  const { getRandomColor } = useFunctions();
  const Links = [];

  useEffect(() => {
    onSnapshot(collection(db, "headScrape"), (snapshot) => {
      let data = snapshot.docs.map((doc) => doc.data());
      setPlatforms(data)
    });
  }, []);

  const pushLinks = () => {
    platforms.forEach((platform) => {
    let newPlatform
   !platform.result?newPlatform=platform:newPlatform=platform.result
      Links.push({
        name: newPlatform.title,
        url: newPlatform.url,
        icon: newPlatform.icon,
        color: getRandomColor(),
      });
    });
  };
  pushLinks();

  return (
    <ul className="grid content-center gap-y-6">
      {Links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.url}
            target="_blank"
            className={`flex items-center justify-between p-3 py-4 ${link.color} hover:${link.color}/80 rounded-lg group`}
          >
            <section className="flex items-center gap-x-2 text-lg text-white font-medium">
              <img
                className="w-6 h-6 rounded-full object-cover"
                src={link.icon}
                alt={`${link.name} icon`}
              />
              <p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px]">
                {link.name}
              </p>
            </section>
            <section>
              <i className="bi bi-arrow-right-short text-white text-2xl group-hover:pr-2 duration-200"></i>
            </section>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PhoneLinks;
