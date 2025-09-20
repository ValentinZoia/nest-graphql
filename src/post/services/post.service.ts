import { HttpException, Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    try {
      return await this.postRepository.find();
    } catch (error) {
      console.error(error);
      throw new HttpException(error, 500);
    }
  }

  async create(post: CreatePostDto): Promise<Post> {
    try {
      const newPost = this.postRepository.create(post);
      return await this.postRepository.save(newPost);
    } catch (error) {
      console.error(error);
      throw new HttpException(error, 500);
    }
  }
}
