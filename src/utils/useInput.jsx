import { useState } from "react";
import axios from "axios";
import { useCustomContext } from "./useCustomContext";
import { doc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import db from "../partials/firebase";
import useFunctions from "./useFunctions";
const UseInput = () => {
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [email, setEmail] = useState("");
  const { triggerAlert } = useFunctions();
  let { setAlert,userInfoId } = useCustomContext();

  const handleInfo = async (e, firstName, lastName, userEmail) => {
    e.preventDefault();
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return; // Ensure userId is available

      const userCollectionRef = doc(db, `user-${userId}`, "content");
      const userInfoRef = collection(userCollectionRef, "userInfo");
      const docRef = doc(userInfoRef,userInfoId);
      const payload = { firstname, lastname, email };
      await updateDoc(docRef, payload);
      firstName.current.value = "";
      lastName.current.value = "";
      userEmail.current.value = "";
      triggerAlert("User Information saved", "bi-check-lg", "bg-green-500");
    } catch {
      triggerAlert("Error saving userinfo", "bi-x-lg", "bg-red-500");
    }
  };

  const handleEditData = (disabledInput, saveButton) => {
    disabledInput.disabled = false;
    disabledInput.focus();
    saveButton.classList.remove("hidden");
  };

  const handleDeleteData = async (docId, index) => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return; // Ensure userId is available

      // Get the user's headScrape sub-collection reference
      const userCollectionRef = doc(db, `user-${userId}`, "content");
      const headScrapeRef = collection(userCollectionRef, "headScrape");

      // Get the exact document ID to delete
      const id = docId[index];
      const docRef = doc(headScrapeRef, id);
      await deleteDoc(docRef);
      triggerAlert("Link has been deleted", "bi-trash", "bg-red-500");
    } catch {
      triggerAlert("Error deleting link", "bi-x-lg", "bg-red-500");
    }
  };

  const handleSaveEdit = async (docId, index, payload) => {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) return; // Ensure userId is available

      // Get the user's headScrape sub-collection reference
      const userCollectionRef = doc(db, `user-${userId}`, "content");
      const headScrapeRef = collection(userCollectionRef, "headScrape");

      // Get the exact document ID to delete
      const id = docId[index];
      const docRef = doc(headScrapeRef, id);
      await updateDoc(docRef, payload);
      triggerAlert("Link has been edited", "bi-pencil-square", "bg-blue-500");
    } catch {
      triggerAlert("Internal error:500", "bi-x-lg", "bg-red-500");
    }
  };

  // scrape the edited link meta tags
  const scrapeEditedMetaTags = async (e, input, docId, index, save) => {
    e.preventDefault();

    let inputValue = input.value;

    // reset input and save button
    input.disabled = true;
    save.innerHTML = `
      <div style="font-size: 1.25rem;line-height: 1.75rem;color:#fff;text-align: center;font-weight: 500;">
        <i style="display: inline-block;padding: 0.25rem;border: 3px solid #fff;border-left-color: transparent;margin-right: 0.5rem;border-radius:50%" class="animate-spin"></i>
        Editing
      </div>`;
    axios
      .get(`https://open-graph-and-auth-for-share-link.vercel.app/scrape?url=${encodeURIComponent(inputValue)}`)
      .then((response) => {
        let { title, icon, url } = response.data;

        // if favicon is not accessible perform these action
        // Reverting url to root url
        let thirdSlashIndex = url.indexOf(
          "/",
          url.indexOf("/", url.indexOf("/") + 1) + 1
        );
        let revUrl =
          thirdSlashIndex !== -1 ? url.slice(0, thirdSlashIndex) : url;
        // check if icon is a valid src if not convert it to a valid one
        icon = !icon.includes("//") ? `${revUrl}${icon}` : icon;

        let payload = { title, icon, url };

        handleSaveEdit(docId, index, payload);
        save.classList.add("hidden");
        save.textContent = "Save";
      })
      .catch(() => {
        // reset input and save button
        input.disabled = true;
        save.classList.add("hidden");
        save.textContent = "Save";
        triggerAlert("Error editing link", "bi-x-lg", "bg-red-500");
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

  const shareMobileLink = (title, text) => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: window.location.href,
        })
        .then(() =>{return})
        .catch((error) => console.log("Error sharing link:", error));
    }
  };

  return {
    handleInfo,
    handleEditData,
    handleDeleteData,
    scrapeEditedMetaTags,
    storeEmail,
    storeFirstName,
    storeLastName,
    shareLink,
    copyUrlToClipboard,
    alert,
    shareMobileLink,
  };
};

export default UseInput;
