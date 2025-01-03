import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aigram.aigram",
  projectId: "6770338c0010dd50a3ae",
  databaseId: "677034de0012e2af5b2c",
  userCollectionId: "677034ff000fe13bdbaa",
  mediaCollectionId: "6770352100154bcdd13f",
  storageId: "67717fdb0039ba75379e",
};

let client: Client;
let account: Account;

client = new Client();
account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

export type RegisterUserResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const registerUser = async (
  email: string,
  password: string,
  username: string
): Promise<RegisterUserResponse> => {
  try {
    const user = await account.create(ID.unique(), email, password, username);

    const avatar = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        email,
        username,
        avatar,
      }
    );

    return {
      success: true,
      data: newUser,
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error?.message || "Failed to register user",
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return {
      success: true,
      session,
    };
  } catch (error: any) {
    console.error("Sign in error:", error);
    return {
      success: false,
      error: error?.message || "Failed to register user",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error("User not found");

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentAccount) throw Error("User not found");

    return currentUser.documents[0];
  } catch (error: any) {
    console.error("Get user error:", error);
    return null;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.mediaCollectionId
    );

    return posts.documents;
  } catch (error) {
    console.error("Get post error:", error);
    return null;
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.mediaCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    console.error("Get post error:", error);
    return null;
  }
};
