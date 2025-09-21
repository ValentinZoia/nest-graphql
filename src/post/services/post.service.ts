import { HttpException, Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/post.dto';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly authorsService: AuthorsService,
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

  async findOneById(id: number): Promise<Post> {
    try {
      const post = await this.postRepository
        .createQueryBuilder('post')
        .where({ id })
        .getOne();

      if (!post) {
        throw new HttpException('Post not found', 404);
      }

      return post;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getAuthors(): Promise<Author[]> {
    try {
      return await this.authorsService.findAll();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
  async getAuthorById(id: number): Promise<Author> {
    try {
      const author = await this.authorsService.findOne(id);
      return author;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
