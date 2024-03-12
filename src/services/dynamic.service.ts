import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface Data {
  urls: {
    [shortUrl: string]: string;
  };
}

@Injectable()
export class DynamicService {
  private data: Data;

  constructor() {
    try {
      const filePath = path.join(__dirname, '../../data/urls.json');
      this.data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      console.error(error);
    }
  }

  generateShortUrl(): string {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const shortUrl = [...Array(6)]
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
    return shortUrl;
  }

  isUniqueShortUrl(): boolean {
    return !Object.values(this.data.urls).includes(this.generateShortUrl());
  }

  saveUrl(longUrl: string, shortUrl: string): void {
    this.data.urls[shortUrl] = longUrl;
    try {
      fs.writeFileSync('data/urls.json', JSON.stringify(this.data));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du fichier JSON');
    }
  }

  createUrl(longUrl: string): string {
    let shortUrl;
    do {
      shortUrl = this.generateShortUrl();
    } while (!this.isUniqueShortUrl());
    this.saveUrl(longUrl, shortUrl);
    return shortUrl;
  }
}
