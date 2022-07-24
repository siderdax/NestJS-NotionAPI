import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: any, @Res() res: Response) {
    if (req.session?.passport?.user) {
      res.send(
        `<html><head><title>Notion Auth Sample</title></head><pre>${JSON.stringify(
          req.session.passport.user,
          null,
          '\t',
        )}</pre>` + '<br/><br/><a href="/auth/logout">Logout</a></html>',
      );
    } else {
      res.send(
        '<html><head><title>Notion Auth Sample</title></head><a href="/auth/login">Login</a></html>',
      );
    }
  }
}
