import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRETKEY
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);
        try {
            if (user) {
                //return user;
                return done(null, user, payload.iat)
            } else if (user == null) {
                const Terminal = await this.authService.validatePos(payload);
                return done(null, Terminal, payload.iat)
            }
            else {
                return done(
                    new HttpException('Unauthorised access', HttpStatus.UNAUTHORIZED),
                    false,
                );
            }

        } catch (error) {
            return error;
        }

    }
}
