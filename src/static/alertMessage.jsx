const AlertMessage = ({message,icon,color}) => {
  return (
    <div className="w-full left-0 fixed bottom-5 font-medium text-lg text-black">
      <div className="alert w-[20.2rem] mx-auto p-6 py-3 bg-white rounded-2xl flex items-center justify-center gap-x-5">
        <p>{message}</p>
        <i className={`bi ${icon} ${color} py-1 px-2 rounded-full`}></i>
      </div>
    </div>
  );
};
export default AlertMessage;
