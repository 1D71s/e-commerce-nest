import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateProductDto } from './dto/create-product-dto';

@Injectable()
export class ProductsService {
    
    constructor(private prisma: PrismaService ) {}

    async create(dto: CreateProductDto) {
        try {
            const newProduct = await this.prisma.product.create({
                data: dto,
            });
            return newProduct;
        } catch (error) {
            console.error("Ошибка при создании продукта:", error);
            throw error;
        }
      }
      

    async getById(id: number) {

        const product = await this.prisma.product.findUnique({
            where: {
                id: +id
            }
        })

        if (product) return product
    }

    async deleteProduct(id: number) {

        const product = await this.getById(id)

        if (product) {
            await this.prisma.product.delete({
                where: {
                    id: product.id
                }
            });
            return product;
        }
    }

    async changeStatus(id: number) {
        const product = await this.getById(id)
    }
}
