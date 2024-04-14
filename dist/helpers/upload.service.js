"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const path_1 = require("path");
const fs = require("fs");
const fileType = require("file-type");
const common_2 = require("@nestjs/common");
let UploadService = class UploadService {
    constructor() { }
    async uploadFile(file) {
        const extension = (0, path_1.extname)(file.originalname).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.ogg', 'webm'];
        const maxVideoLengthInSeconds = 120;
        const isSupportedVideoType = (mime) => {
            return mime.startsWith('video/') && ['mp4', 'ogg', 'webm'].includes(mime.split('/')[1]);
        };
        if (!allowedExtensions.includes(extension)) {
            throw new common_1.BadRequestException('Only files with the following extensions are allowed: ' +
                allowedExtensions.join(', '));
        }
        const fileInfo = await fileType.fromBuffer(file.buffer);
        if (!fileInfo) {
            throw new common_2.UnsupportedMediaTypeException('Unrecognized file format');
        }
        if (fileInfo.mime.startsWith('image/')) {
            if (!fs.existsSync('public')) {
                fs.mkdirSync('public');
            }
            const filename = (0, uuid_1.v4)() + extension;
            const filePath = `public/${filename}`;
            const writeStream = fs.createWriteStream(filePath);
            writeStream.write(file.buffer);
            writeStream.end();
            return filename;
        }
        else if (isSupportedVideoType(fileInfo.mime)) {
            if (file.buffer.length > maxVideoLengthInSeconds * 1024 * 1024) {
                throw new common_1.BadRequestException(`Video length exceeds ${maxVideoLengthInSeconds} seconds`);
            }
            if (!fs.existsSync('public/videos')) {
                fs.mkdirSync('public/videos');
            }
            const filename = (0, uuid_1.v4)() + extension;
            const filePath = `public/videos/${filename}`;
            const writeStream = fs.createWriteStream(filePath);
            writeStream.write(file.buffer);
            writeStream.end();
            return filename;
        }
        else {
            throw new common_1.BadRequestException('Only image and video files are allowed');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map