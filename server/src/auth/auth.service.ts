import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ){}

    async login(user: User) {
        const payload = { login: user.login, sub: user._id, roles: user.roles };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
