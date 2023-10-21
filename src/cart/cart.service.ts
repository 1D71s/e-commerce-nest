import { Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/add-cart-dto';
import { UpdateCartDto } from './dto/update-cart-dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class CartService {

    constructor (private prisma: PrismaService) {}

    public async findUsersCart(user: number) {

        const cartsUser = await this.prisma.cartItem.findMany({
            where: {
                userId: user
            }
        })

        return cartsUser
    }
    
    async addToCart(user: number, dto: AddToCartDto) {

        const cart = await this.prisma.cartItem.findFirst({
            where: {
                userId: +user,
                productId: +dto.productId
            }
        })

        if (cart) {
            return await this.prisma.cartItem.update({
                where: {
                    id: cart.id
                },
                data: {
                    quantity: cart.quantity += dto.quantity,
                }
            })
        } 


        return await this.prisma.cartItem.create({
            data: {
                quantity: +dto.quantity,
                userId: +user,
                productId: +dto.productId
            }
        })
    }


    async updateCart(user: number, dto: UpdateCartDto) {

        const cart = await this.prisma.cartItem.findUnique({ where: { id: +dto.cartItemId } })

        if (!cart) {
            return { message: 'Product not found in cart-list!' };
        }
    
        if (user === +cart.userId) {
            return this.prisma.cartItem.update({
                where: {
                    id: +dto.cartItemId
                },
                data: {
                    quantity: +dto.quantity
                }
            });
        }
    
        return { message: 'Error: You cannot update this product' };
    }


    async removeFromCart( user: number, cartItemId: number ) {

        const product = await this.prisma.cartItem.findUnique({
            where: {
                id: +cartItemId
            }
        })

        if (!product) {
            return { message: 'Product not founded in cart-list!' }
        }

        if (user === product.userId) {
            await this.prisma.cartItem.delete({ where: { id: +product.id } })
            return { message: 'Product has been deleted from cart-list!' }
        }

        return { message: 'Error u can not delete this product' }
    }
}
