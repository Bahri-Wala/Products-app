import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateProductDto {
  @IsOptional() @IsString() @IsNotEmpty() name?: string;
}
