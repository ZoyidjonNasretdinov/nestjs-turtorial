import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  private blogs: BlogDto[];

  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
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

  getAllBlog(): BlogDto[] {
    return this.blogModel.find({});
  }

  createBlog(dto: Omit<BlogDto, 'id'>): BlogDto {
    const newBlog: BlogDto = {
      id: this.blogs.length ? this.blogs[this.blogs.length - 1].id + 1 : 1, // Ensures unique ID
      ...dto, // Spreads only title, excerpt, description
    };
    this.blogs.push(newBlog);
    return newBlog;
  }

  getById(id: number): BlogDto {
    const blog = this.blogs.find((blog) => blog.id === id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  updateBlog(id: number, dto: Partial<BlogDto>): BlogDto {
    const blogIndex = this.blogs.findIndex((blog) => blog.id === id);
    if (blogIndex === -1) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    this.blogs[blogIndex] = { ...this.blogs[blogIndex], ...dto };
    return this.blogs[blogIndex];
  }

  deleteBlog(id: number): BlogDto[] {
    const blogIndex = this.blogs.findIndex((blog) => blog.id === id);
    if (blogIndex === -1) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    this.blogs.splice(blogIndex, 1);
    return this.blogs;
  }
}

//zoyidjonnasretdinovcoder
// GTbR6CM8f8pa83YU
// mongodb+srv://zoyidjonnasretdinovcoder:<db_password>@cluster0.f63vc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0