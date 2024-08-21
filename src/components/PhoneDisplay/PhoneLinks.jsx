// import { useEffect } from "react";
import useFunctions from "../../utils/useFunctions";

const PhoneLinks = () => {
  const { platforms } = useFunctions();
  console.log(platforms);

  const Links = [
    { name: "GitHub", color: "bg-black", icon: "bi bi-github" },
    { name: "Youtube", color: "bg-red-500", icon: "bi bi-youtube" },
    { name: "Facebook", color: "bg-blue-700", icon: "bi bi-facebook" },
    { name: "Whatsapp", color: "bg-green-500", icon: "bi bi-whatsapp" },
    { name: "X (twitter)", color: "bg-black/80", icon: "bi bi-twitter-x" },
    { name: "Instagram", color: "bg-purple-600", icon: "bi bi-instagram" },
    { name: "Discord", color: "bg-purple-400", icon: "bi bi-discord" },
  ];
  return (
    <ul className="grid content-center gap-y-6">
      {Links.map((link, index) => (
        <li
          className={`flex items-center justify-between p-3 py-4 ${link.color} rounded-lg`}
          key={index}
        >
          <section className="flex items-center gap-x-3 text-lg text-white font-medium">
            <i className={link.icon}></i>
            <p>{link.name}</p>
          </section>
          <section>
            <i className="bi bi-arrow-right-short text-white text-2xl"></i>
          </section>
        </li>
      ))}
    </ul>
  );
};

export default PhoneLinks;
