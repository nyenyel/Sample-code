import { Injectable } from '@nestjs/common';
import { issueSignedToken, put, presignUrl } from '@vercel/blob';
import { randomUUID } from 'crypto';
import { ImageHelper } from './image.helper';

@Injectable()
export class ImageService {
  constructor(private readonly imageHelper: ImageHelper) {}
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const filename = `${folder}/${randomUUID()}-${Date.now()}-${file.originalname}`;

    const blob = await put(filename, file.buffer, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }

  async getSignedUrl(fullBlobUrl: string): Promise<string> {
    const pathname = this.imageHelper.getPathnameFromBlobUrl(fullBlobUrl);

    const token = await issueSignedToken({
      pathname,
      operations: ['get'],
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    const { presignedUrl } = await presignUrl(token, {
      pathname,
      operation: 'get',
      validUntil: Date.now() + 5 * 60 * 1000,
      access: 'private',
    });

    return presignedUrl;
  }
}
