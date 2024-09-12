import { useCustomContext } from "../../utils/useCustomContext";
import useFunctions from "../../utils/useFunctions";
import { Link } from "react-router-dom";

const PhoneLinks = () => {
  const { platforms } = useCustomContext();
  const { getRandomColor } = useFunctions();
  const Links = [];
  const pushLinks = () => {
    platforms.forEach((platform) => {
      Links.push({
        name: platform.title,
        url: platform.url,
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
            <section className="flex items-center gap-x-3 text-lg text-white font-medium">
              {/* <i className={link.icon}></i> */}
              <p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px]">{link.name}</p>
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
