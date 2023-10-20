import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-cart-dto';
import { UpdateCartDto } from './dto/update-cart-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { User } from 'src/users/user-decorate';


@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {}
  
    @Post('/add')
    @UseGuards(JwtAuthGuard)
    addToCart(@User() user, @Body() dto: AddToCartDto) {
        return this.cartService.addToCart(user.id, dto)
    }

    @Patch('/update')
    @UseGuards(JwtAuthGuard)
    updateCart(@Body() dto: UpdateCartDto) {
        return this.cartService.updateCart(dto)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    removeFromCart(@Param('id') id: number) {
        return this.cartService.removeFromCart(id)
    }

}
