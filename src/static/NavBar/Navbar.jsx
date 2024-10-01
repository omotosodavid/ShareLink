import { NavLinks, SignOut } from "./NavLinks";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center bg-white sm:px-6 px-4 py-4 rounded-lg mb-8 mt-6">
      <section className="flex items-center font-medium gap-x-2">
        <i className="bi bi-link sm:text-2xl text-3xl bg-purple-900 rounded-lg py-2 px-3 text-white" />
        <p className="text-2xl sm:block hidden">ShareLinks</p>
      </section>
      <nav>
        <NavLinks />
      </nav>
      <SignOut />
    </header>
  );
};

export default Navbar;
