import Pages from "../pages/pages";
import "../index.css";
import { CustomProvider } from "../utils/useCustomContext";

const Main = () => {
  return (
    <main className="w-[75em] mx-auto py-6">
      <CustomProvider>
        <Pages />
      </CustomProvider>
    </main>
  );
};

export default Main;
