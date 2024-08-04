import config from "../conf/config";
import { Account, ID, Client } from "appwrite";
class AuthService {
    client = new Client()
    account
    constructor() {
        this.client.setEndpoint(config.appwriteEndpoint).setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async signup({ email, password, name }) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name)
            if (user) 
                return await this.login({ email, password })
            else
                return user
        } catch (error) {
            console.error("Encountered Error at signup:", error)
        }
        return null
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Encountered Error at login:", error)
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Encountered Error at getCurrentUser:", error)
        }
    }
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Encountered Error at logout:", error)
        }
    }
}

const authService = new AuthService()
export default authService