import { DynamicModule, Module } from '@nestjs/common';
import { DynamicService } from 'src/services/dynamic.service';

@Module({})
export class MyDynamicModule {
  static register(): DynamicModule {
    return {
      module: MyDynamicModule,
      providers: [
        {
          provide: DynamicService,
          useValue: new DynamicService(),
        },
      ],
      exports: [DynamicService],
    };
  }
}
