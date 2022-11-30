const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config()

async function main() {
    console.log('create container');

    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );
  
    // Create a unique name for the container
    const containerName = "node-test7";
  
    console.log("\nCreating container...");
    console.log("\t", containerName);
  
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create the container
    await containerClient.create();

    //set access policy
    await containerClient.setAccessPolicy("blob")
}

main()
.then(() => console.log('Done'))
.catch((ex) => console.log(ex.message));