import { useRef } from "react";
import GuySelfie from "../../assets/A guy selfie.webp";
import useFunctions from "../../utils/useFunctions";
const ProfilePicture = () => {
  const imgSrc = useRef();
  const { UploadImage } = useFunctions();
  return (
    <section className="bg-gray-100 rounded-lg p-3 py-4 w-full text-gray-600">
      <section className="flex md:justify-between justify-center items-center">
        <p className="text-lg font-medium md:block hidden">Profile image</p>
        <section className="flex items-center gap-x-12">
          {/* Profile image */}
          <label
            htmlFor="profile picture"
            className="h-56 w-56 relative group cursor-pointer overflow-hidden"
          >
            <figure className="h-full w-full">
              <img
                src={GuySelfie}
                ref={imgSrc}
                alt="man taking selfie"
                className="h-full w-full object-cover rounded-lg object-top"
              />
            </figure>
            <section className="absolute top-0 bg-black/20 grid place-content-center place-items-center gap-y-4 text-white text-lg font-medium w-full rounded-lg duration-500 h-0 group-hover:h-full overflow-hidden">
              <i className="bi bi-image text-3xl"></i>
              <input
                className="hidden"
                type="file"
                name="profile picture"
                id="profile picture"
                accept="image/*"
                onChange={(e) => UploadImage(e, imgSrc.current)}
              />
              <section>Change Image</section>
            </section>
          </label>
          <p className="w-48 sm:block hidden">
            This section strictly for images{" "}
            <span className="text-red-500 font-medium">
              any other media wouldn't be accepted*.
            </span>
          </p>
        </section>
      </section>
    </section>
  );
};

export default ProfilePicture;
