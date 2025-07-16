import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    // console.log('User:', req.user);

    const userData = await this.authService.login(req.user);

    const webUrl = this.configService.get<string>('WEB_URL')!;

    const params = new URLSearchParams({
      userId: String(userData.id),
      name: userData.name,
      avatar: userData.avatar || '',
      accessToken: userData.accessToken,
    });

    res.redirect(`${webUrl}/api/auth/google/callback?${params.toString()}`);

    // res.redirect(
    //   `${webUrl}/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`,
    // );
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verfify() {
    return 'ok';
  }
}
