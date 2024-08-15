import Pages from "../pages/pages";
import "../index.css";
import { ImgProvider } from "../utils/useCustomContext";

const Main = () => {
  return (
    <main className="w-[75em] mx-auto py-6">
      <ImgProvider>
        <Pages />
      </ImgProvider>
    </main>
  );
};

export default Main;
