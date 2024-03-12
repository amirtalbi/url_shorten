import { Module } from '@nestjs/common';
import { StaticService } from '../services/static.service';

@Module({
  exports: [StaticService],
  providers: [StaticService],
})
export class StaticModule {}
