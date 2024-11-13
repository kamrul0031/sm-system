import { Client, Account, ID, Databases, Storage } from "appwrite";
import conf from "./conf";

class DocService {
  client = new Client();
  account;
  database;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_endpoint)
      .setProject(conf.appwrite_project_id);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createDocument({
    currentUserId,
    userImageId,
    name,
    contact,
    address,
    college,
    studentClass,
    studentId,
  }) {
    {
      try {
        const response = await this.database.createDocument(
          conf.appwrite_database_id,
          conf.appwrite_collection_id,
          currentUserId,
          {
            userImageId,
            name,
            contact,
            address,
            college,
            studentClass,
            studentId,
          }
        );
        return response;
      } catch (error) {
        console.log("Appwrite DocService :: createDocument :: error", error);
      }
    }
  }



  async updateDocument(currentUserId, { userImageId,name,
    contact,
    address,
    college,
    studentClass,
    studentId}) {
        try {
            return await this.database.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                currentUserId,
                {
                  userImageId,
                    name,
                    contact,
                    address,
                    college,
                    studentClass,
                    studentId,
                }
            )
        } catch (error) {
            
        }
}

async getDocument(currentUserId) {
    try {
      const response = await this.database.getDocument(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        currentUserId
      );
      return response;
    } catch (error) {
      console.log("Appwrite DocService :: getDocument :: error", error);
    }
  }


async deleteDocument(currentUserId) {
    try {
        return await this.database.deleteDocument(
            conf.appwrite_database_id,
            conf.appwrite_collection_id,
            currentUserId
        )
    } catch (error) {
        console.log("Appwrite DocService :: deleteDocument :: error", error);
    }

}

//file upload
async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        conf.apwrite_storage_id,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.log("Appwrite DocService :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        conf.apwrite_storage_id,
        fileId
      );
    } catch (error) {
      console.log("Appwrite DocService :: deleteFile :: error", error);
    }
  }

  async getFilePreview(fileId){
    return this.storage.getFilePreview(conf.apwrite_storage_id, fileId)
  }

}

const docService = new DocService();
export default docService;