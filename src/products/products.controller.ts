import { Controller, Post, Body, Patch, Delete, Param, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';


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

    @Get()
    getProducts() {
        return this.productsService.getProducts()
    }
    
    @Delete('/:id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id)
    }

    @Patch('/update/:id')
    updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
        return this.productsService.updateProduct(id, dto)
    }

}
