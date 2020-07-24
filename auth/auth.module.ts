import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserSchema } from '../user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { ApiKeyStrategy } from './apiKey.strategy';
import { TerminalModule } from '../terminal/terminal.module';



@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), ActivityLogModule, TerminalModule,],
    providers: [AuthService, UserService, JwtStrategy, ApiKeyStrategy, ActivityLogService],
    exports: [AuthService],
    controllers: []
})
export class AuthModule { }
