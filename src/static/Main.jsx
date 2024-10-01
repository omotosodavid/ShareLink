import Pages from "../pages/pages";
import "../index.css";
import { CustomProvider } from "../utils/useCustomContext";

const Main = () => {
  return (
    <main className="xl:w-[75em] xl:px-0 px-4 mx-auto">
      <CustomProvider>
        <Pages />
      </CustomProvider>
    </main>
  );
};

export default Main;
