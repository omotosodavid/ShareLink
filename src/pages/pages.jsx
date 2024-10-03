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
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import db from "../partials/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
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
      onHandleEvent: async (context) => {
        if (context.action === "SUCCESS") {
          const userId = context.user.id;
          sessionStorage.setItem("userId", userId);
          try {
            if (
              context.isNewRecipeUser &&
              context.user.loginMethods.length === 1
            ) {
              // New user sign-up
              const userCollection = doc(db, `user-${userId}`, "content");
              const headScrapeCollection = collection(
                userCollection,
                "headScrape"
              );
              const userInfoCollection = collection(userCollection, "userInfo");
              const profileImgCollection = collection(
                userCollection,
                "profileImg"
              );
              await addDoc(headScrapeCollection, {
                icon: "https://static-00.iconduck.com/assets.00/smiling-face-with-sunglasses-emoji-2048x1908-ulnwowph.png",
                title: "Welcome to ShareLinks",
                url: "https://example.com",
              });
              await addDoc(userInfoCollection, {
                email: "example.com",
                firstname: "Jhon",
                lastname: "Doe",
              });
              await addDoc(profileImgCollection, {
                image: "",
              });
            } else {
              // Existing user sign-in (optional logic)
              console.log("Existing user:", userId);
            }
          } catch (error) {
            console.log("Error creating user collection:", error);
          }
        }
      },
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
          <Route
            path="/"
            element={
              <SessionAuth>
                <Customizelinks />
              </SessionAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <SessionAuth>
                <ProfileDeatils />
              </SessionAuth>
            }
          />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Router>
    </SuperTokensWrapper>
  );
};

export default Pages;
