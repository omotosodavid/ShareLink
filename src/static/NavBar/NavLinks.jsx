import { NavLink } from "react-router-dom";
import useFunctions from "../../utils/useFunctions";

const NavLinks = () => {
  const userId= sessionStorage.getItem("userId")
  const activeLink = "bg-purple-100 text-purple-800";
  const inActiveLink = "bg-transparent text-gray-700";
  const Linknavs = [
    { name: "Links", icon: "bi bi-link-45deg", link: "/" },
    { name: "Profile Details", icon: "bi bi-person-circle", link: "/profile" },
    { name: "Preview", icon: "bi bi-play-fill", link: `/preview/${userId}` },
  ];

  return (
    <ul className="flex md:w-[26.5rem] w-48 items-center justify-between">
      {Linknavs.map((nav, index) => (
        <li className="text-lg" key={index}>
          <NavLink
          title={nav.name}
            className={({ isActive }) =>
              `flex items-center gap-x-2 hover:bg-purple-100 hover:text-purple-800 py-2 px-3 rounded-lg duration-500 ${
                isActive ? activeLink : inActiveLink
              }`
            }
            to={nav.link}
          >
            <i className={`${nav.icon} text-3xl`}></i>
            <p className="font-medium md:block hidden">{nav.name}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const SignOut = () => {
  const { handleSignOut } = useFunctions();
  return (
    <button
      onClick={() => handleSignOut()}
      title="Sign Out"
      className="text-purple-700 font-medium border-purple-600 hover:bg-purple-600 hover:text-white duration-200 border-2 rounded-lg py-2 lg:px-6 px-3"
    >
      <i className="bi bi-box-arrow-right lg:hidden text-2xl"></i>
      <p className="lg:block hidden">Sign Out</p>
    </button>
  );
};

export { NavLinks, SignOut };
