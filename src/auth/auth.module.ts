import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NotionModule } from './notion/notion.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [NotionModule],
})
export class AuthModule {}
