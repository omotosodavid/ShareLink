import useFunctions from "../../utils/useFunctions";

const NewLinks = ({ cancel }) => {
  const { handleLink, link, scrapeMetaTags } = useFunctions();
  return (
    <section className="px-3 pr-7 bg-black/80 backdrop-blur-md w-screen h-screen flex items-center justify-center fixed top-0 left-0">
      <button
        title="Close"
        onClick={cancel}
        className="absolute top-3 right-7 w-8 hover:bg-white/10 hover:rounded-full"
      >
        <i className="bi bi-x-lg text-white text-2xl"></i>
      </button>
      <section className="bg-white sm:w-[30rem] w-full p-4 rounded-lg">
        <section className="bg-gray-200 w-full p-2 rounded-lg">
          <section className="flex items-center gap-x-1 text-gray-600 font-medium text-lg">
            <i className="bi bi-list"></i>
            <h5>Link</h5>
          </section>

          <section className="grid gap-y-6 mt-6">
            <form
              onSubmit={(e) => {
                scrapeMetaTags(e);
                cancel();
              }}
              className="grid gap-y-2 text-gray-600 text-lg font-medium"
            >
              <label htmlFor="link">URL</label>
              <section className="relative">
                <i className="bi bi-link-45deg absolute text-2xl top-3 left-2"></i>
                <input
                  className="w-full p-3 rounded-lg pl-10"
                  type="text"
                  name="SocialLinks"
                  id="link"
                  placeholder="Type in your url"
                  value={link}
                  onChange={(e) => handleLink(e)}
                  required
                />
              </section>
              <button
                className="py-2 px-6 bg-purple-500 text-white rounded-md w-max mt-6 hover:bg-purple-400"
                type="submit"
              >
                Submit
              </button>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
};

export default NewLinks;
