import { Link } from "react-router-dom";
import useFunctions from "../../utils/useFunctions";
const PhoneLinks = ({ platforms }) => {
  const { pushLinks } = useFunctions();
  const Links = [];
  pushLinks(platforms, Links);

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
