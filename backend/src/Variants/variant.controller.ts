import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { VariantService } from './variant.service';

@Controller('variants')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Get()
  findAll() {
    return this.variantService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.variantService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.variantService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.variantService.delete(id);
  }
}
