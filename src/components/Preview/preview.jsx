import { useCustomContext } from "../../utils/useCustomContext";
import AlertMessage from "../../static/alertMessage";
import PreviewDetails from "./preDetails";
import PreviewNavbar from "./preNavBar";

const Preview = () => {
  const { alert } = useCustomContext();
  return (
    <section>
      <PreviewNavbar />
      <PreviewDetails />
      {alert && <AlertMessage message={"Copied to Clipboard"} icon={"bi-check-lg"} color={"bg-green-500"} />}
    </section>
  );
};
export default Preview;
