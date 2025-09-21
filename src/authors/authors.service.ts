import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    try {
      const newAuthor = this.authorRepository.create(createAuthorInput);

      return await this.authorRepository.save(newAuthor);
    } catch (error) {
      console.error(error);
      throw new HttpException(error, 500);
    }
  }

  async findAll(): Promise<Author[]> {
    try {
      return await this.authorRepository.find();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number): Promise<Author> {
    try {
      const author = await this.authorRepository
        .createQueryBuilder('author')
        .where({ id })
        .getOne();

      if (!author) {
        throw new HttpException('Author not found', 404);
      }

      return author;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(
    id: number,
    updateAuthorInput: UpdateAuthorInput,
  ): Promise<UpdateResult> {
    try {
      const updatedAuth = await this.authorRepository.update(
        id,
        updateAuthorInput,
      );
      if (updatedAuth.affected === 0) {
        throw new HttpException('Author to update not found', 404);
      }
      return updatedAuth;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const deletedAuth = await this.authorRepository.delete(id);
      if (deletedAuth.affected === 0) {
        throw new HttpException('Author to delete not found', 404);
      }
      return deletedAuth;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
