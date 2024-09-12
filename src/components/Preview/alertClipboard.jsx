const AlertClipboard = () => {
  return (
    <div className="w-full left-0 absolute bottom-5 font-medium text-lg text-black">
      <div className="alert w-80 mx-auto p-6 py-3 bg-white rounded-2xl flex items-center justify-center gap-x-5">
        <p>Copied to Clipboard</p>
        <i className="bi bi-check-lg bg-green-500 py-1 px-2 rounded-full"></i>
      </div>
    </div>
  );
};
export default AlertClipboard;
