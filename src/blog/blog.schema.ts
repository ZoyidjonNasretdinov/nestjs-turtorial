import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true }) // Auto-generates createdAt & updatedAt
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ required: true })
  description: string;
}

// Generate the Mongoose schema
export const BlogSchema = SchemaFactory.createForClass(Blog);
