import { Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/add-cart-dto';
import { UpdateCartDto } from './dto/update-cart-dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class CartService {

    constructor (private prisma: PrismaService) {}

    
    async addToCart(user: number, dto: AddToCartDto) {

        return await this.prisma.cartItem.create({
            data: {
                quantity: +dto.quantity,
                userId: +user,
                productId: +dto.productId
            }
        })
    }

    async updateCart(dto: UpdateCartDto) {

        return this.prisma.cartItem.update({
            where: {
                id: +dto.cartItemId
            },
            data: {
                quantity: +dto.quantity,
            }
        })
    }

    async removeFromCart(cartItemId: number) {

        const product = await this.prisma.cartItem.findUnique({
            where: {
                id: +cartItemId
            }
        })

        if (product) {

            await this.prisma.cartItem.delete({ where: { id: +product.id } })
            
            return { message: 'Product has been deleted from cart-list!' }
        }

        return { message: 'Product not founded in cart-list!' }
    }
}
