import { NavLink } from "react-router-dom";
import useFunctions from "../../utils/useFunctions";

const NavLinks = () => {
  const activeLink = "bg-purple-100 text-purple-800";
  const inActiveLink = "bg-transparent text-gray-700";
  const Linknavs = [
    { name: "Links", icon: "bi bi-link-45deg", link: "/" },
    { name: "Profile Details", icon: "bi bi-person-circle", link: "/profile" },
    { name: "Preview", icon: "bi bi-eye-fill", link: "/preview" },
  ];

  return (
    <ul className="flex w-96 items-center justify-between">
      {Linknavs.map((nav, index) => (
        <li className="text-lg" key={index}>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-x-2 hover:bg-purple-100 hover:text-purple-800 py-2 px-3 rounded-lg duration-500 ${
                isActive ? activeLink : inActiveLink
              }`
            }
            to={nav.link}
          >
            <i className={nav.icon}></i>
            <p className="font-medium">{nav.name}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const SignOut = () => {
  const {handleSignOut}=useFunctions()
  return (
    <button onClick={()=>handleSignOut()} className="text-purple-700 text-base font-medium border-purple-600 hover:bg-purple-600 hover:text-white duration-200 border-2 rounded-lg py-2 px-6">
        Sign Out
    </button>
  );
};

export { NavLinks, SignOut };
