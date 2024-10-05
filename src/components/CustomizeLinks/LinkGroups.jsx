import { useRef } from "react";
import useFunctions from "../../utils/useFunctions";
import UseInput from "../../utils/useInput";

const LinkGroups = ({ result, id }) => {
  const { handlePushToSocials, handleLinkChange, editLink } = useFunctions();
  const { handleEditData, handleDeleteData, scrapeEditedMetaTags } = UseInput();
  const inputDisableRefs = useRef({});
  const saveButtonRefs = useRef({});
  const SocialPlatforms = [];
  handlePushToSocials(result, SocialPlatforms);
  return (
    <ol className="grid place-content-stretch gap-y-5 mt-6 h-[36rem] overflow-y-auto scroll">
      {SocialPlatforms.map((SocialPlatform, index) => {
        const { title, url, icon } = SocialPlatform;
        return (
          <li key={index} className="bg-gray-100 rounded-lg p-3">
            <section className="flex justify-between items-center">
              <section className="flex items-center gap-x-1 text-gray-600 font-medium text-lg">
                <i className="bi bi-list"></i>
                <h5>Link #{index + 1}</h5>
              </section>
              <section className="flex gap-x-4 items-center text-gray-400 text-lg font-medium">
                <button
                  className="hover:text-gray-700"
                  onClick={() => handleDeleteData(id, index)}
                >
                  Remove
                </button>
                <button
                  className="hover:text-gray-700"
                  onClick={() =>
                    handleEditData(
                      inputDisableRefs.current[index],
                      saveButtonRefs.current[index]
                    )
                  }
                >
                  Edit
                </button>
              </section>
            </section>
            <section className="grid gap-y-6 mt-6">
              <section className="grid gap-y-2 text-gray-600 text-lg font-medium">
                <label htmlFor={`Social platform${index}`}>Platform</label>
                <div className="relative">
                  <img className="absolute rounded-full bottom-0 left-1 z-10 w-10 h-10 object-cover" src={icon} alt="" />
                <select
                  className="w-full pl-14 p-3 rounded-lg"
                  name="social-platform"
                  id={`Social platform${index}`}
                  disabled
                >
                  <option value={title}>{title}</option>
                </select>
                </div>
              </section>
              <form
                className="grid gap-y-2 text-gray-600 text-lg font-medium"
                onSubmit={(e) =>
                  scrapeEditedMetaTags(
                    e,
                    inputDisableRefs.current[index],
                    id,
                    index,
                    saveButtonRefs.current[index]
                  )
                }
              >
                <label htmlFor="links">URL</label>
                <section className="relative">
                  <i className="bi bi-link-45deg absolute text-2xl top-3 left-2"></i>
                  <input
                    className="disabled:bg-white/70 disabled:text-gray-500/90 w-full p-3 rounded-lg pl-10"
                    type="text"
                    name="SocialLinks"
                    id="links"
                    ref={(el) => (inputDisableRefs.current[index] = el)}
                    placeholder="Type in your url"
                    value={editLink[index] || url}
                    onChange={(e) => handleLinkChange(e, index)}
                    disabled
                    required
                  />
                </section>
                <button
                  className="hidden py-2 px-6 bg-purple-500 text-white rounded-md w-[9.3rem] mt-6 hover:bg-purple-400"
                  type="submit"
                  ref={(el) => (saveButtonRefs.current[index] = el)}
                >
                  Save
                </button>
              </form>
            </section>
          </li>
        );
      })}
    </ol>
  );
};

export default LinkGroups;
