import { useState } from "react";
import axios from "axios";
import { useImgContext } from "./useCustomContext";
import { addDoc, collection } from "firebase/firestore";
import db from "../partials/firebase";

const useFunctions = () => {
  const [link, setLink] = useState("");
  const { setImg } = useImgContext();

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
    handleDbId(dbIds);
    return finalTitles;
  };

  const handleDbId = (dbIds) => {
    for (let idCount = 0; idCount < dbIds.length; idCount++) {
      finalTitles[idCount].id = dbIds[idCount];
    }
  };

  const handlePushToSocials = (result, socials, dbIds) => {
    handleWhichTitleIsNotEmpty(result, dbIds).forEach((finalTitle) => {
      socials.push(finalTitle);
    });
  };

  // scrape meta-tags
  const scrapeMetaTags = (e, input) => {
    e.preventDefault();
    let inputValue = input.current.value;
    axios({
      url: "http://localhost:5000/scrape",
      method: "post",
      data: {
        url: inputValue,
      },
    }).then(({ data }) => {
      data.url = inputValue;
      console.log(data);
      // handleSaveToDB(data);
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

  return {
    Link,
    link,
    UploadImage,
    scrapeMetaTags,
    handlePushToSocials,
  };
};
export default useFunctions;
