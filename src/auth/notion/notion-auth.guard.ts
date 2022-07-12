import { CanActivate, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class NotionAuthGuard
  extends AuthGuard('notion')
  implements CanActivate {}
