import AddLinksButton from "./AddLink";

const CustomizeIntro = ({ addlink }) => {
  return (
    <section>
      <h2 className="text-4xl text-black font-bold mb-3">
        Customize your links
      </h2>
      <p>
        Add/edit/remove links below and the share all your profiles with the
        world!
      </p>
      <AddLinksButton addlink={addlink} />
    </section>
  );
};

export default CustomizeIntro;
