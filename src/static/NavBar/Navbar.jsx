import { NavLinks, Preview } from "./NavLinks";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center bg-white p-6 py-4 rounded-lg mb-8">
      <section className="flex items-center font-medium gap-x-3">
        <section className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-900 text-white text-2xl">
          <i className="bi bi-link"></i>
        </section>
        <p className="text-2xl">ShareLinks</p>
      </section>
      <nav>
        <NavLinks />
      </nav>
      <Preview />
    </header>
  );
};

export default Navbar;
