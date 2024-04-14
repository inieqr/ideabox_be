/// <reference types="multer" />
export declare class UploadService {
    constructor();
    uploadFile(file: Express.Multer.File): Promise<string>;
}
