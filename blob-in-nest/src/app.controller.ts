import { Controller, Get,  Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AzureBlobService } from './azure-blob/azure-blob.service';
import { FileInterceptor} from '@nestjs/platform-express';

@Controller()
export class AppController {
  containerName = "nest-container-test"
  constructor(
    private readonly appService: AppService,
    private readonly azureBlobService: AzureBlobService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('myfile'))
  async upload(@UploadedFile() file:Express.Multer.File): Promise<string>{
    await this.azureBlobService.upload(file,this.containerName);
    return 'file uploaded';
  }
}
