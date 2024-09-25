const express = require("express");
const cors = require("cors");
import SuperTokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { errorHandler } from "supertokens-node/framework/express";

SuperTokens.init({  framework: "express",
    supertokens: {
        // These are the connection details of the app you created on supertokens.com
        connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
        apiKey: process.env.SUPERTOKENS_API_KEY,
    },
  appInfo: {
    apiDomain: "http://localhost:4000",
    appName: "sharelink",
    websiteDomain: "http://localhost:3000",
  },
  recipeList: [
    EmailPassword.init(),
    ThirdParty.init({
      // We have provided you with development keys which you can use for testing.
      // IMPORTANT: Please replace them with your own OAuth keys for production use.
      signInAndUpFeature: {
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId: process.env.GOGGLE_CLIENT_ID,
                  clientSecret: process.env.GOGGLE_CLIENT_SECRET,
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "apple",
              clients: [
                {
                  clientId: process.env.APPLE_CLIENT_ID,
                  additionalConfig: {
                    keyId: process.env.APPLE_KEY_ID,
                    privateKey: process.env.APPLE_PRIVATE_KEY,
                    teamId: process.env.APPLE_TEAM_ID,
                  },
                },
              ],
            },
          },
        ],
      },
    }),
    Session.init(),
  ],
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(middleware());

app.use(errorHandler())

 

app.use((err, res) => {
  res.status(500).send(`Internal Error ${err.message}`);
});

app.listen(4000, () => console.log("Server listening on 4000"));
