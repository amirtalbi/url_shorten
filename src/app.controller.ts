import { Controller, Get, Inject, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { DynamicService } from './services/dynamic.service';
import { StaticService } from './services/static.service';
import { UrlDto } from './dto/url.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(DynamicService) private readonly dynamicService: DynamicService,
    @Inject(StaticService) private readonly staticService: StaticService,
  ) {}

  @Get('/:url')
  getUrl(@Param('url') url: string): string {
    console.log(url);
    return this.staticService.getUrl(url);
  }

  @Post('/create-url')
  createUrl(@Body() body: UrlDto): string {
    console.log(body);
    return this.dynamicService.createUrl(body.url);
  }
}
