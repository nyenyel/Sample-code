import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageHelper } from './image.helper';

@Module({
  exports: [ImageService],
  providers: [ImageService, ImageHelper],
})
export class ImageModule {}
