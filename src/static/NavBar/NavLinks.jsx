import { Link } from "react-router-dom";

const NavLinks = () => {
  const Linknavs = [
    { name: "Links", icon: "bi bi-link-45deg", link: "/" },
    { name: "Profile Details", icon: "bi bi-person-circle", link: "/profile" },
  ];

  return (
    <ul className="flex w-72 items-center justify-between">
      {Linknavs.map((nav, index) => (
        <li
          className="text-gray-700 py-2 px-3 rounded-lg duration-500 hover:bg-purple-100 hover:text-purple-800 text-lg cursor-pointer "
          key={index}
        >
          <Link className=" flex items-center gap-x-2" to={nav.link}>
            <i className={nav.icon}></i>
            <p className="font-medium">{nav.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Preview = () => {
  return (
    <button className="text-purple-700 text-lg font-medium py-2 px-7 border-purple-600 border-2 rounded-lg">
      Preview
    </button>
  );
};

export { NavLinks, Preview };
