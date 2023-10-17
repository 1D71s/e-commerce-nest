import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { AdminModule } from './admin/admin.module';
import { PrismaService } from './prisma';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, CartModule, AdminModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}