import { Controller, Get, HttpCode, Post, Body, Param, Patch, Delete} from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';

@Controller('blog')
export class BlogController {
  blogs: BlogDto[];

  constructor() {
    this.blogs = [
      {
        id: 1,
        title: 'Blog 1',
        excerpt: 'This is an excerpt',
        description: 'This is a description',
      },
      {
        id: 2,
        title: 'Blog 2',
        excerpt: 'This is an excerpt',
        description: 'This is a description',
      },
      {
        id: 3,
        title: 'Blog 3',
        excerpt: 'This is an excerpt',
        description: 'This is a description',
      },
    ];
  }

  @HttpCode(200)
  @Get()
  getAll(): BlogDto[] {
    return this.blogs;
  }

  @HttpCode(201)
  @Post()
  create(@Body() dto: BlogDto): BlogDto {
    const newBlog: BlogDto = {
      id: new Date().getTime(),
      title: dto.title,
      excerpt: dto.excerpt,
      description: dto.description,
    };
    this.blogs.push(newBlog);
    return newBlog;
  }

  @HttpCode(200)
  @Get(':id')
  getById(@Param('id') id: string){
    const blog = this.blogs.find((blog) => blog.id === Number(id));
    return blog;
  }

  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: BlogDto){
    let currentBlog = this.blogs.find((blog) => blog.id === Number(id));
    currentBlog = dto;
    return currentBlog;
  }

  @HttpCode(200)
  @Delete(':id')
  delete(@Param('id') id: string){
    const index = this.blogs.findIndex((blog) => blog.id === Number(id));
    this.blogs.splice(index, 1);
    return this.blogs;
  }
}
