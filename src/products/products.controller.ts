import { Controller, Post, Body, Patch, Delete, Param, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';


@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}
    
    @Post('/create')
    create(@Body() productDto: CreateProductDto) {
        return this.productsService.create(productDto)
    }

    @Get('/:id')
    getProduct(@Param('id') id: number) {
        return this.productsService.getById(id)
    }

    @Patch('/status/:id')
    changeStatus(@Param('id') id: number) {
        return this.productsService.changeStatus(id)
    }
    
    @Delete('/:id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id)
    }

}
