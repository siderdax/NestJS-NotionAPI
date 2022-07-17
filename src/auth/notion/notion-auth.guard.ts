import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class NotionAuthGuard
  extends AuthGuard('notion')
  implements CanActivate
{
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.switchToHttp().getRequest().session?.passport?.user) {
      return true;
    }

    return super.canActivate(context);
  }
}
