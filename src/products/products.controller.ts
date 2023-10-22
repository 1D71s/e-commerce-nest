import { Controller, Param, Get } from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get('/:id')
    public getProduct(@Param('id') id: number) {
        return this.productsService.getById(id)
    }

    @Get()
    getProducts() {
        return this.productsService.getProducts()
    }
}
