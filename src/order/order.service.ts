import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { PrismaService } from 'src/prisma';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrderService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly carts: CartService,
        private readonly product: ProductsService
    ) { }

    async createOrder(userId: number, deliveryAddress: string) {
        try {
            const userCarts = await this.carts.findUsersCart(userId)

            const totalCost = await userCarts.reduce(async (asyncTotal, cartItem) => {
                const product = await this.product.getById(cartItem.productId);
                const productCost = product.price * cartItem.quantity;
                return await asyncTotal + productCost;
            }, Promise.resolve(0));

            return this.prisma.order.create({
                data: {
                    userId,
                    deliveryAddress,
                    totalCost,
                    status: 'pending',
                    cartlist: userCarts.map(i => i.id),
                }
            });

        } catch (error) {
            return {message: 'something went wrong!'}
        }
    }

    async getUserOrders(userId: number) {
        try {
            return this.prisma.order.findMany({
                where: {
                    userId
                }
            })

        } catch (error) {
            return {message: 'something went wrong!'}
        }
    }

    async updateOrderStatus(orderId: number, status: string) {

        return this.prisma.order.update({
            where: {
                id: +orderId
            },
            data: {
                status: status
            }
        })
    }

    public getOrders() {
        return this.prisma.order.findMany()
    }
}