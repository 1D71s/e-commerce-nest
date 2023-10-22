import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateUserDto } from './dto/create-user-dto';


@Injectable()
export class UsersService {
    
    constructor( private prisma: PrismaService ) {}

    async create(dto: CreateUserDto) {

        return this.prisma.user.create({
            data: dto
        })
        
    }

    async getUserByEmail(email: string) {
        
        return this.prisma.user.findUnique({
            where: {
                email: email 
            }
        });
    }

    async findUserById(id: number) {
        return this.prisma.user.findFirst({
            where: {
                id: +id
            }
        });
    }
}
