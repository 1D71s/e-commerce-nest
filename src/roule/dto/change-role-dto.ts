import { IsNotEmpty } from "class-validator"

export class ChangeRoleDto {

    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    readonly role: string
}