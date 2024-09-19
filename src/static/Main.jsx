import Pages from "../pages/pages";
import "../index.css";
import { CustomProvider } from "../utils/useCustomContext";

const Main = () => {
  return (
    <main className="w-[75em] mx-auto">
      <CustomProvider>
        <Pages />
      </CustomProvider>
    </main>
  );
};

export default Main;
