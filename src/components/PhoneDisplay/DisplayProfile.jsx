import { useEffect, useState } from "react";
import db from "../../partials/firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { useCustomContext } from "../../utils/useCustomContext";
const DisplayProfile = ({ Id,size }) => {
  const [info, setInfo] = useState({});
  const [profileImage, setProfileImg] = useState({});
  const { setProfileImgId, setUserInfoId } = useCustomContext();
  useEffect(() => {
    const userCollectionRef = doc(db, `user-${Id}`, "content");
    const userInfoRef = collection(userCollectionRef, "userInfo");
    const profileImgRef = collection(userCollectionRef, "profileImg");

    // Listen for real-time updates to the headScrape collection
    const unsubscribeUserInfo = onSnapshot(userInfoRef, (snapshot) => {
      let userInfoData = snapshot.docs.map((doc) => doc.data());
      setUserInfoId(snapshot.docs.map((doc) => doc.id)[0]);
      setInfo(userInfoData[0]);
    });

    const unsubscribeProfileImg = onSnapshot(profileImgRef, (snapshot) => {
      let profileImgData = snapshot.docs.map((doc) => doc.data());
      setProfileImgId(snapshot.docs.map((doc) => doc.id)[0]);
      setProfileImg(profileImgData[0]);
    });

    // Clean up the listeners when the component unmounts
    return () => {
      unsubscribeUserInfo();
      unsubscribeProfileImg();
    };
  }, [setProfileImgId, setUserInfoId,Id]);
  

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
        <p className="w-[90%] left-4 pr-3 relative overflow-hidden">
          <span className="scroll-x-anime">{info.email}</span>
        </p>
      </section>
    </>
  );
};
export default DisplayProfile;
