import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { AdminModule } from './admin/admin.module';
import { PrismaService } from './prisma';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, CartModule, AdminModule, OrderModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}