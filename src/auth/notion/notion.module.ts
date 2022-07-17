import { Module } from '@nestjs/common';
import { PassportModule, PassportSerializer } from '@nestjs/passport';
import { NotionService } from './notion.service';
import { NotionStrategy } from './notion-strategy';
import * as session from 'express-session';

@Module({
  imports: [PassportModule],
  providers: [NotionService, NotionStrategy],
  exports: [NotionStrategy],
})
export class NotionModule {}
