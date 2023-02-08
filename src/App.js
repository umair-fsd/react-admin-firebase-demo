import * as React from "react";
import { PostList, PostShow, PostCreate, PostEdit } from "./posts";
import { VideoShow, VideoEdit, VideoList, UploadVideo } from "./videos";
import { PartnerShow, PartnerEdit, PartnerList, PartnerCreate } from "./partners";
import { QuestionShow, QuestionList, QuestionCreate } from "./questions";
import { UserList, UserShow, UserCreate, UserEdit } from "./users";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from "react-admin-firebase";
import { auth, db } from "./FIREBASE_CONFIG";
import CommentIcon from "@material-ui/icons/Comment";
import CustomLoginPage from "./CustomLoginPage";
import UserIcon from "@material-ui/icons/People";

import { firebaseConfig as config } from "./FIREBASE_CONFIG";

const options = {
  logging: true,
  rootRef: "rssFeeds/feeds",
};
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

function App() {
  const validateUser = async (authUser) => {
    if (authUser) {
      let res = await db
        .collection("rssFeeds")
        .doc("feeds")
        .collection("users")
        .get();
      let data = [];

      res.forEach((doc) => {
        data.push({
          docID: doc.id,
          ...doc.data(),
        });
      });

      const user = data.filter((doc) => doc.email === authUser.email);
      if (user && user[0].isAdmin === false) {
        auth.signOut();
      }
    }
  };
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        validateUser(user);
      } else {
        console.log("no user exist");
      }
    });
  }, [auth.currentUser]);

  return (
    <Admin
      loginPage={CustomLoginPage}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="feeds"
        list={PostList}
        show={PostShow}
        create={PostCreate}
        edit={PostEdit}
      />

      <Resource
        name="videos"
        icon={CommentIcon}
        list={VideoList}
        show={VideoShow}
        create={UploadVideo}
        edit={VideoEdit}
      />
      <Resource
        name="questions"
        icon={CommentIcon}
        list={QuestionList}
        show={QuestionShow}
        create={QuestionCreate}
        // edit={VideoEdit}
      />
      <Resource
        name="users"
        icon={UserIcon}
        list={UserList}
        show={UserShow}
        create={UserCreate}
        edit={UserEdit}
      />
      <Resource
        name="partners"
        icon={UserIcon}
        list={PartnerList}
        show={PartnerShow}
        create={PartnerCreate}
        edit={PartnerEdit}
      />
    </Admin>
  );
}

export default App;
