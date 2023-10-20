import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class CartModule {}
