// src/authService.js

// auth_config.js

const config = {
  domain: "dev-flakp3uqb72m7zqn.us.auth0.com",
  clientId: "0EbwHsKPo2ax4Y68tIDJicAUzB3RUuO9"
};



import { createAuth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from "./store.js";

async function createClient() {
  let auth0Client = await createAuth0Client(config);

  return auth0Client;
}

async function loginWithPopup(client, options) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);

    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;