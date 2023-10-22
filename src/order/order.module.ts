import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma';
import { CartModule } from 'src/cart/cart.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
  imports: [
    CartModule,
    ProductsModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    OrderService
  ]
})
export class OrderModule {}
