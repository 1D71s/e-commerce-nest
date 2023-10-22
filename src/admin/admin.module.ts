import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProductsModule } from 'src/products/products.module';
import { OrderModule } from 'src/order/order.module';
import { RouleModule } from 'src/roule/roule.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    UsersModule,
    ProductsModule,
    OrderModule,
    RouleModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class AdminModule {}
