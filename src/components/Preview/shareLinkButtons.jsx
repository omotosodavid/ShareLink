import UseInput from "../../utils/useInput";
const ShareLinkButtons = ({ group }) => {
  const { shareLink, copyUrlToClipboard } = UseInput();
  return (
    <section
      className={`absolute top-8 left-0 w-48 hidden ${group}
    `}
    >
      <div className="bg-gray-800 h-11 w-11 rotate-45 relative top-6 mx-auto"></div>
      <div className="bg-gray-800 grid place-items-center gap-y-4 py-3 text-white relative z-10">
        <button
          onClick={copyUrlToClipboard}
          className="border-b pb-2 w-full px-4 hover:text-purple-400"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={() =>
            shareLink(
              "facebook",
              "Share multiple links effortlessly with ShareLinks!",
              "ShareLinks"
            )
          }
          className="border-b pb-2 w-full px-4 hover:text-purple-400"
        >
          Share on Facebook
        </button>
        <button
          onClick={() =>
            shareLink(
              "twitter",
              "Share multiple links effortlessly with ShareLinks!",
              "ShareLinks"
            )
          }
          className="border-b pb-2 w-full px-4 hover:text-purple-400"
        >
          Share on Twitter
        </button>
        <button
          onClick={() => shareLink("linkedin", "ShareLinks")}
          className="border-b pb-2 w-full px-4 hover:text-purple-400"
        >
          Share on LinkedIn
        </button>
        <button
          onClick={() =>
            shareLink(
              "whatsapp",
              "Share multiple links effortlessly with ShareLinks!"
            )
          }
          className="w-full px-4 hover:text-purple-400"
        >
          Share on WhatsApp
        </button>
      </div>
    </section>
  );
};

const MobileShare = () => {
  const {shareMobileLink}=UseInput()
  return (
    <button onClick={()=>shareMobileLink("ShareLinks","Share multiple links effortlessly with ShareLinks!")} title="Share Links" className=" py-2 px-5 hover:bg-white hover:text-purple-700 duration-200 rounded-lg border-2 text-white bg-purple-600 text-2xl font-medium border-purple-600">
      <i className="bi bi-share-fill"></i>
    </button>
  );
};

export { ShareLinkButtons, MobileShare };
