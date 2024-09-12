import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customizelinks from "../components/CustomizeLinks/CustomizeLinks";
import ProfileDeatils from "../components/ProfileDeatils/ProfileDeatils";
import Preview from "../components/Preview/preview";

const Pages = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" Component={Customizelinks} />
          <Route exact path="/profile" Component={ProfileDeatils} />
          <Route exact path="/preview" Component={Preview} />
        </Routes>
    </Router>
  );
};

export default Pages;
