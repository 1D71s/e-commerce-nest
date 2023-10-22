import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProductsModule } from 'src/products/products.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    ProductsModule,
    OrderModule
  ]
})
export class AdminModule {}
