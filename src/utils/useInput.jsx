import { useState } from "react";
import axios from "axios";
import { useCustomContext } from "./useCustomContext";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import db from "../partials/firebase";
import useFunctions from "./useFunctions";
const UseInput = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const { triggerAlert } = useFunctions();
  let { setAlert, img, setAction } = useCustomContext();

  const handleInfoChange = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "userinfo", "abDPHpjMDBHQMfPLt5H6");
    try {
      if (img === "") {
        img =
          "https://imgs.search.brave.com/Tcf04M1nEL7smn0aI01rQ1Mq44QnU5NPmNRV_wuvEIc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzYz/LzM2MF9GXzY0Njc2/MzgzX0xkYm1oaU5N/NllwemIzRk00UFB1/RlA5ckhlN3JpOEp1/LmpwZw";
      }
      const payload = { firstname, lastname, email, img };
      await setDoc(docRef, payload);
    } catch (err) {
      console.error("Error changing info", err);
    }
  };

  const handleEditData = (disabledInput, saveButton) => {
    disabledInput.disabled = false;
    disabledInput.focus();
    saveButton.classList.remove("hidden");
  };

  const handleDeleteData = async (docId, index) => {
    try {
      // Get exact id
      let id = docId[index];

      // Get a reference to the document
      const docRef = doc(db, "headScrape", id);
      await deleteDoc(docRef);
      triggerAlert("Link has been deleted", "bi-trash", "bg-red-500");
    } catch {
      triggerAlert("Error deleting link", "bi-x-lg", "bg-red-500");
    }
  };

  const handleSaveEdit = async (docId, index, payload) => {
    try {
      // Get exact id
      let id = docId[index];

      const docRef = doc(db, "headScrape", id);
      await setDoc(docRef, payload);
      triggerAlert("Link has been edited", "bi-pencil-square", "bg-blue-500");
    } catch {
      triggerAlert("Error editing link", "bi-x-lg", "bg-red-500");
    }
  };
  const scrapeEditedMetaTags = async (e, input, docId, index, save) => {
    e.preventDefault();
    // Intialize an action message
    setAction("Editing");

    let inputValue = input.value;

    // reset input and save button
    input.disabled = true;
    save.classList.add("hidden");
    axios
      .get(`http://localhost:5000/scrape?url=${encodeURIComponent(inputValue)}`)
      .then((response) => {
        let { title, icon, url } = response.data;
        // check if icon is a valid src if not convert it to a valid one
        icon = !icon.includes("//" || "https") ? `${url}${icon}` : icon;
        let payload = { title, icon, url };
        
        handleSaveEdit(docId, index, payload);
        setAction(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //  function for firstName
  function storeFirstName(e) {
    setFirstname(e.target.value);
  }

  // function for lastName
  function storeLastName(e) {
    setLastname(e.target.value);
  }

  // function for email
  function storeEmail(e) {
    setEmail(e.target.value);
  }

  const shareLink = (platform, text = "", hashtags = "") => {
    const encodedUrl = encodeURIComponent(window.location.href);
    const encodedText = encodeURIComponent(text);
    const encodedHashtags = encodeURIComponent(hashtags);

    const shareUrl =
      platform === "facebook"
        ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        : platform === "twitter"
        ? `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodedHashtags}`
        : platform === "linkedin"
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        : platform === "whatsapp"
        ? `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`
        : (console.error("Unsupported platform:", platform), "");

    // Open the share URL in a new window
    window.open(shareUrl, "_blank");
  };

  function copyUrlToClipboard() {
    // Get the current URL from window.location.href
    const currentUrl = window.location.href;

    // Use the modern Clipboard API to copy the URL
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  return {
    handleInfoChange,
    handleEditData,
    handleDeleteData,
    scrapeEditedMetaTags,
    storeEmail,
    storeFirstName,
    storeLastName,
    shareLink,
    copyUrlToClipboard,
    alert,
  };
};

export default UseInput;
