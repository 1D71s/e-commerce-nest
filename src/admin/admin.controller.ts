import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { OrderService } from 'src/order/order.service';
import { CreateProductDto } from 'src/products/dto/create-product-dto';
import { UpdateProductDto } from 'src/products/dto/update-product-dto';
import { ProductsService } from 'src/products/products.service';
import { ChangeRoleDto } from 'src/roule/dto/change-role-dto';
import { RouleService } from 'src/roule/roule.service';
import { RolesGuard } from './role.guard';
import { Roles } from './role-auth-decorator';

@Controller('admin')
export class AdminController {

    constructor(
        private readonly productsService: ProductsService,
        private readonly ordersService: OrderService,
        private readonly roleService: RouleService
    ) { }
    
    @Roles('ADMIN', 'MODERATOR')
    @UseGuards(RolesGuard)
    @Post('/create')
    @UseGuards(JwtAuthGuard)
    public create(@Body() productDto: CreateProductDto) {
        return this.productsService.create(productDto)
    }

    @Roles('ADMIN', 'MODERATOR')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    public deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id)
    }

    @Roles('ADMIN', 'MODERATOR')
    @UseGuards(RolesGuard)
    @Patch('/update/:id')
    @UseGuards(JwtAuthGuard)
    public updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
        return this.productsService.updateProduct(id, dto)
    }

    @Roles('ADMIN', 'MODERATOR')
    @UseGuards(RolesGuard)
    @Get('/orders')
    getOrders() {
        return this.ordersService.getOrders()
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Patch('/role')
    changeRole(@Body() dto: ChangeRoleDto) {
        return this.roleService.changeRole(dto)
    }
}
