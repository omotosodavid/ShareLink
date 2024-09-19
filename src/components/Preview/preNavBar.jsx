import { NavLink } from "react-router-dom";
import ShareLinkButtons from "./shareLinkButtons";
const PreviewNavbar = () => {
  return (
    <section className="w-full h-72 pt-5 px-8 bg-purple-700 rounded-b-[7em]">
      <header className="mx-auto bg-white p-6 py-4 rounded-xl">
        <ul className="flex justify-between items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `h-full py-2 block px-7 hover:bg-purple-600 hover:text-white duration-200 rounded-lg border-2 text-purple-700 text-lg font-medium border-purple-600 ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "bg-transparent text-purple-700"
                }`
              }
            >
              Back to Editor
            </NavLink>
          </li>
          <li className="relative group">
            <button className=" py-2 px-7 hover:bg-white hover:text-purple-700 duration-200 rounded-lg border-2 text-white bg-purple-600 text-lg font-medium border-purple-600">
              Share Link
            </button>
            <ShareLinkButtons group={"group-hover:block"} />
          </li>
        </ul>
      </header>
    </section>
  );
};
export default PreviewNavbar;
