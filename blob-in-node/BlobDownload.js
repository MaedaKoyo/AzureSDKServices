const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

async function main() {
  console.log("blod download");

  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found");
  }

  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );

  //testでは、あらかじめ作ったコンテナ名とファイル名を使う
  const containerName = "murata-container3";
  const blobName = "apple.png";

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  const data = blobClient.
  console.log(data);


}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));

// Convert stream to text
async function streamToText(readable) {
  readable.setEncoding("utf8");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}
