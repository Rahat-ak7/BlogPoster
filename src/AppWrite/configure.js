import config from "../config/config.js";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Services {
  client = new Client();
  DBs;
  Bucket;
  constructor() {
    this.client
      .setEndpoint(config.appWriteurl)
      .setProject(config.appWriteProjecctId);
    this.DBs = new Databases(this.client);
    this.Bucket = new Storage(this.client);
  }
  sanitizeSlug(slug) {
    return slug
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]/g, "-")
      .replace(/\s+/g, "-");
  }
  // =================
  // CRUD POST :Get From user:

  async createPost({ title, slug, content, FeaturedImage, status, userId }) {
    try {
      const sanitizedSlug = this.sanitizeSlug(slug);
      return await this.DBs.createDocument(
        config.appWriteDbId,
        config.appWriteCollectionId,
        sanitizedSlug,
        {
          title,
          content,
          FeaturedImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("APPWRITE::CREATEPOST", error);
      throw new Error("Error creating post");
    }
  }

  async getPost(slug) {
    try {
      return await this.DBs.getDocument(
        //third one is Document ID,below content Object
        config.appWriteDbId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("APPWRITE :: DeletePOST", error);
      return false;
    }
  }

  async getAllPost(qury = [Query.equal("index", "active")]) {
    //Here index is store as a key
    try {
      return await this.DBs.listDocuments(
        //third one is Document ID,below content Object
        config.appWriteDbId,
        config.appWriteCollectionId,
        qury
      );
    } catch (error) {
      console.log("APPWRITE :: GetAllPOST", error);
      return false;
    }
  }
  async deletePost(slug) {
    try {
      await this.DBs.deleteDocument(
        //third one is Document ID,below content Object
        config.appWriteDbId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("APPWRITE :: DeletePOST", error);
      return false;
    }
  }
  async updatePost(slug, { title, content, FeaturedImage, status }) {
    // console.log("Updating post with slug:", slug);
    // console.log("Update data:", { title, content, FeaturedImage, status });
    try {
      const sanitizedSlug = this.sanitizeSlug(slug);

      return await this.DBs.updateDocument(
        //third one is Document ID,below content Object
        config.appWriteDbId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          FeaturedImage,
          status,
        }
      );
    } catch (error) {
      console.log("APPWRITE::updatePOST", error);
    }
  }

  // FILE UPLOAD SERVICES:=====
  async DeleteFile(fileId) {
    try {
      return await this.Bucket.deleteFile(config.appWriteBucketId, fileId);
    } catch (error) {
      console.log("APPWRITE :: deleteFile", error);
      return false;
    }
  }
  async UploadFile(fileId) {
    try {
      return await this.Bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        fileId
      );
    } catch (error) {
      console.log("APPWRITE :: uploadFile", error);
      return false;
    }
  }
  // getFilePreview(fileId) {
  //   return this.Bucket.getFilePreview(config.appWriteBucketId, fileId);
  // }
  getFilePreview(fileId) {
    if (!fileId) {
      throw new Error("Missing required parameter: fileId");
    }
    return this.Bucket.getFilePreview(config.appWriteBucketId, fileId);
  }
}

const configServices = new Services();

export default configServices;
