

import {Client, Account , ID} from 'appwrite';
import conf from './conf';

class AuthService {
    client = new Client()
    account
    database
    constructor() {
        this.client
            .setEndpoint(conf.appwrite_endpoint)
            .setProject(conf.appwrite_project_id)
             this.account = new Account(this.client);
             this.database = new ID(conf.appwrite_database_id);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if(userAccount){
               return await this.login(email,password)
            }
        } catch (error) {
           console.log("Appwrite AuthService :: createAccount :: error", error); 
        }
    }

    async login({email,password}){
        try {
           await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("Appwrite AuthService :: login :: error", error); 
        }
    }

    async getCurrentUser(){
        try {
          return await this.account.get();
        } catch (error) {
            console.log("Appwrite AuthService :: getCurrentUser :: error", error); 
        }
    }   

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite AuthService :: logout :: error", error); 
        }
    }
}

const authService = new AuthService()
export default authService