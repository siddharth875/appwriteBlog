import config from "../conf/config";
import { Client, Databases, Query } from "appwrite";

class PostService {
    client = new Client()

    database
    constructor() {
        this.client
        .setEndpoint(config.appwriteEndpoint)
        .setProject(config.appwriteProjectId)
        this.database = new Databases(this.client)
    }
    async createPost({ title, slug, content, featuredImage, status, userid }) {
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.error("Encountered error at createPost:", error)
        }
    }
    async updatePost(slug, { title, content, featuredImage, status, userid }) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.error("Encountered error at updatePost:", error)
        }
    }
    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.error("Encountered error at deletePost:", error)
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Encountered error at getPost:", error)
            return false
        }
    }
    async listPosts( query = [Query.equal("status", "active")] ) {
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query
            )
        } catch (error) {
            console.error("Encountered error at listPosts:", error)
            return false
        }
    }
}

const post_service = new PostService()
export default post_service