import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateUserDto } from './dto/create-user-dto';


@Injectable()
export class UsersService {
    
    constructor(private prisma: PrismaService ) {}

    async create(dto: CreateUserDto) {

        return this.prisma.user.create({
            data: dto
        })
        
    }

    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email 
            }
        });
    
        return user;
    }
    
}
