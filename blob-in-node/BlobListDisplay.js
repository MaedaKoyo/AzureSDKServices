const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config()

async function main() {
    console.log('list display');
    console.log("\nListing blobs...");

    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );

    //コンテナ内の一覧取得にはコンテナ名が必要
    //testでは直接入れてる
    const containerName = "murata-container";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // List the blob(s) in the container.
    let cnt = 0
    for await (const blob of containerClient.listBlobsFlat()) {
        // Get Blob Client from name, to get the URL
        //const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

        // Display blob name and URL
        //console.log(`\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`);

        cnt += 1
        console.log("=====")
        console.log(cnt)
        console.log(blob.name)
        console.log(blob.properties.lastModified.toLocaleString())
    }

}

main()
.then(() => console.log('Done'))
.catch((ex) => console.log(ex.message));