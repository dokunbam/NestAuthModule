import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
    constructor(private authService: AuthService) {
        super({
            header: 'api_key',
            prefix: ''
        }, true,
            (apikey: string, done: any, req: any, next: () => void) => {
                const checkKey = this.authService.validateApiKey(apikey);
                if (!checkKey) {
                    return done(
                        new HttpException('Unauthorized access, verify the token is correct', HttpStatus.UNAUTHORIZED),
                        false,
                    );
                }
                return done(null, true, next);
            });
    }
}