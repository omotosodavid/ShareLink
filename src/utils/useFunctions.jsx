import { useState } from "react";
import axios from "axios";
import { useCustomContext } from "./useCustomContext";
import { addDoc, collection } from "firebase/firestore";
import db from "../partials/firebase";

const useFunctions = () => {
  const [link, setLink] = useState("");
  const [editLink,setEditLink]=useState([])
  const { setImg, setAction,setAlert } = useCustomContext();

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
      platform = !platform.result ? platform : platform.result;
      Links.push({
        name: platform.title,
        url: platform.url,
        icon: platform.icon,
        color: getRandomColor(),
      });
    });
  };
  const handleSaveToDB = async (result) => {
    const collectionRef = collection(db, "headScrape");
    const payload = { result };
    await addDoc(collectionRef, payload);
  };

  const handlePushToSocials = (datas, socials) => {
    datas.forEach((data) => {
      let result = !data.result ? data : data.result;
      socials.push(result);
    });
  };

  const triggerAlert = (message, icon, color) => {
    setAlert({message, icon, color}); // Set alert with dynamic message, icon, and color
    setTimeout(() => {
      setAlert(null); // Clear the alert after a few seconds
    }, 3000); // Duration for the alert to disappear (3 seconds in this example)
  };

  // scrape meta-tags
  const scrapeMetaTags = async (e) => {
    e.preventDefault();    

    // initiate loading
    setAction("Loading");

    axios
      .get(`http://localhost:5000/scrape?url=${encodeURIComponent(link)}`)
      .then((response) => {
        let { title, icon, url } = response.data;
        // if favicon is not accessible perform these action
        // Reverting url to root url
        let thirdSlashIndex = url.indexOf(
          "/",
          url.indexOf("/", url.indexOf("/") + 1) + 1
        );
        let revUrl =  thirdSlashIndex !== -1
            ? url.slice(0, thirdSlashIndex)
            : url
        // check if icon is a valid src if not convert it to a valid one
        icon = !icon.includes("//" || "https") ? `${revUrl}${icon}` : icon;
        let data = { title, icon, url };

        // save data to database
        handleSaveToDB(data);

        //stop loading message
        setAction(false);
        triggerAlert("New link has been added", "bi-check-lg", "bg-green-500")
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setAction(false)
        triggerAlert("Couldn't get data.Try again", "bi-x-lg", "bg-red-500")
      });
  };

  const UploadImage = (e, img) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    // adding an event listener for file loading
    reader.addEventListener("load", () => {
      img.src = reader.result;
      setImg(reader.result);
    });
    // reading the file content
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function getRandomColor() {
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
  }

  return {
    handleLink,
    link,
    handleLinkChange,
    editLink,
    pushLinks,
    triggerAlert,
    UploadImage,
    scrapeMetaTags,
    handlePushToSocials,
    getRandomColor,
  };
};
export default useFunctions;
