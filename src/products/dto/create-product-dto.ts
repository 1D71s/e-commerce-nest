import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
} 