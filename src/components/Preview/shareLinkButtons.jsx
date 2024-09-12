import { useState } from "react";
import UseInput from "../../utils/useInput";
const ShareLinkButtons = ({group}) => {
    const [isOpen,setIsOpen]=useState(false)
    const {shareLink,copyUrlToClipboard}=UseInput()
  return (
    <section
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)} 
    className={`absolute top-8 left-0 w-48 ${group} ${
            isOpen ? "block" : "hidden"
          }`}>
      <div className="bg-gray-800 h-11 w-11 rotate-45 relative top-6 mx-auto"></div>
      <div className="bg-gray-800 grid place-items-center gap-y-4 py-3 text-white relative z-10">
      <button onClick={copyUrlToClipboard} className="border-b-2 pb-2 w-full px-4 hover:text-purple-400">Copy to Clipboard</button>
        <button onClick={()=>shareLink('facebook', 'I created a multi-purpose link. Check it out!', 'sharelink')} className="border-b-2 pb-2 w-full px-4 hover:text-purple-400">Share on Facebook</button>
        <button onClick={()=>shareLink('twitter', 'I created a multi-purpose link. Check it out!', 'sharelink')} className="border-b-2 pb-2 w-full px-4 hover:text-purple-400">Share on Twitter</button>
        <button onClick={()=>shareLink('linkedin', 'sharelink')} className="border-b-2 pb-2 w-full px-4 hover:text-purple-400">Share on LinkedIn</button>
        <button onClick={()=>shareLink('whatsapp', 'I created a multi-purpose link. Check it out!')} className="w-full px-4 hover:text-purple-400">Share on WhatsApp</button>
      </div>
    </section>
  );
};
export default ShareLinkButtons;
