const AddLinksButton = ({ addlink }) => {
  return (
    <button
      type="submit"
      onClick={addlink}
      className="w-full border border-purple-600 rounded-lg mt-14 py-2 font-medium text-lg text-purple-500 duration-500 hover:scale-105"
    >
      + Add new link
    </button>
  );
};

export default AddLinksButton;
