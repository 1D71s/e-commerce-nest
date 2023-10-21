import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { User } from 'src/users/user-decorate';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateOrderDto } from './dto/create-order-dto';

@Controller('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) { }
    
    @Post('/create')
    @UseGuards(JwtAuthGuard)
    createOrder(@User() user, @Body() dto: CreateOrderDto) {
        return this.orderService.createOrder(user.id, dto.deliveryAddress)
    }

    @Get()
    getUserOrders(userId: number) {
        return this.orderService.getUserOrders(userId)
    }

    @Patch('/update')
    updateOrderStatus(orderId: number, status: string) {

    }

}
