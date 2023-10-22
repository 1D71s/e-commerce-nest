import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ChangeRoleDto } from './dto/change-role-dto';

@Injectable()
export class RouleService {

    constructor(private readonly prisma: PrismaService) {}

    async changeRole(dto: ChangeRoleDto) {
        
        const user = await this.prisma.user.findFirst({
            where: {
                id: +dto.id
            }
        })

        if (user) {

            if (user.role === 'ADMIN') {
                return { message: 'no accsses!' }
            }

            return this.prisma.user.update({
                where: {
                    id: +dto.id
                },
                data: {
                    role: dto.role
                }
            })
        }

        return { message: 'User is not found! ' }
    } 
}
