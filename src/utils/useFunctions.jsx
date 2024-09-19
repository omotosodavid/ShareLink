import { useState } from "react";
import axios from "axios";
import { useCustomContext } from "./useCustomContext";
import { addDoc, collection } from "firebase/firestore";
import db from "../partials/firebase";

const useFunctions = () => {
  const [link, setLink] = useState("");
  const { setImg } = useCustomContext();

  function Link(e) {
    setLink(e.target.value);
  }

  const handleSaveToDB = async (result) => {
    const collectionRef = collection(db, "headScrape");
    const payload = { result };
    await addDoc(collectionRef, payload);
  };

  const handlePushToSocials = (datas, socials) => {
    datas.forEach((data) => {
      let result
     !data.result?result=data : result = data.result;
      socials.push(result);
    });
  };

  // scrape meta-tags
  const scrapeMetaTags = async (e, input) => {
    e.preventDefault();
    let inputValue = input.current.value;

    axios
      .get(`http://localhost:5000/scrape?url=${encodeURIComponent(inputValue)}`)
      .then((response) => {
        const { title, icon, url } = response.data;
        let data = { title, icon, url };
        handleSaveToDB(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
    Link,
    link,
    UploadImage,
    scrapeMetaTags,
    handlePushToSocials,
    getRandomColor,
  };
};
export default useFunctions;
