import { useState } from "react";
import axios from "axios";
import { useCustomContext } from "./useCustomContext";
import { addDoc, collection } from "firebase/firestore";
import db from "../partials/firebase";

const useFunctions = () => {
  const [link, setLink] = useState("");
  const { setImg, setPlatForms } = useCustomContext();

  function Link(e) {
    setLink(e.target.value);
  }

  const handleSaveToDB = async (result) => {
    const collectionRef = collection(db, "headScrape");
    const payload = { result };
    await addDoc(collectionRef, payload);
  };

  let finalTitles = [];
  const handleWhichTitleIsNotEmpty = (datas, dbIds) => {
    datas.forEach((data) => {
      let { title, title1, title2 } = data.result;
      if (title !== "") {
        finalTitles.push({ title: title });
      } else if (title1 !== "") {
        finalTitles.push({ title: title1 });
      } else if (title2 !== "") {
        finalTitles.push({ title: title2 });
      } else {
        return;
      }
    });
    handleDbId(datas, dbIds);
    return finalTitles;
  };

  const handleDbId = (datas, dbIds) => {
    for (let idCount = 0; idCount < dbIds.length; idCount++) {
      finalTitles[idCount].id = dbIds[idCount];
      finalTitles[idCount].url = datas[idCount].result.url;
    }
  };

  const handlePushToSocials = (result, socials, dbIds) => {
    handleWhichTitleIsNotEmpty(result, dbIds).forEach((finalTitle) => {
      socials.push(finalTitle);
      setPlatForms(socials);
    });
  };

  // scrape meta-tags
  const scrapeMetaTags = (e, input) => {
    e.preventDefault();
    let inputValue = input.current.value;
    axios({
      url: "http://localhost:4000/scrape",
      method: "post",
      data: {
        url: inputValue,
      },
    }).then(({ data }) => {
      data.url = inputValue;
      // handleSaveToDB(data);
      console.log(data);
      
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
