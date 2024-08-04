import config from "../conf/config";
import { Client, Storage, ID } from "appwrite";

class FileService {
    client = new Client()
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId)
    storage
    constructor() {
        this.storage = new Storage(this.client)
    }
    getPreview(fileId) {
        try {
            if (fileId) {
                return this.storage.getFilePreview(
                    config.appwriteBucketId,
                    fileId
                )
            }
            else return null
        } catch (error) {
            console.error("Encountered error at getPreview:", error)
        }
    }
    async uploadFile(file) {
        try {
            if (file) {
                return await this.storage.createFile(
                    config.appwriteBucketId,
                    ID.unique(),
                    file
                )
            } else return false
        } catch (error) {
            console.error("Encountered error at uploadFile:", error)
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            if (fileId) {
                await this.storage.deleteFile(
                    config.appwriteBucketId,
                    fileId
                )
                return true
            } else return false
        } catch (error) {
            console.error("Encountered error at deleteFile:", error)
            return false
        }
    }
}

const file_service = new FileService
export default file_service