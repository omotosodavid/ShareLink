import { useState } from "react";
import { useCustomContext } from "./useCustomContext";
import { doc, setDoc } from "firebase/firestore";
import db from "../partials/firebase";
const UseInput = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const {setAlert}=useCustomContext()
  let { img } = useCustomContext();

  const handleInfoChange = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "userinfo", "abDPHpjMDBHQMfPLt5H6");
    if (img === "") {
      img =
        "https://imgs.search.brave.com/Tcf04M1nEL7smn0aI01rQ1Mq44QnU5NPmNRV_wuvEIc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzYz/LzM2MF9GXzY0Njc2/MzgzX0xkYm1oaU5N/NllwemIzRk00UFB1/RlA5ckhlN3JpOEp1/LmpwZw";
    }
    const payload = { firstname, lastname, email, img };
    await setDoc(docRef, payload);
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
       setAlert(true)
       setTimeout(()=>{
        setAlert(false)
       },3000)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  return {
    handleInfoChange,
    storeEmail,
    storeFirstName,
    storeLastName,
    shareLink,
    copyUrlToClipboard,
    alert,
  };
};

export default UseInput;
