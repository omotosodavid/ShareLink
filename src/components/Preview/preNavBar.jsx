import { NavLink } from "react-router-dom";
import { MobileShare, ShareLinkButtons } from "./shareLinkButtons";
const PreviewNavbar = () => {
  return (
    <section className="w-full h-80 pt-5 sm:px-8 px-4 bg-purple-700 sm:rounded-b-[2rem]">
      <header className="mx-auto bg-white p-6 py-4 rounded-xl">
        <ul className="flex justify-between items-center">
          <li>
            <NavLink
              to="/"
              title="Back to Editor"
              className={({ isActive }) =>
                `h-full py-2 block sm:px-7 px-5 hover:bg-purple-600 hover:text-white duration-200 rounded-lg border-2 text-purple-700 text-lg font-medium border-purple-600 ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "bg-transparent text-purple-700"
                }`
              }
            >
              <i className="bi bi-box-arrow-left sm:hidden text-3xl"></i>
              <p className="sm:block hidden">Back to Editor</p>
            </NavLink>
          </li>
          <li className="relative group sm:block hidden">
            <button className=" py-2 px-7 hover:bg-white hover:text-purple-700 duration-200 rounded-lg border-2 text-white bg-purple-600 text-lg font-medium border-purple-600">
              Share Links
            </button>
            <ShareLinkButtons group={"group-hover:block"} />
          </li>
          <li className="sm:hidden block">
            <MobileShare />
          </li>
        </ul>
      </header>
    </section>
  );
};
export default PreviewNavbar;
