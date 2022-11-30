const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config()

async function main() {
    console.log('upload blob');

    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!AZURE_STORAGE_CONNECTION_STRING) {
        throw Error("Azure Storage Connection string not found");
    }

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );

    // Create a unique name for the blob
    const blobName = "node-test01.txt";

    // Get a block blob client
    //コンテナ名を取得する必要あり　どっかに保存してるのとってくると思う
    //testでは、あらかじめ作ったコンテナ名を使う
    const containerName = "tetetet";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Display blob name and url
    console.log(`\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`);

    // Upload data to the blob
    const data = "Hello, World!";
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);

}

main()
.then(() => console.log('Done'))
.catch((ex) => console.log(ex.message));