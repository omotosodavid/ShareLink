import mobileNoData from "../../assets/NoLinkForMobile.jpg";
const NoPhoneLinks = ({height}) => {
  return (
    <figure className={height}>
      <img className={height} src={mobileNoData} alt="" />
    </figure>
  );
};

export default NoPhoneLinks;
