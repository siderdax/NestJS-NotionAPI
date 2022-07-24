import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NotionModule } from './notion/notion.module';
import { PassportSerializer } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [NotionModule],
})
export class AuthModule extends PassportSerializer implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        this.getPassportInstance().initialize(),
        this.getPassportInstance().session(),
      )
      .forRoutes(AuthController);
  }

  // passport
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
