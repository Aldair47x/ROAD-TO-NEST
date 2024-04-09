import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:fileId')
  findProductImage(
    @Res() res: Response,
    @Param('fileId') fileId: string
  ) {
    const path = this.filesService.getFilePath(fileId);
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file' ,
  { fileFilter,
    storage: diskStorage({
      destination: './static/uploads',
      filename: fileNamer
    }),
  }))
  uploadProductImage( @UploadedFile() file: Express.Multer.File) {

    if(!file) {
      throw new BadRequestException('File not uploaded');
    }

    const secureUrl = `${this.configService.get('HOST_API') }/files/product/${file.filename}`;

    return {
      originalname: file.originalname,
      type: file.mimetype,
      secureUrl
    };
  }
}

