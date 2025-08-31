import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVariantDto {
  @IsOptional() @IsString() @IsNotEmpty() name: string;
}
