import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./role-auth-decorator";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private userService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext) {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const token = (req.headers.authorization || '').replace('Bearer ', '');

            if (!token) {
                throw new UnauthorizedException({ message: 'User not authorized' });
            }

            const user = this.jwtService.verify(token);
            const dbUser = await this.userService.findUserById(user.id); 
            
            if (!dbUser) {
                throw new UnauthorizedException({ message: 'User not found in the database' });
            }
                
            return requiredRoles.includes(dbUser.role);
        } catch (error) {
            throw new HttpException('User not authorized', HttpStatus.FORBIDDEN);
        }
    }
}
