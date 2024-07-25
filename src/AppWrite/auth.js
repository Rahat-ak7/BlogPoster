import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appWriteurl)
      .setProject(config.appWriteProjecctId);
    this.account = new Account(this.client);
  }
  //CREATE- ACCOUNT DEstruct -Parametes:

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Call the login method after account creation
        const loginResponse = await this.Login({ email, password });
        return loginResponse;
      } else {
        throw new Error("Account creation failed.");
      }
    } catch (error) {
      throw error;
    }
  }

  async Login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("AppWrite Service Error:getCurrentUser", error);
      throw error; // Ensure that the error is thrown so it can be caught in the calling function
    }
  }
  async LogOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("AppWrite Service Error:Logut", error);
    }
    return null;
  }
}

//THIS VAR IS oBJECT:
const authServices = new AuthService();
export default authServices;
