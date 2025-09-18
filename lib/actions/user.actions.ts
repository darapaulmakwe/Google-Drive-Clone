"use server"

import { createAdminClient, createSessionClient } from "@/lib/index";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";

//Create account flow
/**
 * User fills out sign-up form with email, password, and full name.
 * check if the user already exists in the database. (use to identify whether to create a new user or not)
 * send OTP to the user's email for verification.
 * This will send secret key for creating a new session
 * create a new user document if the user is a new user
 * return the users account id which will be used to complete the log in
 * verify the OTP entered by the user and authenticate the user to log them in
 */

//helper function to get user by email
const getUserbyEmail = async(email: string) => {
    const { databases } = await createAdminClient()

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", [email])]
    )
    return result.total > 0 ? result.documents[0] : null
  
}
//generic error handler
const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

//helper function to send email OTP
export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async({fullName, email}: {fullName:string; email:string}) => {
    const existingUser = await getUserbyEmail(email)

    const accountId = await sendEmailOTP({email})
    if(!accountId) throw new Error("Failed to send email OTP")

    if(!existingUser){
        const { databases } = await createAdminClient()
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                fullName,
                email,
                avatar: avatarPlaceholderUrl,
                accountId
            }
        )
    }

    return parseStringify({accountId})

}

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)],
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserbyEmail(email);

    // User exists, send OTP
    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};