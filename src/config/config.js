const config={
    appWriteurl:String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjecctId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDbId:String(import.meta.env.VITE_APPWRITE_DB_ID),
    appWriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default config;