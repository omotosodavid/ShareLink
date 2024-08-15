import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customizelinks from "../components/CustomizeLinks/CustomizeLinks";
import ProfileDeatils from "../components/ProfileDeatils/ProfileDeatils";
import Navbar from "../static/NavBar/Navbar";
import Phonedisplay from "../components/PhoneDisplay/Phonedisplay";

const Pages = () => {
  return (
    <Router>
      <Navbar />
      <section className="flex justify-between items-start">
        <Phonedisplay />
        <Routes>
          <Route exact path="/" Component={Customizelinks} />
          <Route exact path="/profile" Component={ProfileDeatils} />
        </Routes>
      </section>
    </Router>
  );
};

export default Pages;
