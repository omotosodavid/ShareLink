import Pages from "../pages/pages";
import "../index.css";
import { CustomProvider } from "../utils/useCustomContext";

const Main = () => {
  return (
    <main className="xl:w-[75em] xl:px-0 sm:px-4 px-2 mx-auto">
      <CustomProvider>
        <Pages />
      </CustomProvider>
    </main>
  );
};

export default Main;
