import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  Next,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { NotionAuthGuard } from './notion/notion-auth.guard';
import { NotionStrategy } from './notion/notion-strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notionStrategy: NotionStrategy,
  ) {}

  @UseGuards(NotionAuthGuard)
  @Get('login')
  login(@Req() request: Request) {
    return request;
  }

  @Get('callback')
  callback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): any {
    return this.notionStrategy.getPassportInstance().authenticate('notion', {
      successRedirect: '/',
      failureRedirect: '/',
    })(req, res, next);
  }

  @Get('logout')
  logout(@Req() req: any, @Res() res: Response, @Next() next: NextFunction) {
    return req.logout(function (err: any) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }
}
