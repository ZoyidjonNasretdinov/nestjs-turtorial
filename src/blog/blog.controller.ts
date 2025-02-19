import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(200)
  @Get()
  async getAll(){
    return this.blogService.getAllBlog();
  }

  @HttpCode(201)
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() dto: BlogDto) {
    return this.blogService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.blogService.getById(Number(id));
  }

  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<BlogDto>) {
    return this.blogService.update(Number(id), dto);
  }

  @HttpCode(200)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(Number(id));
  }
}
