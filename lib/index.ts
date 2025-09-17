"use server"

//my setup
//node-appwrite
import { Account, Client, Databases, Storage, Avatars } from "node-appwrite"
import { appwriteConfig } from "./appwrite/config"
import { cookies } from "next/headers"

//client is linked to a specific user session 
// and can only access resources that the user has permissions for
//NOTE: we create a new client instance for each request to ensure that the client is always linked to the correct user session
//and sharing the same client instance across multiple requests can lead to security issues
export const createSessionClient = async() => {
    const client = new Client()
        .setEndpoint(appwriteConfig.endpointUrl) // Your API Endpoint
        .setProject(appwriteConfig.projectId) // Your project ID

    const session = (await cookies()).get('appwrite-session')
    if(!session || !session.value) throw new Error("No session found")
    client.setSession(session.value)

    return{
        get account(){
             return new Account(client)
        },
        get databases(){
            return new Databases(client)
        }

    }
}

//creates a client instance with admin privileges to manage the entire project
//used to create users, delete users, manage databases, etc
export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl) // Your API Endpoint
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey)

  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client)
    },
    get storage() {
      return new Storage(client)
    },
    get avatars() {
      return new Avatars(client)
    },
  }
}