import { Injectable } from '@nestjs/common';
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

  async getAllBlog() {
    return this.blogModel.find().exec();
  }

  async create(dto: BlogDto) {
    return this.blogModel.create(dto);
  }

  async getById(id: string) {
    return this.blogModel.findById(id);
  }

  async update(id: string, dto: BlogDto) {
    return this.blogModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: number) {
    return this.blogModel.findByIdAndDelete(id);
  }
}
