import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { TerminalService } from '../terminal/terminal.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Terminal } from '../terminal/interfaces/terminal.interface';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, @InjectModel('Terminal') private terminalModel: Model<Terminal>,) { }

    //generate token for user
    async signPayLoad(payload: any) {
        return sign(payload, process.env.SECRETKEY, { expiresIn: '1h' });

    }

    //find user with payload
    async validateUser(payload: any) {
        const returnuser = await this.userService.findByPayLoad(payload);
        return returnuser;
    }

    //generate token for Posy
    async signPosPayLoad(payload: any) {
        return sign(payload, process.env.SECRETKEY, { expiresIn: '24h' });
    }

    //find terminal with payload
    async validatePos(payload: any) {
        const { terminalId } = payload;
        const terminal = await this.terminalModel.findById(terminalId);
        return terminal;
    }


    validateApiKey(apiKey: string) {
        const keys = process.env.API_KEYS;
        const apiKeys = keys.split(',');
        return apiKeys.find(key => apiKey === key);
    }


}
