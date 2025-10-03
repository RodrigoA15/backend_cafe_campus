import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { isEmpty } from 'src/utils/validation.utils';

export interface AuthTokenResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  private readonly USER_NOT_FOUND = 'Usuario no encontrado';
  private readonly INVALID_CREDENTIALS = 'Credenciales inválidas';

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<AuthTokenResponse> {
    const user = await this.validateUser(username, password);
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: await this.getJwtToken(payload),
    };
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findOne({ username })
      .lean<UserDocument>()
      .exec();

    if (isEmpty(user)) {
      throw new NotFoundException(this.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(this.INVALID_CREDENTIALS);
    }

    return user;
  }

  private async getJwtToken(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
