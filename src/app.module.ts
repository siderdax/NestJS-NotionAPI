import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as passport from 'passport';
import { AuthController } from './auth/auth.controller';
import { PassportSerializer } from '@nestjs/passport';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule extends PassportSerializer implements NestModule {
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
