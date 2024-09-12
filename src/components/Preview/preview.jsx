import { useCustomContext } from "../../utils/useCustomContext";
import AlertClipboard from "./alertClipboard";
import PreviewDetails from "./preDetails";
import PreviewNavbar from "./preNavBar";

const Preview = () => {
  const { alert } = useCustomContext();
  return (
    <section>
      <PreviewNavbar />
      <PreviewDetails />
      {alert && <AlertClipboard />}
    </section>
  );
};
export default Preview;
