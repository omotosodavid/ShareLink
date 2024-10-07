import { useCustomContext } from "../../utils/useCustomContext";
import { Helmet } from "react-helmet";
import logo from "../../assets/Sharelinks-logo.png";
import AlertMessage from "../../static/alertMessage";
import PreviewDetails from "./preDetails";
import PreviewNavbar from "./preNavBar";

const Preview = () => {
  const { alert } = useCustomContext();
  return (
    <>
      <Helmet>
        <title>ShareLinks - Preview & Share Links Easily</title>
        <meta
          name="description"
          content="Easily view, copy, and share your links with ShareLinks. Create previews of multiple links and share them across social platforms."
        />
        <meta http-equiv="X-UA-Compatible" content="IE=7" />
        <meta
          name="keywords"
          content="view, preview, links, copy, share, sharelink, viewlinks, link sharing, social sharing, online tools"
        />
        <meta
          property="og:title"
          content="ShareLinks - Preview & Share Links Easily"
        />
        <meta
          property="og:description"
          content="Use ShareLinks to preview and share your links seamlessly across social media platforms."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={logo}
        />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href={logo} />
        <link rel="shortcut icon" href={logo} type="image/x-icon" />
        <link rel="apple-touch-icon" href={logo} />
      </Helmet>
      <section className="absolute left-0 w-full">
        <PreviewNavbar />
        <PreviewDetails />
        {alert && (
          <AlertMessage
            message={"Copied to Clipboard"}
            icon={"bi-check-lg"}
            color={"bg-green-500"}
          />
        )}
      </section>
    </>
  );
};
export default Preview;
