import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyDynamicModule } from './modules/myDynamic.module';
import { StaticModule } from './modules/static.module';
import { ValidationMiddleware } from './middleware/validation.middleware';

@Module({
  imports: [MyDynamicModule.register(), StaticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware).forRoutes(AppController);
  }
}
