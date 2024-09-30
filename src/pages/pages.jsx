import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customizelinks from "../components/CustomizeLinks/CustomizeLinks";
import ProfileDeatils from "../components/ProfileDeatils/ProfileDeatils";
import Preview from "../components/Preview/preview";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, {
  Google,
  Apple,
} from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session,{SessionAuth} from "supertokens-auth-react/recipe/session";
SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "sharelink",
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [Google.init(), Apple.init()],
      },
    }),
    EmailPassword.init(),
    Session.init(),
  ],
});

const Pages = () => {
  return (
   <SuperTokensWrapper>
     <Router>
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
          ThirdPartyPreBuiltUI,
          EmailPasswordPreBuiltUI,
        ])}
       <Route exact path="/" element={
        <SessionAuth>
          <Customizelinks />
        </SessionAuth>
       } />
       <Route exact path="/profile" element={
        <SessionAuth>
          <ProfileDeatils />
        </SessionAuth>
       } />
        <Route exact path="/preview" Component={Preview} />
      </Routes>
    </Router>
   </SuperTokensWrapper>
  );
};

export default Pages;
