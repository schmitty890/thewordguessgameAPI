// import {
//   addNewContact,
//   getContacts,
//   getContactWithID,
//   updateContact,
//   deleteContact,
// } from "../controllers/crmController";

import {
  login,
  register,
  loginRequired,
  getUserWithID,
  updateUserWithID,
  getUsers,
} from "../controllers/userController";

const routes = (app) => {
  // app
  //   .route("/contact")
  //   // get all contacts
  //   .get(getContacts)

  //   // add a new contact
  //   .post(loginRequired, addNewContact);

  // app
  //   .route("/contact/:contactID")
  //   // get a specific contact
  //   .get(getContactWithID)

  //   // update a specific contact
  //   .put(loginRequired, updateContact)

  //   // delete a specific contact
  //   .delete(loginRequired, deleteContact);
  app.route("/users").get(getUsers);

  app
    .route("/user/:userID")
    // get user with specific id
    .get(getUserWithID)
    // update a specific contact
    .put(loginRequired, updateUserWithID);

  // register new user route
  app.route("/auth/register").post(register);

  // login route
  app.route("/login").post(login);
};

export default routes;
