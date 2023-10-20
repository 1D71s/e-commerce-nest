import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { LoginUserDto } from 'src/users/dto/login-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'; 


@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    
    async login(dto: LoginUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    async register(dto: CreateUserDto) {

        const candidate = await this.userService.getUserByEmail(dto.email);

        if (candidate) {
            throw new HttpException('Пользователь с такой почтой существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(dto.password, 5);
        
        const user = await this.userService.create({ ...dto, password: hashPassword });

        return this.generateToken(user);
    }

    private generateToken(user: any) {

        const payload = { id: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(dto: LoginUserDto) {

        const user = await this.userService.getUserByEmail(dto.email);
        
        const passwordEquals = await bcrypt.compare(dto.password, user.password);

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({ message: 'Data is not correct!' });
    }
}

