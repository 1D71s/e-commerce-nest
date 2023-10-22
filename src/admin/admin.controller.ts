import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { CreateProductDto } from 'src/products/dto/create-product-dto';
import { UpdateProductDto } from 'src/products/dto/update-product-dto';
import { ProductsService } from 'src/products/products.service';

@Controller('admin')
export class AdminController {

    constructor(
        private readonly productsService: ProductsService,
        private readonly ordersService: OrderService
    ) { }
    
    @Post('/create')
    public create(@Body() productDto: CreateProductDto) {
        return this.productsService.create(productDto)
    }

    @Delete('/:id')
    public deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id)
    }

    @Patch('/update/:id')
    public updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
        return this.productsService.updateProduct(id, dto)
    }

    @Get('/orders')
    getOrders() {
        return this.ordersService.getOrders()
    }
}
