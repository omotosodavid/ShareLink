import { useEffect, useState } from "react";
import db from "../../partials/firebase";
import { collection, onSnapshot } from "firebase/firestore";
const DisplayProfile = ({ size }) => {
  const [info, setInfo] = useState({});
  const [profileImage,setProfileImg]=useState({})
  useEffect(() => {
    const unsubscribeUserInfo = onSnapshot(collection(db, "userinfo"), (snapshot) => {
      let userInfoData = snapshot.docs.map((doc) => doc.data());
      setInfo(userInfoData[0]); 
    });
  
    const unsubscribeProfileImg = onSnapshot(collection(db, "profileImg"), (snapshot) => {
      let profileImgData = snapshot.docs.map((doc) => doc.data());
      setProfileImg(profileImgData[0]);
    });
  
    // Clean up the listeners when the component unmounts
    return () => {
      unsubscribeUserInfo();
      unsubscribeProfileImg();
    };
  }, []);
  
  return (
    <>
      {/* Profile picture */}
      <section className="grid place-items-center mb-4">
        <figure>
          <img
            className={`${size} rounded-full border-2 border-purple-700 p-0.5 object-cover`}
            src={
              profileImage.image ||
              "https://imgs.search.brave.com/Tcf04M1nEL7smn0aI01rQ1Mq44QnU5NPmNRV_wuvEIc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzYz/LzM2MF9GXzY0Njc2/MzgzX0xkYm1oaU5N/NllwemIzRk00UFB1/RlA5ckhlN3JpOEp1/LmpwZw"
            }
            alt=""
          />
        </figure>
      </section>
      {/* Profile info */}
      <section className="text-center text-lg">
        <h3 className="font-bold mb-1">
          {info.firstname} {info.lastname}
        </h3>
        <p className="w-[90%] left-4 pr-3 relative overflow-x-auto scroll-hidden overflow-x-auto:after">
          <span className="scroll-x-anime">{info.email}</span>
        </p>
      </section>
    </>
  );
};
export default DisplayProfile;
