import { v4 as uuid } from 'uuid';

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    // const name = file.originalname.split('.')[0];
    const fileExtName = file.originalname.split('.')[1];
    callback(null, `${uuid()}.${fileExtName}`);
}