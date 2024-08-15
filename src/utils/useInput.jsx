import { useState } from "react";
import { useImgContext } from "./useCustomContext";
import { doc, setDoc } from "firebase/firestore";
import db from "../partials/firebase";
const UseInput = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  let { img } = useImgContext();

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

  return {
    handleInfoChange,
    storeEmail,
    storeFirstName,
    storeLastName,
  };
};

export default UseInput;
