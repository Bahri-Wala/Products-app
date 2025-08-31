import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { VariantService } from './variant.service';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { CreateVariantDto } from './dto/create-varaint.dto';

@Controller('variants')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Get()
  findAll() {
    return this.variantService.findAll();
  }

  @Post()
  create(@Body() body: CreateVariantDto) {
    return this.variantService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateVariantDto) {
    return this.variantService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.variantService.delete(id);
  }
}
