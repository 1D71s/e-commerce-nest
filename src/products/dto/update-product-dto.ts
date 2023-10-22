import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateProductDto {
    
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;
    
    readonly status: boolean;
} 