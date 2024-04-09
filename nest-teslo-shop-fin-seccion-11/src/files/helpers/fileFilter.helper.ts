

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    console.log(file);
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
}