import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const access_token = await this.authService.signIn(
      createAuthDto.username,
      createAuthDto.password,
    );

    // 6. Establecer la cookie en la respuesta
    response.cookie('access_token', access_token);
    // 7. Enviar una respuesta JSON (gracias a passthrough: true)
    return { message: 'Login exitoso' };
  }

  @Get('verify')
  verifyToken(
    // 8. Usar el decorador @Cookie para extraer la cookie específica
    @Req() req: Request,
  ) {
    const token = req.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('No hay token en las cookies');
    }
    // 9. Llamar al servicio con el token extraído
    return this.authService.verifyToken(token);
  }
}
