import { isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateVariantDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() product_id: string;
}
