import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy } from 'passport-oauth';

@Injectable()
export class NotionStrategy extends PassportStrategy(OAuth2Strategy, 'notion') {
  constructor() {
    OAuth2Strategy.prototype.authorizationParams = (options: any) => ({
      ...options,
      user: 'owner',
    });

    super({
      authorizationURL: 'https://api.notion.com/v1/oauth/authorize',
      tokenURL: 'https://api.notion.com/v1/oauth/token',
      clientID: process.env.NOTION_CLIENT_ID,
      clientSecret: process.env.NOTION_SECRET,
      callbackURL: 'https://siderdax.asuscomm.com/auth/callback',
      state: true,
      customHeaders: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_SECRET}`,
            'utf-8',
          ).toString('base64'),
      },
      passReqToCallback: true,
    });

    Object.defineProperty(this._verify, 'length', {
      value: this.validate.length,
    });
  }

  async validate(
    request: any,
    accessToken: any,
    refreshToken: any,
    params: any,
    profile: any,
    verified: any,
  ) {
    return params;
  }
}
