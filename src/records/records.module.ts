import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';

@Module({
  controllers: [RecordsController]
})
export class RecordsModule {}
