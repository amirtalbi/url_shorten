import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StaticService {
  getUrl(shortUrl: string): string {
    let data;
    try {
      const filePath = path.join(__dirname, '../../data/urls.json');
      data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      console.error(error);
    }

    console.log(data);
    const longUrl = data.urls[shortUrl];
    if (!longUrl) {
      return 'Short URL not found.';
    }
    return longUrl;
  }
}
