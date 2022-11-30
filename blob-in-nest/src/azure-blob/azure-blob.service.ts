import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

@Injectable()
export class AzureBlobService {
    readonly azureConnection = process.env.AZURE_STORAGE_CONNECTION_STRING;
    containerName :string;

    //upload file
    getBlobClient(imageName:string):BlockBlobClient{
        const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
        const containerClient = blobClientService.getContainerClient(this.containerName);
        const blobClient = containerClient.getBlockBlobClient(imageName);

        return blobClient;
    }

    async upload(file:Express.Multer.File, containerName:string){
        this.containerName = containerName;
        const blobClient = this.getBlobClient(uuidv4()+file.originalname);
        //名前指定
        //const blobClient = this.getBlobClient("test.PNG");
        await blobClient.uploadData(file.buffer);
    }
}


