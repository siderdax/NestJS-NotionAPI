import { Module } from '@nestjs/common';
import { PassportModule, PassportSerializer } from '@nestjs/passport';
import { NotionService } from './notion.service';
import { NotionStrategy } from './notion-strategy';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [NotionService, NotionStrategy],
  exports: [NotionStrategy],
})
export class NotionModule extends PassportSerializer {
  serializeUser(user: any, done: any) {
    process.nextTick(function () {
      done(null, user);
    });
  }
  deserializeUser(user: any, done: any) {
    process.nextTick(function () {
      return done(null, user);
    });
  }
}
