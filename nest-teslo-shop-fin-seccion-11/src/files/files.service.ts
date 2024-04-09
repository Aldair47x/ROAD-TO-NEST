import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getFilePath(fileId: string) {
    const path = join(__dirname, '../../static/uploads', fileId);
    if (!existsSync(path)) {
      throw new BadRequestException('File not found');
    }
    return path;
  }
}
