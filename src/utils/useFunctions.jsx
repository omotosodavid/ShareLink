import { useState } from "react";
import axios from "axios";
import { useCustomContext } from "./useCustomContext";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import db from "../partials/firebase";
import { signOut } from "supertokens-auth-react/recipe/session";
import { redirectToAuth } from "supertokens-auth-react";

const useFunctions = () => {
  const [link, setLink] = useState("");
  const [editLink, setEditLink] = useState([]);
  const { setLoading, setAlert, profileImgId } = useCustomContext();

  function handleLink(e) {
    setLink(e.target.value);
  }

  const handleLinkChange = (e, index) => {
    const newLink = [...editLink];
    newLink[index] = e.target.value;
    setEditLink(newLink);
  };

  const pushLinks = (platforms, Links) => {
    platforms.forEach((platform) => {
      Links.push({
        name: platform.title,
        url: platform.url,
        icon: platform.icon,
        color: getRandomColor(),
      });
    });
  };
  const handleSaveToDB = async (payload) => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;
      const userCollectionRef = doc(db, `user-${userId}`, "content");
      const headScrapeRef = collection(userCollectionRef, "headScrape");
      await addDoc(headScrapeRef, payload);
      // Trigger success alert
      triggerAlert("New link has been added", "bi-check-lg", "bg-green-500");
    } catch {
      triggerAlert("Internal error:500", "bi-x-lg", "bg-red-500");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    redirectToAuth();
  };

  const handlePushToSocials = (datas, socials) => {
    datas.forEach((data) => {
      socials.push(data);
    });
  };

  const triggerAlert = (message, icon, color) => {
    setAlert({ message, icon, color }); // Set alert with dynamic message, icon, and color
    setTimeout(() => {
      setAlert(null); // Clear the alert after a few seconds
    }, 3000); // Duration for the alert to disappear (3 seconds in this example)
  };

  // save img to database
  const handleProfileImage = async (image) => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return; // Ensure userId is available

      const userCollectionRef = doc(db, `user-${userId}`, "content");
      const profileImgRef = collection(userCollectionRef, "profileImg");
      const docRef = doc(profileImgRef, profileImgId);
      const payload = { image };
      await updateDoc(docRef, payload);
      triggerAlert("Profile image saved", "bi-check-lg", "bg-green-500");
    } catch  {
      triggerAlert("Error saving image", "bi-x-lg", "bg-red-500");
    }
  };

  // scrape meta-tags
  const scrapeMetaTags = async (e) => {
    e.preventDefault();

    // initiate loading
    setLoading(true);

    // modifying link incase user forgets to add http
    const modifiedLink = link.includes("//") ? link : `http://${link}`;

    axios
      .get(
        `http://localhost:4000/scrape?url=${encodeURIComponent(modifiedLink)}`
        // {
        //   withCredentials: true,
        //   headers: {
        //     "Access-Control-Allow-Origin": "http://localhost:3000",
        //   },
        // }
      )
      .then((response) => {
        let { title, icon, url } = response.data;

        // Handle favicon if the src is not a full URL
        let thirdSlashIndex = url.indexOf(
          "/",
          url.indexOf("/", url.indexOf("/") + 1) + 1
        );
        let revUrl =
          thirdSlashIndex !== -1 ? url.slice(0, thirdSlashIndex) : url;

        // Fix icon if it's a relative path
        icon = !icon.includes("//") ? `${revUrl}${icon}` : icon;

        let data = { title, icon, url };

        // Save data to the database
        handleSaveToDB(data);

        // Stop loading
        setLoading(false);
      })
      .catch(() => {
        // Handle errors
        setLoading(false);
        triggerAlert("Couldn't get data. Try again", "bi-x-lg", "bg-red-500");
      });
  };

  const UploadImage = (e, img) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    // adding an event listener for file loading
    reader.addEventListener("load", () => {
      img.src = reader.result;
      handleProfileImage(img.src);
    });
    // reading the file content
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getRandomColor = () => {
    // Define possible colors and shade ranges (excluding white).
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "blue",
      "indigo",
      "purple",
      "pink",
      "gray",
    ];
    const shades = [500, 600, 700, 800]; // Commonly used shades in Tailwind.

    // Randomly pick a color and shade.
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomShade = shades[Math.floor(Math.random() * shades.length)];

    // Construct and return the Tailwind color class.
    return `bg-${randomColor}-${randomShade}`;
  };

  return {
    handleLink,
    link,
    handleLinkChange,
    editLink,
    handleSignOut,
    pushLinks,
    triggerAlert,
    UploadImage,
    scrapeMetaTags,
    handlePushToSocials,
    getRandomColor,
  };
};
export default useFunctions;
