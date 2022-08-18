import { RecordsService } from './records.service';
import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
interface AudioRecord {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
@Controller('records')
export class RecordsController {
  constructor(private recordService: RecordsService) {}
  @Get()
  async getRecords(): Promise<any> {
    try {
      return { message: 'Existing, ok' };
    } catch (error) {
      throw new Error(error);
    }
  }

  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async receiveRecords(
    @Body() body: AudioRecord,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      console.info('REQ', body);
      console.info('DATA received', file);
      const laWea = this.recordService.convertSTTGoogle(file);
      return {
        laWea,
        file: file.buffer.toString(),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
