import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';


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

    async getProducts() {
        const products = await this.prisma.product.findMany()

        if (products) return products
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

    async updateProduct(id: number, dto: UpdateProductDto) {
        try {
            const product = await this.prisma.product.update({
                where: {
                    id: +id
                },
                data: dto
            });
    
            if (product) {
                return { message: 'Product updated successfully', data: product };
            } else {
                return { message: 'Product not found' };
            }
        } catch (error) {
            return { message: 'An error occurred', error: error.message };
        }
    }
}