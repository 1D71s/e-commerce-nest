import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Здесь вы можете реализовать логику проверки, имеет ли текущий пользователь доступ к методу.
    // Возможно, вы хотите проверить, является ли текущий пользователь аутентифицированным пользователем AuthService.
    // Если да, возвращайте true, иначе возвращайте false.
    // Пример проверки:
    if (request.user && request.user.role === 'AuthService') {
      return true;
    }
      
    return false;
  }
}